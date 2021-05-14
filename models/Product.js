module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      title: DataTypes.STRING,
      price: DataTypes.DECIMAL(10, 2),
      category: {
        type: DataTypes.ENUM,
        values: [
          "Home & Garden",
          "Clothing & Accessories",
          "Electronics",
          "Family",
          "Hobbies",
          "Entertainment",
          "Vehicle",
        ],
      },
      subCategory: {
        type: DataTypes.ENUM,
        values: [
          "Tools",
          "Furniture",
          "Garden",
          "Appliances",
          "Household",
          "Jewelry & Accessories",
          "Cellphones",
          "Toys & Games",
          "Sports & Outdoors",
          "Books",
          "Movies & Music",
          "Bag & Luggage",
          "Electronics & Computers",
          "Baby & kids",
          "	Musical Instruments",
          "Video Games",
          "Men's Clothing & Shoes",
          "Pet Supplies",
          "Arts & Crafts",
          "Women's Clothing & Shoes",
          "Healthy & Beauty",
          "Antiques & Collectibles",
          "Auto Parts",
          "Bicycles",
          "Vehicle",
          "Property Rental",
        ],
      },
      condition: {
        type: DataTypes.ENUM,
        values: ["New", "Used - Like New", "Used - Good", "Used - Fair"],
      },
      description: DataTypes.STRING,
      optional: DataTypes.STRING,
      location: DataTypes.STRING,
      productType: {
        type: DataTypes.ENUM,
        values: ["ITEM", "VEHICLE", "HOME"],
        allowNull: false,
      },
      productStatus: {
        type: DataTypes.ENUM,
        values: [
          "Pending",
          "Out of Stock",
          "Draft",
          "Available",
          "Sold",
          "Rented",
          "In Stock",
          "Single Item",
          "Shipped",
          "Paid"
        ],
        defaultValue : "Draft"
      },
      vehicleType: {
        type: DataTypes.STRING,
      },
      year: {
        type: DataTypes.INTEGER,
      },
      brand: DataTypes.STRING,
      model: DataTypes.STRING,
      mileage: DataTypes.INTEGER,
      fuelType: DataTypes.STRING,
      tranmission: {
        type: DataTypes.ENUM,
        values: ["Automatic", "Manual"],
      },
      numberOfBed: DataTypes.INTEGER,
      numberOfBathroom: DataTypes.INTEGER,
      area: DataTypes.STRING,
      estateType: {
        type: DataTypes.ENUM,
        values: ["Condo", "House", "Apartment"],
      },
      estateFor: {
        type: DataTypes.ENUM,
        values: ["RENT", "SALE"],
      },
      petFriendly: DataTypes.BOOLEAN,
      boostStatus: DataTypes.BOOLEAN,
      bidValue: DataTypes.DECIMAL(10, 1),
    },
    {
      underscored: true,
    }
  );
  Product.associate = (models) => {
    Product.belongsTo(models.User, {
      foreignKey: {
        name: `userId`,
        allowNull: false,
        field: `user_id`,
      },
    });

    Product.hasMany(models.Saved, {
      foreignKey: {
        name: `productId`,
        allowNull: false,
        field: `product_id`,
      },
      onUpdate: `RESTRICT`,
      onDelete: `RESTRICT`,
    });
    Product.hasMany(models.Photo, {
      foreignKey: {
        name: `productId`,
        allowNull: false,
        field: `product_id`,
      },
      onUpdate: `RESTRICT`,
      onDelete: `RESTRICT`,
    });
  };
  return Product;
};
