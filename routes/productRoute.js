const express = require("express");

const passport = require("passport");
const authMid = passport.authenticate("jwt", { session: false });
const productController = require("../controllers/productController");
const router = express.Router();
const { upload } = require("../middlewares/multiUploads");

router.get("/get-all-product", productController.getAllProducts);
router.get("/get-all-draft", authMid, productController.getAllDrafts);
router.get(
  "/get-type/:productType",
  productController.getProductsByProductType
);
router.get(
  "/get-by-category/:category",
  productController.getProductsByCategory
);
router.delete(
  "/delete-product/:id",
  authMid,
  productController.deleteProductById
);
router.get(
  "/get-user-products/:userId",
  productController.getProductsByUserId
);
router.get("/:id", productController.getProductById);

router.post(
  "/create-product",
  authMid,
  upload.array("multiImage"),
  productController.createProduct
);
router.patch(
  "/sold/:id",
  authMid,
  productController.updateProductSold
);
router.patch(
  "/available/:id",
  authMid,
  productController.updateProductAvailable
);
router.put(
  "/update-product/:id",
  authMid,
  upload.array("multiImage"),
  productController.updateProductById
);
module.exports = router;

router.get(
  "/get-limit-product-by-id/:userId/:offset/:limit",
  productController.getProductsByUserIdWithLimit
);
