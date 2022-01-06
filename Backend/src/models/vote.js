
const Sequelize = require('sequelize');

const sequelize = require('../config/config')

const Vote= sequelize.define('postsVotes',

    {
        id:{
            type:Sequelize.INTEGER,
            allowNull:false,
            primaryKey: true,
            autoIncrement:true
        },
        vote:{
            type:Sequelize.INTEGER,
            allowNull:false
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
          postId:{
            type: Sequelize.INTEGER,
            foreignKey:true,
            onDelete:"cascade"
           },

    },{
        freezeTableName: true
    }
);
module.exports= Vote;