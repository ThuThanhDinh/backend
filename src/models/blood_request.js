'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blood_Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Blood_Request.hasMany(models.User);
      // Blood_Request.belongsToMany(models.Role, { through: "Group_Role" });
    }
  };

  //ORM
  Blood_Request.init({
    hospitalName: DataTypes.STRING,
    doctorID: DataTypes.INTEGER,
    mobile: DataTypes.STRING,
    typeOfBlood: DataTypes.STRING,
    quanlity: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'Blood_Request',
  });
  return Blood_Request;
};