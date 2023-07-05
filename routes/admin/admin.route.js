const route = require('express').Router()

const {uploadImage} = require('../../middelware/uploadfile');

const admin = require('../../controller/admin/admin.controller');

 route.post('/admin-SignUp',uploadImage('profileImage','profile_image'),admin.adminSignUp);

 route.get('/get-All-Admin',admin.getAllAdmin);

 route.get('/get-Admin-By-Id',admin.getAdminById)

 route.patch('/updateAdminProfile',admin.updateAdminProfile)

module.exports = route
