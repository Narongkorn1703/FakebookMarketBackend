module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    "Products",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      photo: DataTypes.STRING,
      price: DataTypes.DECIMAL(10, 2),
      categories: {
        type: DataTypes.ENUM,
        values: [
          "Home&Garden",
          "Entertainment",
          "Clothing&Accessories",
          "Family",
          "Electronics",
          "HOBBIES",
          "Classifieds",
          "Vehicle",
        ],
        allowNull: false,
      },
      condition: {
        type: DataTypes.ENUM,
        values: ["NEW", "USED-LIKE-NEW", "USED-GOOD", "USED-FAIR"],
      },
      description: DataTypes.STRING,
      optional: DataTypes.STRING,
      location: DataTypes.STRING,
      availability: {
        type: DataTypes.ENUM,
        values: ["OUTOFSTOCK", "AVAILABLE"],
      },
      productType: {
        type: DataTypes.ENUM,
        values: ["ITEMS", "VEHICLE", "HOME"],
        allowNull: false,
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
      estate_type: {
        type: DataTypes.ENUM,
        values: ["Condo", "House", "Apartment"],
      },
      estate_for: {
        type: DataTypes.ENUM,
        values: ["RENT", "SALE"],
      },
      statusDaft: {
        type: DataTypes.ENUM,
        values: ["Daft", "Done"],
      },
      petFriendly: {
        type: DataTypes.ENUM,
        values: ["true", "false"],
      },
      boostStatus: {
        type: DataTypes.ENUM,
        values: ["true", "false"],
      },
      bidValue: DataTypes.DECIMAL(10, 1),
    },
    {
      underscored: true,
    }
  );
  Products.associate = (models) => {
    Products.belongsTo(models.User, {
      foreignKey: {
        name: `userId`,
        allowNull: false,
        field: `user_id`,
      },
    });

    Products.hasMany(models.Saved, {
      foreignKey: {
        name: `productId`,
        allowNull: false,
        field: `product_id`,
      },
      onUpdate: `RESTRICT`,
      onDelete: `RESTRICT`,
    });
  };
  return Products;
};
