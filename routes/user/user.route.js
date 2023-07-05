const route = require('express').Router()

const User = require('../../controller/user/user.controller');

route.post('/user-registration',User.UserRegistration);

route.get('/get-All-User-Profile',User.getAllUserProfile);

route.get('/get-User-Profile',User.getUserProfile);

route.patch('/updateUserProfile',User.updateUserProfile)

module.exports = route