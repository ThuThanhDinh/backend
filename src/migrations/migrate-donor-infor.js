'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Donor_Infor', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },


            userId: {
                type: Sequelize.INTEGER
            },
            fullname: {
                type: Sequelize.STRING
            },
            mobile: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            city: {
                type: Sequelize.STRING
            },
            hospitalId: {
                type: Sequelize.INTEGER
            },
            date: {
                type: Sequelize.STRING
            },
            typeOfBlood: {
                type: Sequelize.STRING
            },
            gender: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('Donor_Infor');
    }
};