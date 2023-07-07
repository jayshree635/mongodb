const mongoose = require('mongoose')

const postSchema =  mongoose.Schema({
    title : {
         type : String,
         required : true
    },
    content :{
        type : String,
        required : true
    },
    author : {
         type : mongoose.Schema.Types.ObjectId,
         ref : 'users'
    },
    comment : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'comments'
    }]
})

const post =  mongoose.model('posts',postSchema)
module.exports = post