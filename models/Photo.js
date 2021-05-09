module.exports = (sequelize, DataTypes) => {
    const Photo = sequelize.define(
      "Photo",
        {
          post: DataTypes.STRING(1200)
    
        },
     
      {
        underscored: true,
      }
    );
    Photo.associate = (models) => {
        Photo.belongsTo(models.Product, {
            foreignKey: {
                name: `productId`,
                allowNull: false,
                field: `product_id`,
            },
            onUpdate: `RESTRICT`,
            onDelete: `RESTRICT`,
        });
    }
    return Photo;
  };
  