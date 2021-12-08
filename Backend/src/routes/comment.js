const express = require('express');
const router = require("express").Router();
const auth = require('../middleware/auth');
const commCtrl = require('../controllers/comment');
const multer = require('../middleware/multer.config');

router.get('/posts/:postId',auth.checkUser, commCtrl.getAllComms);
router.get('/:id',auth.checkUser, commCtrl.getOneComm);
router.post('/',auth.checkUser, commCtrl.CreateAComm);
router.put('/:id',auth.checkUser, commCtrl.ModifyAComm);
router.delete('/:id',auth.checkUser, commCtrl.DeleteAComm);

module.exports = router;