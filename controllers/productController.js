const { Product } = require("../models");

exports.getAllProducts = async (req, res, next) => { //ใช้หน้าBrowseแสดงแค่ Title Price 
    try {
      const products = await Product.findAll();
      res.status(200).json({ products });
    } catch (err) {
      next(err);
    }
  };


exports.createProduct = async (req, res, next) => { //create product 3ประเภทรวมถึงสร้างDraftได้ด้วย
  try {
      const userId = req.user.id
      if(req.body.productType == "ITEM"){
        const {
          photos,
          title,
          price,
          brand,
          category,
          condition,
          description,
          optional,
          location,
          productType,
          productStatus,
       
        } = req.body;
          const product = await Product.create( {
            photos,
            title,
            price,
            brand,
            category,
            condition,
            description,
            optional,
            location,
            productType,
            productStatus,
            userId
          });
          res.status(200).json({message: "item created", product});
      } else if(req.body.productType == "VEHICLE"){
        const {
          photos,
          type,
          price,
          brand,
          year,
          model,
          description,
          mileage,
          fuelType,
          location,
          productType,
          productStatus
        } = req.body;
        const product = await Product.create( {
          photos,
          type,
          price,
          brand,
          year,
          model,
          description,
          mileage,
          fuelType,
          location,
          productType,
          productStatus,
          userId
        });
        res.status(200).json({message: "vehicle created", product});
      } else if (req.body.productType == "HOME"){
        const {
          photos,
          estateFor,
          price,
          estateType,
          numberOfBedroom,
          numberOfBathroom,
          description,
          area,
          catFriendly,
          location,
          dogFriendly,
          productType,
          productStatus
        } = req.body;
        const product = await Product.create( {
          photos,
          estateFor,
          price,
          estateType,
          numberOfBedroom,
          numberOfBathroom,
          description,
          area,
          catFriendly,
          location,
          dogFriendly,
          productType,
          productStatus,
          userId
        });
        res.status(200).json({message: "home created", product});
      } else {
        return res.status(400).json({message:"Wrong type of product"})
      }
    } catch (err) {
      next(err);
    }
  };


  exports.getAllDrafts = async (req, res, next) => { //ใช้เรียก Draft
    try {
      const userId = req.user.id;
      const products = await Product.findAll({where:{productStatus:"Draft",userId}});
      res.status(200).json({ message:"here are all of your Drafts", products });
    } catch (err) {
      next(err);
    }
  }; 

  exports.getProductById = async (req, res, next) => {
    try {
    
      const id = req.params.id;
      const product = await Product.findOne({where:{id}});
      res.status(200).json({ message:"got product", product });
    } catch (err) {
      next(err);
    }
};
  
  exports.getProductsByProductType = async (req, res, next) => {
  try {
    console.log("thiswork",req.params)
    const { productType } = req.params;
    
    const products = await Product.findAll({ where: { productType } });
    console.log(products, "yo")
    res.status(200).json({ message:"got products " + productType, products });
  } catch (err) {
    next(err);
  }
};

exports.getProductsByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const products = await Product.findAll({where:{userId}});
    res.status(200).json({ message:"got all products" + userId, products });
  } catch (err) {
    next(err);
  }
};


