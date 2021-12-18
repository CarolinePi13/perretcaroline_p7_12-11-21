const express = require('express');
const router = require("express").Router();

const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer.config');
const auth = require('../middleware/auth');

router.post('/signup',multer, userCtrl.signup);
router.post('/login', userCtrl.login);
router.put("/:id",auth,multer,userCtrl.changeUserInfo);
router.delete('/:id',auth, userCtrl.deleteUser)
router.get('/:id',auth,multer,userCtrl.displayUser)
router.get("/",auth,multer,userCtrl.displayAllUsers)
module.exports = router;