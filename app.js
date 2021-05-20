require("dotenv").config();
require("./middlewares/passport");
const express = require("express");
const app = express();
const { PORT } = process.env;
const { sequelize } = require("./models");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const followerRoute = require("./routes/followerRoute");
const savedRoute = require("./routes/savedRoute");
const ratingRoute = require("./routes/ratingRoute");
const MessengerRoute = require("./routes/messengerRoute");
const cors = require("cors");
const error = require("./middlewares/error");

//create http instance
const http = require("http").createServer(app);

//create socket io instance
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("user connected");

  // socket.on("connected", function (msg) {
  //   console.log("texts", msg);
  // });

  // socket.on("chat message", (msg) => {
  //   io.emit("chat message", msg);
  // });

  // socket.emit("hello", "world");

  socket.on("sendMessage", ({ text }) => {
    console.log("text from client senMessage", text);
    io.emit("getMessage", {
      text,
    });
  });
  //io.emit("connected", msg);

  // socket.on("newChatMessage", function (data) {
  //   console.log("messageFromClient", data);
  // });
  //   io.emit("newChatMessage", data);
  //});

  socket.on("disconnect", function () {
    console.log("Disconnected!");
  });
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(userRoute);
app.use("/product", productRoute);
app.use("/follower", followerRoute);
app.use("/saved", savedRoute);
app.use("/rating", ratingRoute);
app.use("/message", MessengerRoute);

app.use((req, res) => {
  res.status(404).json({ message: "path not found on this server" });
});
app.use(error);
//sequelize.sync().then(() => console.log("DB Sync"));
http.listen(PORT, () => console.log(`This server is running in ${PORT}`));
