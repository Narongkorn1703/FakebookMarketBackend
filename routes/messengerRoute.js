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
  "/getMessageIncProduct/:id/:productId",
  authMid,
  messengerController.getAllMessagesIncProduct
);
router.get(
  "/getTalkAndProduct",
  authMid,
  messengerController.getAllMessagesAndProduct
);

router.get("/:id", authMid, messengerController.getAllMessages);
router.post("/:id", authMid, messengerController.createMessages);

// router.post("/sign-in", userController.SignIn);
// router.get("/profile/:id", authMid, userController.getSellerCommerceProfile);
// router.patch("/edit", authMid, userController.updateLocation);
// router.put(
//     "/upload-avatar",
//     authMid,
//     upload.single("image"),
//     userController.uploadAvatar
// );
// router.get("seller/:id", userController.getSellerCommerceProfile)

module.exports = router;
