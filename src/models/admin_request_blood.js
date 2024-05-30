'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Admin_Request_Blood extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Admin_Request_Blood.hasMany(models.User);
            // Admin_Request_Blood.belongsToMany(models.Role, { through: "Group_Role" });
        }
    };

    //ORM
    Admin_Request_Blood.init({
        fullname: DataTypes.STRING,
        mobile: DataTypes.STRING,
        email: DataTypes.STRING,
        city: DataTypes.STRING,
        date: DataTypes.STRING,
        typeOfBlood: DataTypes.STRING,
        gender: DataTypes.STRING,
        messageFromAdmin: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Admin_Request_Blood',
    });
    return Admin_Request_Blood;
};