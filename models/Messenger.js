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
      foreignKey: {
        name: `senderId`,
        allowNull: false,
        field: `sender_id`,
      },
      onUpdate: `RESTRICT`,
      onDelete: `RESTRICT`,
    });
    Messenger.belongsTo(models.User, {
      foreignKey: {
        name: `receiverId`,
        allowNull: false,
        field: `receiver_id`,
      },
      onUpdate: `RESTRICT`,
      onDelete: `RESTRICT`,
    });
  };
  return Messenger;
};
