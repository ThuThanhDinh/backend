'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blood_Donor extends Model {
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
  Blood_Donor.init({
    name: DataTypes.STRING,
    mobile: DataTypes.STRING,
    city: DataTypes.STRING,
    type: DataTypes.STRING,


  }, {
    sequelize,
    modelName: 'Blood_Donor',
  });
  return Blood_Donor;
};