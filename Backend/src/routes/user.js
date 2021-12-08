const express = require('express');
const router = require("express").Router();

const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer.config');
const {checkUser, requireAuth} = require('../middleware/auth');

router.post('/signup',multer, userCtrl.signup);
router.post('/login', userCtrl.login);
router.put("/",multer,userCtrl.changeUserInfo);
router.delete('/:id', userCtrl.deleteUser)
router.get('/:id',multer,userCtrl.displayUser)
module.exports = router;