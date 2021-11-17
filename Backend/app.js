const { Sequelize } = require('sequelize');
const express = require('express');
require('dotenv').config()
const helmet = require("helmet");
const app = express();
const path =require('path');
const fs =require('fs');
//routes and models

const postRoutes = require('./src/routes/post');
const userRoutes = require('./src/routes/user');
const sequelize = require('./src/config/config')
const comment= require('./src/models/comment')
const post= require('./src/models/post')
const user= require('./src/models/user')
// connection to database//


app.use(helmet())
app.use(express.json());

user.hasMany(post);
post.hasMany(comment);
user.hasMany(comment);

// sequelize.sync({force:true}).then(()=>{
//   console.log('this works');
// }).catch((err)=>{
//   console.log(err)
// });
app.use('/api', userRoutes);
app.use('/api/post', postRoutes)
module.exports = app;