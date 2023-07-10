const route = require('express').Router()

const User = require('../../controller/user/user.controller');
const auth= require('../../middelware/authapi');

//..................user registration................
route.post('/user-registration', User.UserRegistration);

//..............get all user profile....................
route.get('/get-All-User-Profile', User.getAllUserProfile);

//...............get user profile by id................
route.get('/get-User-Profile', User.getUserProfile);

//................update user profile...................
route.patch('/update-User-Profile', User.updateUserProfile)

//...............delete user by id........................
route.delete('/delete-User-By-Id', User.deleteUserById)

//...............get user with post......................
route.get('/get-User-With-Post',auth.authUser,User.getUserWithPost)

module.exports = route