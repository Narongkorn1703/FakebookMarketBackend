const { Follower } = require("../models");
const { Op } = require("sequelize");

exports.getFollowers = async (req, res, next) => {
  try {
    const followedId = req.user.id;
    const followersRow = await Follower.findAll({ where: { followedId } });
    const followers = followersRow.map((row) => {
      return row.followerId
    });
    res.status(200).json({followers, followersRow})
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
      return res.status(200).json({message:"you already followed this user"})
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
    console.log(req.user);
    const followers = await Follower.findAll({ where: { followerId } });
    console.log(followers);
    res.status(200).json({ followers });
  } catch (err) {
    next(err);
  }
};
