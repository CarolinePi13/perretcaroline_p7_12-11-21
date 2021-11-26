const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer.config');

router.post('/signup', multer, userCtrl.signup);
router.post('/login', userCtrl.login);
router.patch("/",multer,userCtrl.changeAvatar);

module.exports = router;