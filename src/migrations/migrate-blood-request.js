'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Blood_Request', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            // hospitalName: DataTypes.STRING,
            // doctorID: DataTypes.INTEGER,
            // mobile: DataTypes.STRING,
            // typeOfBlood: DataTypes.STRING,
            // quanlity: DataTypes.INTEGER
            hospitalName: {
                type: Sequelize.STRING
            },
            doctorID: {
                type: Sequelize.INTEGER
            },
            mobile: {
                type: Sequelize.STRING
            },
            typeOfBlood: {
                type: Sequelize.STRING
            },
            quanlity: {
                type: Sequelize.INTEGER
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Blood_Request');
    }
};