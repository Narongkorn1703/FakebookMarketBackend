const express = require("express");
const router = express.Router();
const passport = require("passport");
const authMid = passport.authenticate("jwt", { session: false });
const { upload } = require("../middlewares/upload");
const messengerController = require("../controllers/messengerController");
const userController = require("../controllers/userController");

router.get("/getTalk", authMid, messengerController.getTalkUser);
router.get("/getProductTalk/:id", authMid, messengerController.getTalkUser);
router.get(
  "/getMessageByProductId/:id",
  authMid,
  messengerController.getMessagesByProductId
);
router.get(
  "/getMessageWithProduct/:id/:productId",
  authMid,
  messengerController.getAllMessagesWithProduct
);

router.get(
  "/getTalkAndProduct",
  authMid,
  messengerController.getAllMessagesAndProduct
);

router.get("/:id", authMid, messengerController.getAllMessages);
router.post("/:id", authMid, messengerController.createMessages);

module.exports = router;
