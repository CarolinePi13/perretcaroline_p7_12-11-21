const bcrypt =require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
var passwordValidator = require('password-validator');
require('dotenv').config()


let createSuperUser=()=>{
   let superUserPass= process.env.superPassword

    bcrypt.hash(superUserPass, 10).then(
        (hash)=>{
             User.create({//creates the object user

                userName:process.env.superUserName,
                jobTitle:"DRH",
                email: process.env.superEmail,
                password: hash,
                isAdmin:true

                
            })
        }).catch(
            error => {
                // the email is not valid
            res.status(401).json({
                error:error,
                
            });
        })
}
// createSuperUser();
//  -- uncomment to create superUsers

// establishes  a set schema for the password

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
            if (req.file==undefined){
                User.create({//creates the object user
                    userName:req.body.userName,
                    email: req.body.email,
                    password: hash,
                    jobTitle:req.body.jobTitle,
                    // avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                   
                })
            }else{
                User.create({//creates the object user
                    userName:req.body.userName,
                    email: req.body.email,
                    password: hash,
                    jobTitle:req.body.jobTitle,
                    avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            })
         
        }}).then(//saves thar object in the db
                ()=>{
                    res.status(201).json({
                        message: 'User added successfully!',
                    });
                }
            ).catch(
                error => {
                res.status(400).json({
                    error:error
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
                        
                      return res.status(401).send({
                          message:"the password is incorrect"
                      })};
                        
                    
                const token = jwt.sign({userId :user.id,isAdmin:user.isAdmin}, process.env.TOKEN_KEY,{expiresIn:'24h'});// a random token is created
                   res.status(200).json({
                       userId : user.id,
                       token:token,
                       isAdmin:user.isAdmin
                       
                   }).catch(
                    (error)=>{
                        res.status(500).json({
                            error:error
                        });
                    }
                );
                }
            )
            
            
        }
    ).catch(
        (error)=>{
            res.status(500).json({
                error:error
            });
        }
    );
}
exports.changeUserInfo= (req, res, next) =>{
    
    User.findOne({where :{ userId: req.params.id}}).then(()=>{

       const avatarUpdate= {avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`};
        User.update(avatarUpdate
       ,{where :{ userId: req.params.id}}
          
       ).then(()=>{
           res.status(200).json({
               message:"avatar changed"
           })  
        }).catch((error=>{
            res.status(404).json({
                error:error,
                message:"update failed"
            })
        }))
    }).catch(()=>{
res.status(404).json({
    message:"could not find user"
})
    })
 
  
};
exports.deleteUser= (req, res, next) =>{
    console.log(req.params.id);
    if(req.params.id==res.user.id){
        User.destroy({where: {id:req.params.id}})
        .then(() => res.status(200).json({ message: 'user deleted'}))
        .catch(
            (error) =>{
                res.status(400).json({
                    error:error
                });
            });
        }else{
            res.status(401).json({message:"unauthorized request"})
        }
}
exports.displayUser=(req,res,next) =>{
    
    User.findOne({where: {id:req.params.id}}).then(
        (user)=> {
            if (!user) {
                return res.status(404).send(new Error('user not found!'));
            }
             else if(
                 user.avatar=="account_avatar_face_man_people_profile_user_icon_123197.png"){
                  user.avatar = req.protocol + '://' + req.get('host') + '/images/' + user.avatar;
                  res.status(200).json({user}); 
              }else{
                res.status(200).json({user}); 
              }
             
        }) 
        .catch(
            (error) =>{
                res.status(400).json({
                    error:error
                });
            });
          
    }
   
exports.displayAllUsers=(req, res, next)=>{
User.findAll.then((users)=>{
    if (!users) {
        return res.status(404).send(new Error('users not found!'));
    }else if(users.avatar=="account_avatar_face_man_people_profile_user_icon_123197.png"){
        users.avatar = req.protocol + '://' + req.get('host') + '/images/' + user.avatar;
        res.status(200).json({user}); 
    }else{
      res.status(200).json({user}); 
    }
})   .catch(
    (error) =>{
        res.status(400).json({
            error:error
        });
    });
}