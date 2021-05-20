const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { JWT_SECRET, BCRYPT_SALT, JWT_EXPIRES_IN } = process.env;
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

exports.register = async (req, res, next) => {
  try {
    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      location,
      gender,
      birthDate,
    } = req.body;
   
    const timeElapsed = Date.now();
    const today = new Date(Date.now()).toUTCString();
    const joinYear = today;

  
    if (!password == "" && password.length < 6)
      return res.status(401).json({
        message:
          "password is required  and password must values more than 6",
      });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "password not match" });
  
    const hashedPassword = await bcrypt.hash(password, +BCRYPT_SALT);
    const user = await User.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      location,
      birthDate,
      joinYear,
      gender,
    });

    const payload = {
      id: user.id,
      email,
      firstName,
      lastName,
      location,
      birthDate,
      joinYear,
      gender,
    };
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: +JWT_EXPIRES_IN,
    });
    res.status(201).json({ message: "registered", token });
  } catch (err) {
    next(err);
  }
};
exports.SignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const users = await User.findOne({ where: { email } });
    if (!users)
      return res
        .status(400)
        .json({ message: "username or password incorrect" });

    const isMatch = await bcrypt.compare(password, users.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "username or password incorrect" });
    const payload = {
      id: users.id,
      email: users.email,
      firstName: users.firstName,
      lastName: users.lastName,
      bio: users.bio,
      role: users.role,
      joinYear: users.joinYear,
    };
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: +JWT_EXPIRES_IN,
    });
    res.status(200).json({ token, payload });
  } catch (err) {
    next(err);
  }
};
exports.updateLocation = async (req, res, next) => {
  const { id } = req.user;
  const { location } = req.body;
  await User.update({ location }, { where: { id } });
  const Updateduser = await User.findOne({ where: { id } });
  res.status(200).json({ message: "update complete", Updateduser });
};

exports.uploadAvatar = async (req, res, next) => {
  const { id } = req.user;

  try {
    cloudinary.uploader.upload(req.file.path, async (err, result) => {
      if (err) return next(err);
     
      await User.update(
        {
          avatar: result.secure_url,
        },
        { where: { id } }
      );
      const user = await User.findOne({ where: { id } });
      fs.unlinkSync(req.file.path);
      res.status(200).json({ avatar: user.avatar });
    });
  } catch (e) {
    next(e);
  }
};

exports.getSellerCommerceProfile = async (req, res, next) => {
  const id = req.params.id;
  const sellerProfile = await User.findOne({ where: { id } });
  // console.log(id, sellerProfile);
  res.status(200).json({
    sellerProfile,
  });
};
