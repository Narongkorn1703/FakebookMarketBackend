const { Messenger, User, Product, Photo } = require("../models");

const { Op } = require("Sequelize");

exports.createMessages = async (req, res, next) => {
  try {
    const { text, productId } = req.body;

    const receiverId = Number(req.params.id);

    const messages = await Messenger.create({
      senderId: req.user.id,
      productId,
      receiverId,
      text,
    });
    console.log("receiver", receiverId);
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
          model: Product,
          attributes: ["id", "title"],
          include: [
            {
              model: Photo,
            },
          ],
        },
      ],
      order: [["createdAt"]],
    });

    res.status(200).json({ messages });
  } catch (err) {
    next(err);
  }
};

exports.getAllMessagesIncProduct = async (req, res, next) => {
  try {
    const senderId = req.user.id;
    const receiverId = req.params.id;
    const productId = req.params.productId;

    //หาทั้งที่เราคุยกะเค้า เค้าคุยกะเรา message จะเปนก้อน arr ตอบกลับไปมา
    const messages = await Messenger.findAll({
      where: {
        [Op.or]: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      },
    });

    const product = await Product.findOne({
      where: { id: +productId },
      include: Photo,
    });

    res.status(200).json({ messages, product });
  } catch (err) {
    next(err);
  }
};

exports.getMessagesByProductId = async (req, res, next) => {
  try {
    const productId = Number(req.params.id);

    const product = await Product.findOne({
      where: { id: productId },
      include: Photo,
    });

    const messages = await Messenger.findAll({
      where: { productId },
      include: [
        {
          model: Product,

          attributes: ["id", "title", "price"],
        },
        {
          model: User,
          as: "Sender",

          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: User,
          as: "Receiver",

          attributes: ["id", "firstName", "lastName"],
        },
      ],
    });

    res.status(200).json({ messages, product });
  } catch (err) {
    next(err);
  }
};
exports.getTalkUser = async (req, res, next) => {
  try {
    const senderId = req.user.id;
    //  const receiverId = req.params.id;

    //get msg หา receiverId โดย user.id เราไปคุยกะใคร
    const receiver = await Messenger.findAll({
      where: {
        senderId,
      },
      attributes: ["receiverId"],
    });

    //get msg หา senderId โดย  receiverId เราคุยกะใคร
    const sender = await Messenger.findAll({
      where: {
        senderId,
      },
      attributes: ["senderId"],
    });

    //เอาตัว receiverId ที่ซ้ำออก
    const disReceiverIds = receiver.reduce((acc, cur) => {
      if (acc.includes(cur.receiverId)) return acc;
      acc.push(cur.receiverId);
      return acc;
    }, []);

    const disSenderIds = sender.reduce((acc, cur) => {
      if (acc.includes(cur.senderId)) return acc;
      acc.push(cur.senderId);
      return acc;
    }, []);

    //merge array ได้ คนที่เราคุยทั้งหมด
    const finalIds = Array.from(new Set([...disReceiverIds, ...disSenderIds]));

    const talkUsers = await User.findAll({ where: { id: finalIds } });

    //talkUsers.map((i) => console.log(i.id));

    // const message= await Messenger.findAll({ where: {
    //   [Op.or]: [
    //     { senderId, receiverId },
    //     { senderId: receiverId, receiverId: senderId },
    //   ],
    // },
    // include: [
    //   {
    //     model: Product,
    //     attributes: ["id", "title"],
    //     include: [
    //       {
    //         model: Photo,
    //       },
    //     ],
    //   },
    // ],
    res.status(200).json({
      messages: "talkUser",
      talkUsers,
    });
  } catch (err) {
    next(err);
  }
};

//find product by userid
//ได้ productทีี่มีid แล้ว

// exports.getProductTalk = async (req, res, next) => {
//   try {
//     const senderId = req.params.senderId;
//     // const receiverId = req.params.id;

//     //get msg หา receiverId โดย user.id เราไปคุยกะใคร
//     // const userId = req.params.userId;
//     const products = await Product.findAll({
//       where: { productId: senderId },
//       include: Photo,
//     });

//     //get msg หา senderId โดย  receiverId เราคุยกะใคร
//     // const sender = await Messenger.findAll({
//     //   where: {
//     //     receiverId,
//     //   },
//     //   attributes: ["senderId"],
//     // });

//     // //เอาตัว receiverId ที่ซ้ำออก
//     // const disReceiverIds = receiver.reduce((acc, cur) => {
//     //   if (acc.includes(cur.receiverId)) return acc;
//     //   acc.push(cur.receiverId);
//     //   return acc;
//     // }, []);

//     // const disSenderIds = sender.reduce((acc, cur) => {
//     //   if (acc.includes(cur.senderId)) return acc;
//     //   acc.push(cur.senderId);
//     //   return acc;
//     // }, []);

//     // //merge array ได้ คนที่เราคุยทั้งหมด
//     // const finalIds = Array.from(new Set([...disReceiverIds, ...disSenderIds]));

//     // const talkUsers = await User.findAll({ where: { id: finalIds } });

//     res.status(200).json({ products });
//   } catch (err) {
//     next(err);
//   }
// };

//
exports.getAllMessagesAndProduct = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const messages = await Messenger.findAll({
      where: { [Op.or]: [{ senderId: userId }, { receiverId: userId }] },
      include: [
        {
          model: Product,
          attributes: ["id", "title", "userId"],
          include: [
            {
              model: Photo,
            },
            {
              model: User,
              attributes: ["id", "firstName", "lastName"],
            },
          ],
        },
        {
          model: User,
          as: "Sender",
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: User,
          as: "Receiver",
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    });
    const arr = messages.map((message) => {
      return {
        chatId: [
          message.productId,
          ...[message.receiverId, message.senderId].sort((a, b) => a - b),
        ].join("-"),
        ...message.dataValues,
      };
    });
    //console.log(messagesByProduct);
    res.status(200).json({ arr });
  } catch (err) {
    next(err);
  }
};

exports.getAllMessagesWithProduct = async (req, res, next) => {
  try {
    const senderId = req.user.id;
    const receiverId = req.params.id;
    const productId = req.params.productId;

    //หาทั้งที่เราคุยกะเค้า เค้าคุยกะเรา message จะเปนก้อน arr ตอบกลับไปมา
    const messages = await Messenger.findAll({
      where: {
        productId: productId,
        [Op.or]: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      },
    });

    res.status(200).json({ messages });
  } catch (err) {
    next(err);
  }
};
