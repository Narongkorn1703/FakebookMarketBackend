module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      postContent: {
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
    }
  );
  return Post;
};
