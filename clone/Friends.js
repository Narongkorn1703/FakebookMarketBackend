module.exports = (sequelize, DataTypes) => {
  const Friends = sequelize.define(
    "Friends",
    {
      name: DataTypes.STRING,
      friendStatus: {
        type: DataTypes.ENUM,
        values: ["NOT_FRIEND", "IN_FRIEND"],
        defaultValue: "NOT_FRIEND",
        allowNull: false,
      },
      friendRequest: {
        type: DataTypes.ENUM,
        values: ["PENDING", "ACCEPTED", "REJECTED"],
        defaultValue: "PENDING",
      },
    },
    {
      underscored: true,
    }
  );
  return Friends;
};
