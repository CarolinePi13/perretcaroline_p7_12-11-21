const express = require('express');
const router = require("express").Router();
const auth = require('../middleware/auth')
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer.config');

router.post('/signup',multer, userCtrl.signup);
router.post('/login', userCtrl.login);
router.put("/",auth,multer,userCtrl.changeUserInfo);
router.delete('/:id',auth, userCtrl.deleteUser)
router.get('/:id',multer,userCtrl.displayUser)
module.exports = router;