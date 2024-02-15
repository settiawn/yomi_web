'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      List.belongsTo(models.Profile, {foreignKey: "profileId"})
    }
  }
  List.init({
    profileId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mangaId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    coverId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    comments: DataTypes.TEXT,
    rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'List',
  });
  return List;
};