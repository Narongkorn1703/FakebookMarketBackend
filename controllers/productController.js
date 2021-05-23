const { Product, Photo, User } = require("../models");
const { upload } = require("../middlewares/upload");
const { Op } = require("Sequelize");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const cloudinaryImageUploadMethod = async (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(file, (err, res) => {
      if (err) return res.status(500).send("upload image error");

      // fs.unlinkSync(req.files.path);
      resolve({
        res: res.secure_url,
      });
    });
  });
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: { [Op.not]: { productStatus: "Draft" } },
      include: Photo,
      order: [
        ["id", "DESC"],
        ["createdAt", "DESC"],
      ],
    });
    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  //create product 3ประเภทรวมถึงสร้างDraftได้ด้วย
  try {
    const userId = req.user.id;

    const {
      title,
      price,
      brand,
      category,
      subCategory,
      condition,
      description,
      optional,
      location,
      productType,
      productStatus,
      year,
      model,
      mileage,
      fuelType,
      estateFor,
      estateType,
      numberOfBedroom,
      numberOfBathroom,
      area,
      catFriendly,
      dogFriendly,
      boostStatus,
    } = req.body;
    const product = await Product.create({
      title,
      price,
      brand,
      category,
      subCategory,
      condition,
      description,
      optional,
      location,
      productType,
      productStatus,
      year,
      model,
      mileage,
      fuelType,
      estateFor,
      estateType,
      numberOfBedroom,
      numberOfBathroom,
      area,
      catFriendly,
      dogFriendly,
      userId,
      boostStatus,
    });
    if (req.files) {
      await uploadPhotos(req.files, product.id);
    }
    res.status(200).json({ message: "product created", product });
  } catch (err) {
    next(err);
  }
};

exports.getAllDrafts = async (req, res, next) => {
  //ใช้เรียก Draft
  try {
    const userId = req.user.id;
    const products = await Product.findAll({
      where: { productStatus: "Draft", userId },
    });
    res.status(200).json({ message: "here are all of your Drafts", products });
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({
      where: { id },
      include: Photo,
    });
    res.status(200).json({ message: "got product", product });
  } catch (err) {
    next(err);
  }
};

exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Photo.destroy({ where: { productId: id } });
    await Product.destroy({ where: { id } });
    res.status(200).json({ message: "delete success" });
  } catch (err) {
    next(err);
  }
};
exports.getProductsByProductType = async (req, res, next) => {
  try {
    const { productType } = req.params;
    const products = await Product.findAll({
      where: { productType },
      include: Photo,
      order: [
        ["id", "DESC"],
        ["createdAt", "DESC"],
      ],
    });

    res.status(200).json({ message: "got products " + productType, products });
  } catch (err) {
    next(err);
  }
};

exports.getProductsByCategory = async (req, res, next) => {
  try {
    let { category } = req.params;
    category = category.split("-").join(" ");
    if (category == "ITEM") {
      const products = await Product.findAll({
        where: { productType: category },
        include: Photo,
        order: [
          ["id", "DESC"],
          ["createdAt", "DESC"],
        ],
      });
      return res.status(200).json({ message: "got products ", products });
    }
    const products = await Product.findAll({
      where: { category },
      include: Photo,
      order: [
        ["id", "DESC"],
        ["createdAt", "DESC"],
      ],
    });
    res.status(200).json({ message: "got products ", products });
  } catch (err) {
    next(err);
  }
};

exports.getProductsByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const products = await Product.findAll({
      where: { userId },
      include: Photo,
    });
    res.status(200).json({ message: "got all products" + userId, products });
  } catch (err) {
    next(err);
  }
};

exports.updateProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const {
      title,
      price,
      category,
      condition,
      optional,
      productStatus,
      brand,
      year,
      model,
      mileage,
      fuelType,
      productType,
      estateFor,
      estateType,
      numberOfBedroom,
      numberOfBathroom,
      description,
      area,
      catFriendly,
      location,
      dogFriendly,
    } = req.body;
    if (req.file) {
      await Photo.destroy({ where: { productId: id } });
      uploadPhoto(req.file, id);
    }
    const product = await Product.update(
      {
        title,
        price,
        category,
        condition,
        optional,
        productStatus,
        brand,
        year,
        model,
        mileage,
        fuelType,
        productType,
        estateFor,
        estateType,
        numberOfBedroom,
        numberOfBathroom,
        description,
        area,
        catFriendly,
        location,
        dogFriendly,
      },
      { where: { id } }
    );

    res.status(200).json({ message: "product updated", product });
  } catch (err) {
    next(err);
  }
};

const uploadPhoto = async (file, id) => {
  try {
    await upload.single("image");
    cloudinary.uploader.upload(file.path, async (err, result) => {
      if (err) return next(err);
      await Photo.create({
        post: result.secure_url,
        productId: id,
      });

      fs.unlinkSync(file.path);
    });
  } catch (err) {
    next(err);
  }
};
const uploadPhotos = async (files, id) => {
  try {
    // console.log("Checkpoint 3");
    const urls = [];
    for (const file of files) {
      const { path } = file;
      const newPath = await cloudinaryImageUploadMethod(path);
      urls.push(newPath);
      // console.log("aaaa", newPath);
      await Photo.create({
        post: newPath.res,
        productId: id,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getProductsByUserIdWithLimit = async (req, res, next) => {
  try {
    const { userId, offset, limit } = req.params;
    // console.log(userId, offset, limit);
    const products = await Product.findAll({
      where: { userId },
      include: Photo,
      offset: +offset,
      limit: +limit,
    });
    res.status(200).json({ message: "got all products" + userId, products });
  } catch (err) {
    next(err);
  }
};

exports.getSellerByProductId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({
      where: { id },
      include: [
        {
          model: User,
        },
      ],
    });
    res.status(200).json({ product });
  } catch (err) {
    next(err);
  }
};

module.exports.multiSend = async (req, res, next) => {
  return await upload.array("multiImage")(req, res, async () => {
    const urls = [];
    const files = req.files;
    // if (req.files === undefined) return next(); // สำหรับอัพโดยไม่เอารูป
    if (!files) {
      return res.json({
        message:
          "Invalid image file type ; only accept jpeg, jpg and png (req.files === 'undefined')",
      });
    }
    for (const file of files) {
      const { path } = file;
      const newPath = await cloudinaryImageUploadMethod(path);
      urls.push(newPath);
    }

    // cloudinary.uploader.upload(
    //   req.files.path,
    //   async (err, result) => {
    //     if (err) return next(err);
    //     fs.unlinkSync(req.files.path); // ลบไฟล์ในโฟลเดอร์ local storage

    //     req.imgUrl = result.secure_url;
    //     // next();
    //   }
    // );
  });
};

// const removeDecimal = async () => {
//   const products = await Product.findAll();
//   const fixedProducts = products.map((row) => {
//     if (row.price.includes(".")) {
//       Product.update({ price: row.price.slice(0, -3) }, { where: { id: row.id } });
//       console.log(row.price.slice(0, -3));

//     }
//   })
// }

// removeDecimal()

// exports.getSellerByProductId = async (req, res, next) => {
//   const id = req.params.id;
//   const sellerProfile = await User.findOne({
//     where: { id },
//     // include: User,
//   });
// };
