module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define(
    "Report",
    {
      report: {
        type: DataTypes.ENUM,
        values: [
          "already sold",
          "inaccurate Price or description",
          "did not show up",
          "stopped responding",
          "scam",
          "did not receive item",
        ],
      },
    },
    {
      underscored: true,
    }
  );
  Report.associate = (models) => {
    Report.belongsTo(models.User, {
      foreignKey: {
        name: `userId`,
        allowNull: false,
        field: `user_id`,
      },
      onUpdate: `RESTRICT`,
      onDelete: `RESTRICT`,
    });
    Report.belongsTo(models.User, {
      foreignKey: {
        name: `submitedId`,
        allowNull: false,
        field: `submited_id`,
      },
      onUpdate: `RESTRICT`,
      onDelete: `RESTRICT`,
    });
  };
  return Report;
};
