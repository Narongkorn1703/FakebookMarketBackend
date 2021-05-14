const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "." + file.mimetype.split("/")[1]);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.split("/")[1] === "jpeg" ||
      file.mimetype.split("/")[1] === "jpg" ||
      file.mimetype.split("/")[1] === "png"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("this file is not a photo"));
    }
  },
});

const cloudinaryImageUploadMethod = async (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(file, (err, res) => {
      if (err) return res.status(500).send("upload image error");
      console.log(res.secure_url);

      resolve({
        res: res.secure_url,
      });
    });
  });
};

module.exports.multiSend = async (req, res, next) => {
  return await upload.array("multiImage")(req, res, async () => {
    const urls = [];
    const files = req.files;
    // if (req.files === undefined) return next();
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
