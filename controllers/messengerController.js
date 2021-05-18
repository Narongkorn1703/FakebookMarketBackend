const { Messenger, User, sequelize, Sequelize } = require("../models");

const { Op } = require("Sequelize");

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

exports.getAllMessages = async (req, res, next) => {
  try {
    const senderId = req.user.id;
    const receiverId = req.params.id;
    //console.log(req.user);

    //หาทั้งที่เราคุยกะเค้า เค้าคุยกะเรา message จะเปนก้อน arr ตอบกลับไปมา
    const messages = await Messenger.findAll({
      where: {
        [Op.or]: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      },
      include: [
        {
          model: User,
          as: "Receiver",
        },
        {
          model: User,
          as: "Sender",
        },
      ],
    });

    // ตอนแรกจะ getUserTalk

    // const receiver = await Messenger.findAll({
    //   where: {
    //     senderId,
    //   },
    //   attributes: ["receiverId"],
    // });

    // const sender = await Messenger.findAll({
    //   where: {
    //     receiverId,
    //   },

    //   attributes: ["senderId"],
    // });

    // const disReceiverIds = receiver.reduce((acc, cur) => {
    //   if (acc.includes(cur.receiverId)) return acc;
    //   acc.push(cur.receiverId);
    //   return acc;
    // }, []);

    // const disSenderIds = sender.reduce((acc, cur) => {
    //   if (acc.includes(cur.senderId)) return acc;
    //   acc.push(cur.senderId);
    //   return acc;
    // }, []);

    // const finalIds = Array.from(new Set([...disReceiverIds, ...disSenderIds]));

    // const talkUsers = await User.findAll({ where: { id: finalIds } });

    res.status(200).json({ messages });
  } catch (err) {
    next(err);
  }
};
