const jwt = require('jsonwebtoken');
const User= require('../models/user');
require('dotenv').config()
// module.exports = (req, res, next) => {
//   try {
    
//     const token = req.headers.authorization.split(' ')[1];
    

//     req.token = jwt.verify(token, process.env.TOKEN_KEY);
    
//     const userId = req.token.userId;
  
//   console.log(req.body);
    
//     if (!req.body.userId && req.body.userId !== userId ) {
//       res.status(403).json({message : 'Invalid UserId'})
//     } else {
//       next();
//     }
//   } catch {
//     res.status(401).json({
//       error: new Error('Invalid request!')
//     });
//   }
// };

module.exports.checkUser = (req, res, next) => {
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

module.exports.requireAuth = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.send(200).json('no token')
      } else {
        console.log(decodedToken.userId);
        next();
      }
    });
  } else {
    console.log('No token');
  }
};
