const mongoose = require('mongoose')
const config = require('../../config/config')

const userSessionSchema = mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        default : null,
        ref : 'users'
    },
    token : {
       type : String,
       required : true
    },
    

})

const userSession = mongoose.model('userSessions',userSessionSchema);
module.exports = userSession