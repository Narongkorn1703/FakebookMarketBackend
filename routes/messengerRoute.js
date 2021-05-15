const express = require("express");
const router = express.Router();
const passport = require("passport");
const authMid = passport.authenticate("jwt", { session: false });
const { upload } = require("../middlewares/upload");
const messengerController = require("../controllers/messengerController");
const userController = require("../controllers/userController");

router.post("/:id", authMid, messengerController.createMessages);
router.get("/", authMid, messengerController.getMessages);
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
