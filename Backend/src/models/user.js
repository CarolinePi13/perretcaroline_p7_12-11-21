const Sequelize = require('sequelize');

const sequelize = require('../config/config')

const User =sequelize.define('user',
    {
        id:{
            type:Sequelize.INTEGER,
            allowNull:false,
            primaryKey: true,
            autoIncrement:true
        },
        firstName:{
            type:Sequelize.STRING,
            allowNull:false
        },
        lastName:{
            type:Sequelize.STRING,
            allowNull:false
        },
        email:{
            type:Sequelize.STRING,
            allowNull:false,
            unique:true
        },
        password:{
            type:Sequelize.STRING,
            allowNull:false,
        },
        isAdmin:{
            type:Sequelize.BOOLEAN,
            defaultValue:false,
        },
        createdAt: {
            type: Sequelize.DATE
          },
          updatedAt: {
            type: Sequelize.DATE
          },

    },{
        freezeTableName: true
    });
   
   
module.exports = User;