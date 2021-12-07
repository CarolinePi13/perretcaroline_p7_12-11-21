const express = require('express');
const router = require("express").Router();
const auth = require('../middleware/auth');
const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer.config');

router.get('/', postCtrl.getAllPosts);
router.post('/',auth, multer, postCtrl.CreateAPost);
router.put('/:id',auth, multer, postCtrl.ModifyAPost);
router.delete('/:id',auth, postCtrl.DeleteAPost);
router.patch('/vote-post/:id', postCtrl.votePost);
router.patch('/unVote-post/:id', postCtrl.unVotePost);

module.exports = router;