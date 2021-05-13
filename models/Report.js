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
        name: `sellerId`,
        allowNull: false,
        field: `seller_id`,
      },
      onUpdate: `RESTRICT`,
      onDelete: `RESTRICT`,
    });
    Report.belongsTo(models.User, {
      foreignKey: {
        name: `submittedId`,
        allowNull: false,
        field: `submitted_id`,
      },
      onUpdate: `RESTRICT`,
      onDelete: `RESTRICT`,
    });
  };
  return Report;
};
