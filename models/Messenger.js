module.exports = (sequelize, DataTypes) => {
  const Messenger = sequelize.define(
    "Messenger",
    {
      status: {
        type: DataTypes.ENUM,
        values: ["READ", "HIDE", "REMOVED"],
      },
      text: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  );
  Messenger.associate = (models) => {
    Messenger.belongsTo(models.User, {
      as: `Sender`,
      foreignKey: {
        allowNull: false,
        name: `senderId`,
      },
      onUpdate: `RESTRICT`,
      onDelete: `RESTRICT`,
    });
    Messenger.belongsTo(models.User, {
      as: `Receiver`,
      foreignKey: {
        allowNull: false,
        name: `receiverId`,
      },
      onUpdate: `RESTRICT`,
      onDelete: `RESTRICT`,
    });
    Messenger.belongsTo(models.Product, {
      foreignKey: {
        allowNull: false,
        name: `productId`,
      },
    });
  };
  return Messenger;
};
