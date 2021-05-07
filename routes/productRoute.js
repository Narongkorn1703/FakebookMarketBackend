const express = require("express");

const passport = require("passport");
const authMid = passport.authenticate("jwt", { session: false });
const productController = require("../controllers/productController");
const router = express.Router();


router.get("/get-all-product", productController.getAllProducts);
router.get("/get-all-draft", authMid, productController.getAllDrafts);
router.get("/get-type/:productType", productController.getProductsByProductType);
router.get("/get-user-products/:userId", productController.getProductsByUserId);
router.get("/:id", productController.getProductById);

router.post("/create-product", authMid, productController.createProduct);





module.exports = router;

