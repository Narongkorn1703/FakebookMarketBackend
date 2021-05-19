const express = require("express");

const passport = require("passport");
const authMid = passport.authenticate("jwt", { session: false });
const savedController = require("../controllers/savedController");
const router = express.Router();
const { upload } = require("../middlewares/upload");
router.get("/", authMid, savedController.getAllSaved)
router.get("/isSaved/:productId", authMid, savedController.getIsSaved);
router.post("/createSaved/:productId", authMid, savedController.createSaved);
router.delete("/deleteSaved/:productId", authMid, savedController.deleteSaved);

module.exports = router;