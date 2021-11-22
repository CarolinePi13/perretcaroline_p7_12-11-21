const Post = require('../models/post');
const fs = require('fs');

exports.CreateAPost=(req, res, next) =>{


   Post.create({
        content:req.body.content,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        userId:req.userId
    })
    .then(
        () => 
          res.status(201).json({
            message: 'Post created successfully!',
          }))
    .catch(
            (error) => {
              res.status(400).json({
                error: error,
                message: 'something went wrong with the post creation'
        
              });
            }
          );
        
};
exports.getAllPosts=(req, res, next) =>{
    Post.findAll()
        .then ((posts)=>res.status(200).json(posts))
        .catch(
            (error)=>{
                res.status(404).json({
                    error:error
                })
            }
        );
    };
exports.getOnePost=(req, res, next) =>{
    Post.findOne({
       where: {id:req.params.id}
    })
        .then(
            (post) =>{
                res.status(200).json(post);
            })
        .catch(
            (error)=>{
                res.status(404).json({
                    error:error
                })
            }
        );
};
exports.ModifyAPost=(req, res, next) =>{
    // checks if the post userId is the same as current user  
    
    if(req.body.userId==req.token.userId){
        
        const PostObject = req.file? // if the requests contains a file parses the body of the request
        {
            ...req.body,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }:{...req.body};// if not sends it as an object
    
           Post.update({...PostObject},{
              where:{ id: req.params.id}
           })//passes either one whether it contains a file or not
           .then(()=> res.status(200).json({ message: "Object modified !"}))
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
};
exports.DeleteAPost=(req, res, next) =>{
    if(req.body.userId==req.token.userId){
    Post.destroy({where: {id:req.params.id}})
    .then(() => res.status(200).json({ message: 'objet deleted'}))
    .catch(
        (error) =>{
            res.status(400).json({
                error:error
            });
        });
    }else{
        res.status(401).json({message:"unauthorized request"})
    }
    
    
};