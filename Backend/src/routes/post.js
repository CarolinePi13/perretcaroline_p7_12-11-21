const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer.config');

router.get('/',auth, postCtrl.getAllPosts);
router.get('/:id',auth, postCtrl.getOnePost);
router.post('/',multer, postCtrl.CreateAPost);
router.put('/:id',multer, postCtrl.ModifyAPost);
router.delete('/:id',auth, postCtrl.DeleteAPost);
router.patch('/vote-post/:id', postCtrl.votePost);
router.patch('/unVote-post/:id', postCtrl.unVotePost);

module.exports = router;