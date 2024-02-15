'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User, {foreignKey: "userId"})
      Profile.hasMany(models.List, {foreignKey: "profileId"})
    }
  }
  Profile.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name can't be empty",
        },
        notNull: {
          msg: "Name can't be empty",
        },
      },
      defaultValue: "user" + Date.now()
    },
    picture: DataTypes.STRING,
    bio: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "normal"
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};