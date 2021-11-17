const Sequelize = require('sequelize');

const sequelize = require('../config/config')

const Comment =sequelize.define('comment',
    {
        id:{
            type:Sequelize.INTEGER,
            allowNull:false,
            primaryKey: true,
            autoIncrement:true
        },
        content:{
            type:Sequelize.STRING(1234),
            allowNull:false
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
   
   
module.exports = Comment;