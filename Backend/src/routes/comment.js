const express = require('express');
const router = require("express").Router();
const auth = require('../middleware/auth');
const commCtrl = require('../controllers/comment');


router.get('/posts/:postId',auth, commCtrl.getAllComms);
router.get('/:id',auth, commCtrl.getOneComm);
router.post('/',auth, commCtrl.CreateAComm);
router.put('/:id',auth, commCtrl.ModifyAComm);
router.delete('/:id',auth, commCtrl.DeleteAComm);

module.exports = router;