const mongoose = require('mongoose')

const commentSchema =  mongoose.Schema({
    comment : {
        type : String,
        required : true
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    }
})

const comment = mongoose.model('comments',commentSchema);
module.exports = comment