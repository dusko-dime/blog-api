const {Sequelize} = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
   id: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
   },
    email: {
       type: Sequelize.STRING,
        allowNull: false
    },
    username: {
       type: Sequelize.STRING,
        allowNull: false
    },
    password: {
       type: Sequelize.STRING,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    }
});

module.exports = User;