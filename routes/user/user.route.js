const route = require('express').Router()

const User = require('../../controller/user/user.controller')

route.post('/user-registration',User.UserRegistration)

module.exports = route