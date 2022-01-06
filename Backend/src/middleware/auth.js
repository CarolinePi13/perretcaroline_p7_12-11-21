const jwt = require('jsonwebtoken');
const User= require('../models/user');
require('dotenv').config()

module.exports= (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (token) {
    jwt.verify(token, process.env.TOKEN_KEY, async (err, decodedToken) => {
      if (err) {
        res.user = null;
        
        next();
      } else {
        let user = await   User.findOne({where: {id:decodedToken.userId}})
        res.user = user;
        
        next();
      }
    });
  } else {
    res.user = null;
  
    next();
  }
};

