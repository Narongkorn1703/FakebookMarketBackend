module.exports = (sequelize, DataTypes) => {
  const Saved = sequelize.define("Saved", {}, { underscored: true });
  Saved.associate = (models) => {
    Saved.belongsTo(models.User, {
      foreignKey: {
        name: `userId`,
        allowNull: false,
        field: `user_id`,
      },
    });
    Saved.belongsTo(models.Product, {
      foreignKey: {
        name: `productId`,
        allowNull: false,
        field: `product_id`,
      },
    });
  };
  return Saved;
};
