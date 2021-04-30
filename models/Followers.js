module.exports = (sequelize, DataTypes) => {
  const Followers = sequelize.define(
    "Followers",
    {},
    {
      underscored: true,
    }
  );
  Followers.associate = (models) => {
    Followers.belongsTo(models.User, {
      foreignKey: {
        name: `userId`,
        allowNull: false,
        field: `user_id`,
      },
      onUpdate: `RESTRICT`,
      onDelete: `RESTRICT`,
    });
    Followers.belongsTo(models.User, {
      foreignKey: {
        name: `followerId`,
        allowNull: false,
        field: `follower_id`,
      },
      onUpdate: `RESTRICT`,
      onDelete: `RESTRICT`,
    });
  };
  return Followers;
};
