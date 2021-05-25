const { Follower, User, Product, sequelize } = require("../models");
const { Op } = require("sequelize");

exports.getFollowers = async (req, res, next) => {
  try {
    const followedId = req.user.id;
    const followersRow = await Follower.findAll({
      where: { followedId },
      include: [
        {
          model: User,
          include: {
            model: Product,
          },
        },
      ],
    });
    const followers = followersRow.map((row) => {
      return row.followerId;
    });
    res.status(200).json({ followers, followersRow });
  } catch (err) {
    next(err);
  }
};

exports.followSomeone = async (req, res, next) => {
  try {
    const followerId = req.user.id;
    const followedId = Number(req.params.id);
    const alreadyFollowing = await Follower.findOne({
      where: { [Op.and]: [{ followerId }, { followedId }] },
    });
    if (alreadyFollowing) {
      return res
        .status(200)
        .json({ message: "you already followed this user" });
    }
    await Follower.create({ followerId, followedId });
    res
      .status(200)
      .json({ message: followerId + " is following " + followedId });
  } catch (err) {
    next(err);
  }
};

exports.unfollowSomeone = async (req, res, next) => {
  try {
    const followerId = req.user.id;
    const followedId = Number(req.params.id);
    await Follower.destroy({
      where: { [Op.and]: [{ followerId }, { followedId }] },
    });
    res
      .status(200)
      .json({ message: followerId + " unfollowed " + followedId });
  } catch (err) {
    next(err);
  }
};
exports.getFollowing = async (req, res, next) => {
  try {
    const followerId = req.user.id;

    const follower = await Follower.findAll({
      where: { followerId },
    });
    const followedId = follower.map((flw, idx) => {
      return flw.followedId;
    });
    const userFollowed = await User.findAll({
      where: {
        id: {
          // [Op.all]: sequelize.literal(followedId),
          [Op.in]: followedId,
        },
      },
    });

    res.status(200).json({ follower, userFollowed });
  } catch (err) {
    next(err);
  }
};
