const { Rating } = require("../models");
const { Op } = require("sequelize");

exports.createRating = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const sellerId = Number(req.params.sellerId);
    const {
      score,
      friendliness,
      fairPricing,
      itemDescription,
      punctuality,
      reliability,
      responseTime,
    } = req.body;
    await Rating.create({
      score,
      friendliness,
      fairPricing,
      itemDescription,
      punctuality,
      reliability,
      responseTime,
      userId,
      sellerId,
    });
    res.status(200).json({
      message:
        "Rating created with sellerId: " + sellerId + " with Score " + score,
    });
  } catch (err) {
    next(err);
  }
};

exports.getRating = async (req, res, next) => {
  try {
    const sellerId = Number(req.params.sellerId);
    const ratingObj = await Rating.findAll({ where: { sellerId } });
    const numberOfRating = ratingObj.length;
    const avgRating = Math.round(
      ratingObj.reduce((acc, cur) => acc + +cur.score, 0) / ratingObj.length
    );
    const sumFairPricing = ratingObj.reduce(
      (acc, cur) => acc + +cur.fairPricing,
      0
    );
    const friendliness = ratingObj.reduce(
      (acc, cur) => acc + +cur.friendliness,
      0
    );
    const itemDescription = ratingObj.reduce(
      (acc, cur) => acc + +cur.itemDescription,
      0
    );
    const punctuality = ratingObj.reduce(
      (acc, cur) => acc + +cur.punctuality,
      0
    );
    const reliability = ratingObj.reduce(
      (acc, cur) => acc + +cur.reliability,
      0
    );
    const responseTime = ratingObj.reduce(
      (acc, cur) => acc + +cur.responseTime,
      0
    );
    res.status(200).json({
      avgRating,
      sumFairPricing,
      friendliness,
      itemDescription,
      punctuality,
      reliability,
      responseTime,
      numberOfRating // จำนวนคนที่โหวต
    });
  } catch (err) {
    next(err);
  }
};
