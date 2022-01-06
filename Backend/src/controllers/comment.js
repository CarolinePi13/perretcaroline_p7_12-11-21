
const Comment = require('../models/comment');



exports.getAllComms=(req,res,next)=>{
    
    Comment.findAll({
        where:{
        postId: req.params.postId
    }})
    .then ((comments)=>res.status(200).json(comments))
    .catch(
        (error)=>{
            res.status(404).json({
                error:error
            })
        }
    );
};

exports.getOneComm=(req,res,next)=>{
    Comment.findOne({
        where:{id:req.params.id}
    })
    .then ((response)=>{
        
        if(response==null){
            
                res.status(500).json(
                {
                    message:"the commentId does not exist"
                }
                )
            }else{
             
                    res.status(200).json(response)
            }
    }).catch((error)=>{
        res.status(404).json({
            error:error
        })
    });
    

}
exports.CreateAComm=(req,res,next)=>{
    
    Comment.create({
        content: req.body.content,
        postId:req.body.postId,
        userId:req.body.userId
    }).then (comment=>{
        
        res.status(201).json(comment)
    })
        .catch(err => {
            res.status(500).send({
              message:
                err.message || "Une erreur s'est produite lors de la création du commentaire "
            });
        });
};
    

 
exports.ModifyAComm=(req,res,next)=>{
   //modifier un commentaire
   console.log(req.body.content);
  Comment.findOne({where:{id:req.params.id}}).then((comment)=>{
   if ((comment.userId == res.user.id)||(res.user.isAdmin)){// checks if userid is the same as the user who created the comment or is admin
        if(comment==null){
            {
                res.status(500).json({
                    message:"the commentId does not exist"
                })
            }}else{
               
                Comment.update({content:req.body.content},{
                    where:{ id: req.params.id}
                 })
                
                .then(()=> res.status(200).json({ message: "Object modified !"}))
                .catch(
                 (error) =>{
                     res.status(400).json({
                         error:error
                     });
                 })


            }
        
    }}).catch((error)=>{
        res.status(401).json({
           error:error, 
            message:"unauthorized request"})
    })
 };

    
exports.DeleteAComm=(req,res,next)=>{
   
    
        Comment.findOne({where: {id:req.params.id}}).then((comm)=>{
            if
            ((comm.userId == res.user.id)||(res.user.isAdmin)){
                Comment.destroy({where: {id:req.params.id}})
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
            

        }).catch(()=>{
            res.status(400).json({
                error:error
            });
        })
    
    };
      

