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
 
    if(res.user){
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

    
    }else{
        res.status(401).json({message:"unauthorized request"})
    }
};

exports.getAllThisUserPosts=(req, res, next) =>{
    if(res.user){
        Post.findAll({where:{userId:req.params.id}},{order: [['updatedAt', "DESC"], ['createdAt', "DESC"]] })
        .then(posts=>{
            res.status(200).json(posts)
            
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "erreur lors de la récupération des posts"
          });
        });
    
        
        }else{
            res.status(401).json({message:"unauthorized request"})
        }
}
    

exports.ModifyAPost=(req, res, next) =>{
    // checks if the post userId is the same as current user  
    
    Post.findOne({where: {id:req.params.id}}).then((post)=>{
       
        if((post.userId == res.user.id)||(res.user.isAdmin)){
        
        const PostObject = req.file? //if the request contains a file
        {
            ...req.body,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }:{...req.body};// if not sends it as an object
    
           Post.update({...PostObject},{
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
        
    })
     
};

exports.DeleteAPost=(req, res, next) =>{

    Post.findOne({where: {id:req.params.id}}).then((post)=>{
       if ((post.userId == res.user.id)||(res.user.isAdmin)){
          
            if (post.imageUrl!== null){
                const filename = post.imageUrl.split('/images/')[1];
                console.log('this is the filename: ');
                console.log(filename);
                fs.unlink("src/images/"+ filename,()=>{
                    Post.destroy({where: {id:req.params.id}})
                    .then(() => res.status(200).json({ message: 'objet deleted'}))
                    .catch(
                        (error) =>{
                            res.status(400).json({
                                error:error
                            });
                        });
                })

            }else{
                Post.destroy({where: {id:req.params.id}})
                    .then(() => res.status(200).json({ message: 'objet deleted'}))
                    .catch(
                        (error) =>{
                            res.status(400).json({
                                error:error
                            });
                        });
            }
            
    }else{
        res.status(401).json({message:"unauthorized request"})
    }}).catch(
        (error) =>{
            res.status(401).json({
                error:error
            });
        }
    );
 
};

exports.votePost=(req, res, next)=>{
    Vote.findOne({where:{postId:req.body.postId,userId:req.body.userId}})
    .then((vote)=>{
        if (vote){
            
        }else{
            Vote.create({
                userId:req.body.userId,
                postId:req.body.postId,
                vote:req.body.vote
        
            }).then(()=>{
                res.status(201).json({message:"vote registred"})
            })
        }
    }).catch(()=>{
        res.status(401).json({message:"already voted!"})
    })
    
};

exports.unVotePost=(req, res, next)=>{
    
        Vote.destroy({where:{postId:req.params.id, userId:res.user.id
        }}).then(()=>{
            res.status(200).json({message:"unvoted"})
        }).catch(
            (error) =>{
                res.status(404).json({
                    error:error
                });
            }
        );
 
};

exports.getPostsVotes=(req, res, next)=>{
    Vote.findAll({where:{postId:req.params.PostId}}).then((votes)=>{
    res.status(200).json(votes)
}).catch(
    (error) =>{
        res.status(404).json({
            error:error
        });
    }
);
};

exports.getOneVote=(req,res,next)=>{
    console.log(req.params.id);
    Vote.findOne({where:{postId:req.params.id, userId:res.user.id
    }}).then((vote)=>{
        res.status(200).json(vote)
    }).catch(
        (error) =>{
            res.status(404).json({
                error:error
            });
        }
    );
};