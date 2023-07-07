const route = require('express').Router()

const auth = require('../../middelware/authapi')
const comment = require('../../controller/comment/comment.controller')

route.post('/create-comment',auth.authUser,comment.createComment)

module.exports = route