const { INTEGER } = require('sequelize');
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
            type:INTEGER,
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
    }
);
module.exports= Vote;