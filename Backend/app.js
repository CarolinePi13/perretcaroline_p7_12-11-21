
const express = require('express');
require('dotenv').config();

const helmet = require("helmet");
const app = express();
const path =require('path');

const cors= require('cors')
//routes and models

const postRoutes = require('./src/routes/post');
const userRoutes = require('./src/routes/user');
const commRoutes = require('./src/routes/comment');
const sequelize = require('./src/config/config');
const comment= require('./src/models/comment');
const post= require('./src/models/post');
const user= require('./src/models/user');
const vote= require('./src/models/vote');



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

user.hasMany(post,{

  onDelete: 'CASCADE'
});
post.hasMany(comment,{

  onDelete: 'CASCADE'
});
user.hasMany(comment,{

  onDelete: 'CASCADE'
});
post.hasMany(vote,{

  onDelete: 'CASCADE'
})
user.hasMany(vote,{

  onDelete: 'CASCADE'
});

// use below code with 'force=true'to reintianlize the db
// ----------------------------------------

// sequelize.sync().then(()=>{
//   console.log('this works');
// }).catch((err)=>{
//   console.log(err)
// });
// -------------------------------------------

app.use('/api/user', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commRoutes)
// app.use("api/post/:id/vote")
// app.use("api/comment/:id")
app.use('/images',express.static(path.join(__dirname, 'src/images')) );
app.use(express.static('images'));

module.exports = app;