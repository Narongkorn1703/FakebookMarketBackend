const express = require("express");

const passport = require("passport");
const authMid = passport.authenticate("jwt", { session: false });
const reportController = require("../controllers/reportController");
const router = express.Router();
const { upload } = require("../middlewares/upload");

router.post("/create/:sellerId", authMid, reportController.createReport);

module.exports = router;