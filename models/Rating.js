module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    "Rating",
    {
      score: DataTypes.DECIMAL(10, 1),
      fairPricing: DataTypes.INTEGER,
      friendliness: DataTypes.INTEGER,
      itemDescription: DataTypes.INTEGER,
      punctuality: DataTypes.INTEGER,
      reliability: DataTypes.INTEGER,
      responseTime: DataTypes.INTEGER,
    },
    {
      underscored: true,
    }
  );
  Rating.associate = (models) => {
    Rating.belongsTo(models.User, {
      foreignKey: {
        name: `sellerId`,
        allowNull: false,
        field: `seller_id`,
      },
      onUpdate: `RESTRICT`,
      onDelete: `RESTRICT`,
    });
    Rating.belongsTo(models.User, {
      foreignKey: {
        name: `userId`,
        allowNull: false,
        field: `user_id`,
      },
      onUpdate: `RESTRICT`,
      onDelete: `RESTRICT`,
    });
  };

  return Rating;
};
