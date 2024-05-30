'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Donor_Infor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Donor_Infor.hasMany(models.User);
            // Donor_Infor.belongsToMany(models.Role, { through: "Group_Role" });
        }
    };

    //ORM
    Donor_Infor.init({
        fullname: DataTypes.STRING,
        mobile: DataTypes.STRING,
        email: DataTypes.STRING,
        city: DataTypes.STRING,
        hospitalId: DataTypes.INTEGER,
        date: DataTypes.STRING,
        typeOfBlood: DataTypes.STRING,
        gender: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Donor_Infor',
    });
    return Donor_Infor;
};