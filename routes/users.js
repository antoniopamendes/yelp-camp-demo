const express = require('express');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const usersController = require('../controllers/users')
const router = express.Router()

router.route('/register')
    .get(usersController.registerIndex)
    .post(catchAsync(usersController.createUser));

router.route('/login')
    .get(usersController.loginIndex)
    .post(passport.authenticate('local', {
        failureFlash: true,
        failureRedirect: '/login'
    }), usersController.login);

router.get('/logout', usersController.logout)

module.exports = router;