const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer');

router.get('/',auth, postCtrl.getAllPosts);
router.get('/:id',auth, postCtrl.getOnePOst);
router.post('/',auth, multer, postCtrl.CreateAPost);
router.put('/:id',auth, multer, postCtrl.ModifyAPost);
router.delete('/:id',auth, postCtrl.DeleteAPost);

module.exports = router;