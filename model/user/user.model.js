const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    userName : {
        type : String,
        required : true,
        maxlenght : 50
    },
    email : {
        type : String,
        required : true,
        maxlenght : 50
    },
    password : {
        type : String,
        required : true,
        maxlenght : 10,
        set : value => bcrypt.hashSync(value,10)
    },
    address : {
        type : String,
        required : true,
        maxlenght : 50
    },
    deleted_At :{
        type : Date,
        required : false
    }
},{
    timestamps : {createdAt : 'created_at', updatedAt : 'updated_at'}
})


const user = mongoose.model('users',userSchema)
module.exports = user
