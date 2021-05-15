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
//sequelize.sync({ alter: true }).then(() => console.log("DB Sync"));
app.listen(PORT, () => console.log(`This server is running in ${PORT}`));
