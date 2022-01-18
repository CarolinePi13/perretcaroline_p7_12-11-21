const bcrypt =require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const cryptojs = require('crypto-js');
var passwordValidator = require('password-validator');
require('dotenv').config()

//creates a Super User

let createSuperUser=()=>{
   let superUserPass= process.env.superPassword
   const cryptoEmail= cryptojs.SHA256(process.env.superEmail, "SUPERSECRET").toString();
   console.log(cryptoEmail);

    bcrypt.hash(superUserPass, 10).then(
        (hash)=>{
             User.create({//creates the object user

                userName:process.env.superUserName,
                jobTitle:"DRH",
                email:cryptoEmail,
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
    const cryptoEmail= cryptojs.SHA256(req.body.email, process.env.CRYPT_KEY).toString();
    console.log(cryptoEmail);
    bcrypt.hash(req.body.password, 10).then(
        (hash)=>{
            if (req.file==undefined){
                User.create({//creates the object user
                    userName:req.body.userName,
                    email: cryptoEmail,
                    password: hash,
                    jobTitle:req.body.jobTitle,
                    // avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                   
                }).then(//saves thar object in the db
                    ()=>{
                        res.status(201).json({
                            message: 'User added successfully!',
                        });
                    }
                ).catch(
                    error => {
                    res.status(400).json({
                        message:"cet email correspond a un compte deja existant"
                    });
                })
            }else{
                User.create({//creates the object user
                    userName:req.body.userName,
                    email: cryptoEmail,
                    password: hash,
                    jobTitle:req.body.jobTitle,
                    avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            }).then(//saves thar object in the db
                ()=>{
                    res.status(201).json({
                        message: 'User added successfully!',
                    });
                }
            ).catch(
                error => {
                res.status(400).json({
                    message:"Cet email correspond a un compte deja existant"
                });
            })
         
        }})
        }else{//the password does not match the password schema
    return res.status(400).json({
      message:'Le mot de passe doit contenir au moins une majuscule, une minuscule, et un chiffre, il doit faire entre 8 et 20 caracteres'})}
  
    
};

exports.login= (req, res, next) =>{
    const cryptoEmail= cryptojs.SHA256(req.body.email, process.env.CRYPT_KEY).toString();
   
    User.findOne({where :{ email: cryptoEmail}}).then(
      
        (user) => {
       
            if(!user){// the email does not match a registered email in the db
              return res.status(401).json({
                message:"Utilisateur inconnu, verifiez votre adresse e-mail"
                
            })};
                bcrypt.compare(req.body.password, user.password).then(
                (valid)=>{
                    if (!valid){// the password is incorrect
                        
                      return res.status(401).send({
                          message:"Le mot de passe est incorrect"
                      })};
                        
                    
                const token = jwt.sign({userId :user.id,isAdmin:user.isAdmin}, process.env.TOKEN_KEY,{expiresIn:'24h'});// a random token is created
                   res.status(200).json({
                       userId : user.id,
                       token:token,
                       isAdmin:user.isAdmin
                       
                   });
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
exports.changeUserInfo= (req, res, next) =>{
    
    User.findOne({where :{ id: req.params.id}}).then((user)=>{

        if((user.id==res.user.id)||(res.user.isAdmin)){
        
            const UserObject = req.file? //if the request contains a file
            {
                ...req.body,
                avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            }:{...req.body};// if not sends it as an object
        
               User.update({...UserObject},{
                  where:{ id: req.params.id}
               })      .then(()=> res.status(200).json({ message: "Object modified !"}))
               .catch(
                (error) =>{
                    res.status(400).json({
                        error:error
                    });
                }
            );
       
             
            }else{
            res.status(401).json({message:"unauthorized request"})
            }
    }).catch(()=>{
        res.status(404).json({
            message:"could not find user"
        })
    })
 
  
};
exports.deleteUser= (req, res, next) =>{
    console.log(req.params.id);
    if((req.params.id==res.user.id)||(res.user.isAdmin)){
        User.findOne({where: {id:req.params.id}}).then(user=>{
            if (user.avatar!== "account_avatar_face_man_people_profile_user_icon_123197.png"){
                const filename = post.imageUrl.split('/images/')[1];
                fs.unlink("images/"+ filename,()=>{
                    User.destroy({where: {id:req.params.id}})
                    .then(() => res.status(200).json({ message: 'objet deleted'}))
                    .catch(
                        (error) =>{
                            res.status(400).json({
                                error:error
                            });
                        });
                })
    
            }
            else{
                User.destroy({where: {id:req.params.id}})
                .then(() => res.status(200).json({ message: 'user deleted'}))
                .catch(
                    (error) =>{
                        res.status(400).json({
                            error:error
                        });
                    });
                }
        })}
        else{
            res.status(401).json({message:"unauthorized request"})
        }
}
exports.displayUser=(req,res,next) =>{
    
    User.findOne({where: {id:req.params.id}}).then(
        (user)=> {
            if (!user) {
                return res.status(404).send(new Error('user not found!'));
            }
            else if(res.user){
                res.status(200).json({user}); 
            }
            else{
                res.status(401).json({
                    error:error
                });
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
User.findAll().then((users)=>{
    
    if (!users) {
        return res.status(404).send(new Error('users not found!'));
    }else{
      res.status(200).json({users}); 
    }
})   .catch(
    (error) =>{
        res.status(400).json({
            error:error
        });
    });
}