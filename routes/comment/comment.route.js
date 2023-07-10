const route = require('express').Router()

const auth = require('../../middelware/authapi')
const comment = require('../../controller/comment/comment.controller')

//....................... add comment by user.......................//
route.post('/create-comment',auth.authUser,comment.createComment);

//..............get all comment by user.....................//
route.get('/get-All-Comment-By-User',auth.authUser,comment.getAllCommentByUser);

//delete comment by user
route.delete("/delete-Comment-By-Id",auth.authUser, comment.deleteCommentById)

//.............get all comment by admin.......................//
route.get('/get-All-Comment-By-Admin',auth.authAdmin,comment.getAllCommentByAdmin)

//............... delete comment by admin.......................//
route.delete('/delete-Comment-By-Admin',auth.authAdmin,comment.deleteCommentByAdmin)


module.exports = route