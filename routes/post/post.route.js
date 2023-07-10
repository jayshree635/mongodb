const route = require('express').Router()
const auth = require('../../middelware/authapi')

const postData = require('../../controller/post/post.controller')
//.............create post................
route.post('/create-Post', auth.authUser, postData.createPost)

//............get all post by user............
route.get('/get-All-Post-By-User', auth.authUser, postData.getAllPostByUser)

//.............get Product by post id .....................
route.get('/get-Product-By-Post-Id', auth.authUser, postData.getProductByPostId)

//........... ...update post by id ................
route.patch('/update-Post-By-Id', auth.authUser, postData.updatePostById)

//...............delete post by id ...................
route.delete('/delete-Post-By-Id', auth.authUser, postData.deletePostById)

module.exports = route
