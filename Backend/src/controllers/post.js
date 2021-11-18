const Post = require('../models/post');

exports.CreateAPost=(req, res, next) =>{
    const post = Post.create({
        content:req.body.content,
        imageUrl:req.body.imageUrl,
        userId:req.body.userId
    }).then(()=>res.status(200).json({message:'success!'}))
    
};
exports.getAllPosts=(req, res, next) =>{
    Post.findAll().then ((posts)=>res.status(200).json(posts))
};
exports.getOnePOst=(req, res, next) =>{
    Post.findOne({
       where: {id:req.params.id}
    }).then(
        (post) =>{
            res.status(200).json(post);
        }).catch(
            (error)=>{
                res.status(404).json({
                    error:error
                })
            }
        );
};
exports.ModifyAPost=(req, res, next) =>{
    //checks if the sauce userId is the same as current user  
    
    if(req.body.userId==req.token.userId){

        const PostObject = req.file? // if the requests contains a file parses the body of the request
        {
            ...JSON.parse(req.body.post),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }:{...req.body};// if not sends it as an object
    
           Post.update({
              where:{ _id: req.params.id}
           }, {...PostObject, _id:req.params.id})//passes either one whether it contains a file or not
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

};