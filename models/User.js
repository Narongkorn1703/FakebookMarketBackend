module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
      },

      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
      },
      roles: {
        type: DataTypes.ENUM,
        values: ["USER", "ADMIN"],
        defaultValue: "USER",
        allowNull: false,
      },
      bio: {
        type: DataTypes.ENUM,
        values: ["MALE", "FEMALE", "OTHER"],
      },
      location: DataTypes.STRING,
      avatar: {
        type: DataTypes.STRING,
      },
      coverPhoto: {
        type: DataTypes.STRING,
      },
      birthDate: DataTypes.DATE,
      joinYear: DataTypes.DATE,
    },
    {
      underscored: true,
    }
  );
  User.associate = (models) => {
    User.hasMany(models.Follower, {
      foreignKey: {
        name: `userId`,
        allowNull: false,
        field: `user_id`,
      },
      onUpdate: `RESTRICT`,
      onDelete: `RESTRICT`,
    });
    User.hasMany(models.Follower, {
      foreignKey: {
        name: `followerId`,
        allowNull: false,
        field: `follower_id`,
      },
      onUpdate: `RESTRICT`,
      onDelete: `RESTRICT`,
    });
    User.hasMany(models.Messenger, {
      foreignKey: {
        name: `receiverId`,
        allowNull: false,
        field: `receiver_id`,
      },
      onUpdate: `RESTRICT`,
      onDelete: `RESTRICT`,
    });
    User.hasMany(models.Messenger, {
      foreignKey: {
        name: `senderId`,
        allowNull: false,
        field: `sender_id`,
      },
      onUpdate: `RESTRICT`,
      onDelete: `RESTRICT`,
    });
    User.hasMany(models.Product, {
      foreignKey: {
        name: `userId`,
        allowNull: false,
        field: `user_id`,
      },
      onUpdate: `RESTRICT`,
      onDelete: `RESTRICT`,
    });
    User.hasMany(models.Report, {
      foreignKey: {
        name: `userId`,
        allowNull: false,
        field: `user_id`,
      },
      onUpdate: `RESTRICT`,
      onDelete: `RESTRICT`,
    });
    User.hasMany(models.Report, {
      foreignKey: {
        name: `submitedId`,
        allowNull: false,
        field: `submited_id`,
      },
      onUpdate: `RESTRICT`,
      onDelete: `RESTRICT`,
    });
    User.hasMany(models.Rating, {
      foreignKey: {
        name: `sellerId`,
        allowNull: false,
        field: `seller_id`,
      },
      onUpdate: `RESTRICT`,
      onDelete: `RESTRICT`,
    });
    User.hasMany(models.Rating, {
      foreignKey: {
        name: `userId`,
        allowNull: false,
        field: `user_id`,
      },
      onUpdate: `RESTRICT`,
      onDelete: `RESTRICT`,
    });
    User.hasMany(models.Saved, {
      foreignKey: {
        name: `userId`,
        allowNull: false,
        field: `user_id`,
      },
      onUpdate: `RESTRICT`,
      onDelete: `RESTRICT`,
    });
  };
  return User;
};

