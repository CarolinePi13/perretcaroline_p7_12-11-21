const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

router.get('/', postCtrl.getAllPosts);
router.get('/:id', postCtrl.getOnePOst);
router.post('/', postCtrl.CreateAPost);
router.put('/:id', postCtrl.ModifyAPost);
router.delete('/:id', postCtrl.DeleteAPost);

module.exports = router;