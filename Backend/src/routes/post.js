const express = require('express');
const router = require("express").Router();
const auth = require('../middleware/auth');
const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer.config');

router.get('/',auth, postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getAllThisUserPosts)
router.post('/',auth, multer, postCtrl.CreateAPost);
router.put('/:id',auth, multer, postCtrl.ModifyAPost);
router.delete('/:id',auth, postCtrl.DeleteAPost);
router.post('/vote-post',auth, postCtrl.votePost);
router.delete('/vote-post/:id',auth, postCtrl.unVotePost);
router.get('/all-votes-post/:PostId', auth,postCtrl.getPostsVotes );
router.get('/one-vote/:id',auth, postCtrl.getOneVote);


module.exports = router;