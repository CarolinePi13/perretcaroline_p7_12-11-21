const express = require('express');
const router = require("express").Router();
const auth = require('../middleware/auth');
const commCtrl = require('../controllers/comment');
const multer = require('../middleware/multer.config');

router.get('/', commCtrl.getAllComms);
router.get('/:id', commCtrl.getOneComm);
router.post('/',auth, commCtrl.CreateAComm);
router.put('/:id',auth, commCtrl.ModifyAComm);
router.delete('/:id',auth, commCtrl.DeleteAComm);

module.exports = router;