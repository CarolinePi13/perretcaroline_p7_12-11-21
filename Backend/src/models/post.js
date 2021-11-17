const Sequelize = require('sequelize');

const sequelize = require('../config/config')

const Post =sequelize.define('post',
    {
        id:{
            type:Sequelize.INTEGER,
            allowNull:false,
            primaryKey: true,
            autoIncrement:true
        },
        content:{
            type:Sequelize.STRING(1234),
            allowNull:true
        },
        image_url:{
            type:Sequelize.STRING(400),
            allowNull:true
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

    module.exports= Post;