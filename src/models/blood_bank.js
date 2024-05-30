'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Blood_Bank extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Blood_Bank.hasMany(models.User);
            // Blood_Bank.belongsToMany(models.Role, { through: "Group_Role" });
        }
    };

    //ORM
    Blood_Bank.init({
        typeOfBlood: DataTypes.STRING,
        quanlity: DataTypes.INTEGER,
        expirationDate: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'Blood_Bank',
    });
    return Blood_Bank;
};