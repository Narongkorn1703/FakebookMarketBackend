const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { JWT_SECRET, BCRYPT_SALT, JWT_EXPIRES_IN } = process.env;
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      location,
      bio,
      avatar,
      coverPhoto,
      birthDate,
    } = req.body;
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const JoinYear = today.toUTCString();
    console.log(today);
    if (!password == "" && password.length < 6)
      return res.status(401).json({
        message:
          "password is required  and password must values more than 6",
      });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "password not match" });
    const hashedPassword = await bcrypt.hash(password, +BCRYPT_SALT);
    const users = await User.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      location,
      bio,
      avatar,
      coverPhoto,
      birthDate,
      joinYear: JoinYear,
    });

    const payload = { id: users.id, email, firstName, lastName, bio };
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: +JWT_EXPIRES_IN,
    });
    res.status(201).json({ token });
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
        .json({ message: "usersname or password incorrect" });
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
exports.getProfile = async (req, res, next) => {
  const {
    email,
    firstName,
    lastName,
    roles,
    bio,
    location,
    avatar,
    coverPhoto,
    birthDate,
    joinYear,
  } = req.user;

  res.status(200).json({
    email,
    firstName,
    lastName,
    roles,
    bio,
    location,
    avatar,
    coverPhoto,
    birthDate,
    joinYear,
    payload: req.payload,
  });
};
exports.updateProfile = async (req, res, next) => {
  const { id } = req.user;
  const {
    firstName,
    lastName,
    location,
    avatar,
    coverPhoto,
    birthDate,
  } = req.body;
  await User.update(
    { firstName, lastName, location, avatar, coverPhoto, birthDate },
    { where: { id } }
  );
  const Updateduser = await User.findOne({ where: { id } });
  res.status(200).json({ message: "update complete", Updateduser });
};
