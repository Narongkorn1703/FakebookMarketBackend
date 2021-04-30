module.exports = (sequelize, DataTypes) => {
  const BoostProduct = sequelize.define(
    "BoostProduct",
    {
      bidValue: DataTypes.DECIMAL(10, 1),
    },
    {
      underscored: true,
    }
  );
  BoostProduct.associate = (models) => {
    BoostProduct.belongsTo(models.Products, {
      foreignKey: {
        name: `productId`,
        allowNull: false,
        field: `product_id`,
      },
      onUpdate: `RESTRICT`,
      onDelete: `RESTRICT`,
    });
  };
  return BoostProduct;
};
