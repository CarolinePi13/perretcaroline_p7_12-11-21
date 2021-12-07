const Post = require('../models/post');
const Vote= require('../models/vote');
const fs = require('fs');


exports.CreateAPost=(req, res, next) =>{
   try{
    if (req.file==undefined){
        Post.create({//creates the object user
        content:req.body.content,
        // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        userId:req.body.userId
           
        }).then(
            () => {
              res.status(201).json({
                message: 'Post created successfully!',
              })
            })
    }else{
        Post.create({//creates the object user
            content:req.body.content,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            userId:req.body.userId
            }).then(
                () => {
                  res.status(201).json({
                    message: 'Post created successfully!',
                  })
                })

        }
    }
    catch{(
            (error) => {
              res.status(400).json({
                error: error,
                message: 'something went wrong with the post creation'
        
              });
            }
          );
        } 
};
exports.getAllPosts=(req, res, next) =>{
    Post.findAll({order: [['updatedAt', "DESC"], ['createdAt', "DESC"]] })
    .then(posts=>{
        res.status(200).json(posts)
        
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "erreur lors de la récupération des posts"
      });
    });

    

    }


exports.ModifyAPost=(req, res, next) =>{
    // checks if the post userId is the same as current user  
    
    // if(req.body.userId==req.token.userId){
        
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
    
    // }else{
    //     res.status(401).json({message:"unauthorized request"})
    // }
};
exports.DeleteAPost=(req, res, next) =>{
    
    Post.findOne({where: {id:req.params.id}}).then((post)=>{
        if(post.userId==req.token.userId){
            
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink("images/"+ filename,()=>{
                Post.destroy({where: {id:req.params.id}})
                .then(() => res.status(200).json({ message: 'objet deleted'}))
                .catch(
                    (error) =>{
                        res.status(400).json({
                            error:error
                        });
                    });
            })
    }}).catch(
        (error) =>{
            res.status(401).json({
                error:error
            });
        }
    );
   
  
    
};

exports.votePost=(req, res, next)=>{
    Vote.create({
        userId:req.body.userId,
        postId:req.body.postId,
        vote:req.body.vote

    })
}
exports.unVotePost=(req, res, next)=>{

    Vote.destroy({
        where:{id:req.body.voteid}
    })
}