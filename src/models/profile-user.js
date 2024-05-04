'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile_User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  //ORM
  Profile_User.init({
    fullName: DataTypes.STRING,
    gender: DataTypes.STRING,
    dateOfBirth: DataTypes.STRING,
    idCardVisaNo: DataTypes.STRING,
    bloodGroup: DataTypes.STRING,
    mobile: DataTypes.STRING,
    city: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'Profile_User',
  });
  return Profile_User;
};