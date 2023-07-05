const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const AdminSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        maxlength : 50
    },
    email : {
        type : String,
        required : true,
        maxlength : 25
    },
    password : {
        type : String,
        required : true,
        set : value => bcrypt.hashSync(value,10)
    },
    profile_image : {
        type : String,
        get : images => ASSETS.getProfileURL('profileImages',images)
    }
},{
    timestamps : {createdAt : 'created_at',updatedAt : 'updated_at'}
})

const admin = mongoose.model('admins',AdminSchema)
module.exports = admin