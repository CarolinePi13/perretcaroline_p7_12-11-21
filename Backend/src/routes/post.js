const express = require('express');
const router = require("express").Router();
const auth = require('../middleware/auth');
const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer.config');

router.get('/', postCtrl.getAllPosts);
router.get('/:id',postCtrl.getOnePost)
router.post('/',auth.checkUser, multer, postCtrl.CreateAPost);
router.put('/:id',auth.checkUser, multer, postCtrl.ModifyAPost);
router.delete('/:id',auth.checkUser, postCtrl.DeleteAPost);
router.post('/vote-post',auth.checkUser, postCtrl.votePost);
router.delete('/vote-post/:id',auth.checkUser, postCtrl.unVotePost);
router.get('/all-votes-post/:PostId', auth.checkUser,postCtrl.getPostsVotes );
router.get('/one-vote/:id',auth.checkUser, postCtrl.getOneVote);


module.exports = router;