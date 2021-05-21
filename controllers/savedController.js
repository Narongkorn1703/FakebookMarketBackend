const { Saved, Photo, Product } = require("../models");
const { Op } = require("sequelize");

exports.getAllSaved = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const productId = Number(req.params.productId);
    const saveds = await Saved.findAll({
      where: { userId },
      include: [
        {
          model: Product,
          include: {
            model: Photo,
          },
        },
      ],
    });
    const arrSavedProductId = saveds.map((row) => {
      return row.productId;
    });
    res.status(200).json({ saveds, arrSavedProductId });
  } catch (err) {
    next(err);
  }
};

exports.createSaved = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const productId = Number(req.params.productId);

    const alreadySaved = await Saved.findOne({
      where: { [Op.and]: [{ userId }, { productId }] },
    });
    if (alreadySaved) {
      return res
        .status(200)
        .json({ message: "you already saved this product" });
    }
    await Saved.create({ userId, productId });
    res.status(200).json({
      message:
        "save created to userId: " +
        userId +
        " productId: " +
        productId,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteSaved = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const productId = Number(req.params.productId);
    await Saved.destroy({
      where: { [Op.and]: [{ userId }, { productId }] },
    });
    res.status(200).json({ message: "deleted" });
  } catch (err) {
    next(err);
  }
};

exports.getIsSaved = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const productId = Number(req.params.productId);
    const savedProduct = await Saved.findOne({
      where: { [Op.and]: [{ userId }, { productId }] },
    });
    if (savedProduct) {
      return res.status(200).json({ saved: true });
    } else {
      return res.status(200).json({ saved: false });
    }
  } catch (err) {
    next(err);
  }
};
