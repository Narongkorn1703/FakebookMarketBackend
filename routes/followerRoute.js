const express = require("express");

const passport = require("passport");
const authMid = passport.authenticate("jwt", { session: false });
const follwerController = require("../controllers/followerController");
const router = express.Router();
const { upload } = require("../middlewares/upload");

router.get("/get-followers", authMid, follwerController.getFollowers);
router.get("/get-following", authMid, follwerController.getFollowing);
router.post("/follow/:id", authMid, follwerController.followSomeone);
router.post("/unfollow/:id", authMid, follwerController.unfollowSomeone);

module.exports = router;