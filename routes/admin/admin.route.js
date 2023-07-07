const route = require('express').Router()

const {uploadImage} = require('../../middelware/uploadfile');
const auth = require('../../middelware/authapi')

const admin = require('../../controller/admin/admin.controller');

 route.post('/admin-SignUp',uploadImage('profileImage','profile_image'),admin.adminSignUp);

 route.get('/get-All-Admin',auth.authAdmin,admin.getAllAdmin);

 route.get('/get-Admin-By-Id',auth.authAdmin,admin.getAdminById)

 route.patch('/update-Admin-Profile',admin.updateAdminProfile)

 route.delete('/delete-Admin-By-Id',admin.deleteAdminById)

module.exports = route
