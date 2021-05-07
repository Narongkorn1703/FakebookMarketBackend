module.exports = (sequelize, DataTypes) => {
  const Follower = sequelize.define(
    "Follower",
    {},
    {
      underscored: true,
    }
  );
  Follower.associate = (models) => {
    Follower.belongsTo(models.User, {
      foreignKey: {
        name: `userId`,
        allowNull: false,
        field: `user_id`,
      },
      onUpdate: `RESTRICT`,
      onDelete: `RESTRICT`,
    });
    Follower.belongsTo(models.User, {
      foreignKey: {
        name: `followerId`,
        allowNull: false,
        field: `follower_id`,
      },
      onUpdate: `RESTRICT`,
      onDelete: `RESTRICT`,
    });
  };
  return Follower;
};
