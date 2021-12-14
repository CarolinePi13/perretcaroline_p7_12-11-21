const express = require('express');
const router = require("express").Router();

const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer.config');
const {checkUser, requireAuth} = require('../middleware/auth');

router.post('/signup',multer, userCtrl.signup);
router.post('/login', userCtrl.login);
router.patch("/",checkUser,multer,userCtrl.changeUserInfo);
router.delete('/:id',checkUser, userCtrl.deleteUser)
router.get('/:id',checkUser,multer,userCtrl.displayUser)
router.get("/",checkUser,multer,userCtrl.displayAllUsers)
module.exports = router;