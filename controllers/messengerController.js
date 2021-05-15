const { Messenger } = require("../models");

exports.createMessages = async (req, res, next) => {
  try {
    const { text } = req.body;
    const receiverId = Number(req.params.id);

    const messages = await Messenger.create({
      senderId: req.user.id,
      receiverId,
      text,
    });
    res.status(200).json({ messages });
  } catch (err) {
    next(err);
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    const senderId = req.user.id;
    console.log(req.user);
    const messages = await Messenger.findAll({ where: { senderId } });
    console.log(messages);
    res.status(200).json({ messages });
  } catch (err) {
    next(err);
  }
};
//get all retrieve messages
// exports.getAllMessages = async (req, res, next) => {
//     //ใช้เรียก Draft
//     try {
//       const userId = req.user.id;
//       const messages = await Messenger.findAll({
//         where: { productStatus: "Draft", userId },
//       });
//       res
//         .status(200)
//         .json({ message: "here are all of your Drafts", products });
//     } catch (err) {
//       next(err);
//     }
//   };
