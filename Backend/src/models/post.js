
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
        imageUrl:{
            type:Sequelize.STRING(400),
            allowNull:true
        },
        createdAt: {
            type: Sequelize.DATE
          },
          updatedAt: {
            type: Sequelize.DATE
          },
       userId:{
        type: Sequelize.INTEGER,
        foreignKey:true,
        onDelete:"cascade"
       },
    },{
        freezeTableName: true
    });
    
    module.exports= Post;