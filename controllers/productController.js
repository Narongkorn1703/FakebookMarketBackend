const { Product, Photo } = require("../models");
const { upload } = require("../middlewares/upload");
const { Op } = require("Sequelize");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: { [Op.not]: { productStatus: "Draft" } },
      include: Photo,
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
    console.log(req.body)
    const {
      title,
      price,
      brand,
      category,
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
    } = req.body;
    const product = await Product.create({
      title,
      price,
      brand,
      category,
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
    });
    if (req.files) {
      uploadPhotos(req.files, product.id);
    }
    res.status(200).json({ message: "home created", product });
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
    res
      .status(200)
      .json({ message: "here are all of your Drafts", products });
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ where: { id } });
    res.status(200).json({ message: "got product", product });
  } catch (err) {
    next(err);
  }
};

exports.getProductsByProductType = async (req, res, next) => {
  try {
    const { productType } = req.params;
    const products = await Product.findAll({
      where: { productType },
    });
    console.log(products, "yo");
    res
      .status(200)
      .json({ message: "got products " + productType, products });
  } catch (err) {
    next(err);
  }
};

exports.getProductsByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const products = await Product.findAll({ where: { userId } });
    res
      .status(200)
      .json({ message: "got all products" + userId, products });
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
    if (req.file) {
      await Photo.destroy({ where: { productId: id } });
      uploadPhoto(req.file, id);
    }

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
    await upload.array("multiImage");
     const urls = [];
      for (const file of files) {
      const { path } = file;
      const newPath = await cloudinaryImageUploadMethod(path);
      urls.push(newPath);
    }
        console.log(res.secure_url);
      fs.unlinkSync(file.path);
 
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
    console.log(res.secure_url);
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
