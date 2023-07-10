const route = require('express').Router()

const { uploadImage } = require('../../middelware/uploadfile');
const auth = require('../../middelware/authapi')

const admin = require('../../controller/admin/admin.controller');

//..................admin signup .........................
route.post('/admin-SignUp', uploadImage('profileImage', 'profile_image'), admin.adminSignUp);

//......................get all admin...................
route.get('/get-All-Admin', auth.authAdmin, admin.getAllAdmin);

//..................... get admin by id....................
route.get('/get-Admin-By-Id', auth.authAdmin, admin.getAdminById)

//....................update admin profile by admin id.........................
route.patch('/update-Admin-Profile', auth.authAdmin, admin.updateAdminProfile)

//......................delete admin by id...........................
route.delete('/delete-Admin-By-Id', auth.authAdmin, admin.deleteAdminById)

module.exports = route
