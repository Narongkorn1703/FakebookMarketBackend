const express = require("express");
const router = express.Router();
const passport = require("passport");
const authMid = passport.authenticate("jwt", { session: false });

const userController = require("../controllers/userController");
router.post("/register", userController.register);
router.post("/sign-in", userController.SignIn);
router.get("/profile", authMid, userController.getProfile);
router.patch("/edit", authMid, userController.updateProfile);
module.exports = router;
