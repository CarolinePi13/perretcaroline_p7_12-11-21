const bcrypt =require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
var passwordValidator = require('password-validator');
require('dotenv').config()


//establishes  a set schema for the password

var passwordSchema = new passwordValidator();
passwordSchema
.is().min(8)                                    // Minimum length 8
.is().max(20)                                  // Maximum length 20
.has().uppercase(1)                              // Must have uppercase letters
.has().lowercase(1)                              // Must have lowercase letters
.has().digits(1)                                // Must have at least 1 digit
.has().not().spaces()                           // Should not have spaces


exports.signup= (req, res, next) =>{
  if (passwordSchema.validate(req.body.password)){// checks for the password validity
    bcrypt.hash(req.body.password, 10).then(
        (hash)=>{
             User.create({//creates the object user
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email: req.body.email,
                password: hash,
                
            })
        }).then(//saves thar object in the db
                ()=>{
                    res.status(201).json({
                        message: 'User added successfully!'
                    });
                }
            ).catch(
                error => {// the email is not valid
                res.status(401).json({
                    error:error,
                    message: 'This email adress is already used for an account'
                });
            })
        }else{//the password does not match the password schema
    return res.status(400).json({
      message:'le mot de passe doit contenir au moins une majuscule, une minuscule, et un chiffre, il doit faire entre 8 et 20 caracteres'})}
  
    
};

exports.login= (req, res, next) =>{
    User.findOne({where :{ email: req.body.email}}).then(
      
        (user) => {
       
            if(!user){// the email does not match a registered email in the db
              return res.status(401).json({
                message:"user unknown"
                
            })};

              
              bcrypt.compare(req.body.password, user.password).then(
                (valid)=>{
                    if (!valid){// the password is incorrect
                        
                      return res.status(401).json({
                          message:"the password is incorrect"
                      })};
                        
                    
                const token = jwt.sign({userId :user._id}, process.env.TOKEN_KEY,{expiresIn:'24h'});// a random token is created
                   res.status(200).json({
                       userId : user._id,
                       token:token
                   })
                }
            ).catch(
                (error)=>{
                    res.status(500).json({
                        error:error
                    });
                }
            );
            
            
        }
    ).catch(
        (error)=>{
            res.status(500).json({
                error:error
            });
        }
    );
}