const express = require("express");

const passport = require("passport");
const authMid = passport.authenticate("jwt", { session: false });
const ratingController = require("../controllers/ratingController");
const router = express.Router();
const { upload } = require("../middlewares/upload");
router.get("/:sellerId", ratingController.getRating); // UserIdเป็นได้ทั้งตัวเองและคนขาย
router.post("/create/:sellerId", authMid, ratingController.createRating);

module.exports = router;
