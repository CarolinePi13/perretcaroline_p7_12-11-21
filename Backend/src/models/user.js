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
        userName:{
            type:Sequelize.STRING,
            allowNull:false
        },
        email:{
            type:Sequelize.STRING,
            allowNull:false,
            unique:true,
            contains:"@grouponamia.fr"
        },
        jobTitle:{
            type:Sequelize.STRING,
            allowNull:true,
           
        },
        password:{
            type:Sequelize.STRING,
            allowNull:false,
        },
        avatar:{
            type:Sequelize.STRING, 
            
            // defaultValue:"account_avatar_face_man_people_profile_user_icon_123197.png",
              
            defaultValue:"http://localhost:3000/images/account_avatar_face_man_people_profile_user_icon_123197.png",
            allowNull:true
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
//  User.sync({force:true})  
   
module.exports = User;