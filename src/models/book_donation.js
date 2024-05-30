'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Book_Donation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Book_Donation.hasMany(models.User);
            // Book_Donation.belongsToMany(models.Role, { through: "Group_Role" });
        }
    };

    //ORM
    Book_Donation.init({
        userId: DataTypes.INTEGER,
        fullname: DataTypes.STRING,
        mobile: DataTypes.STRING,
        email: DataTypes.STRING,
        city: DataTypes.STRING,
        hospitalId: DataTypes.INTEGER,
        date: DataTypes.STRING,
        typeOfBlood: DataTypes.STRING,
        gender: DataTypes.STRING,
        message: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Book_Donation',
    });
    return Book_Donation;
};