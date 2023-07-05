const mongoose = require('mongoose')


const adminSessionSchema = mongoose.Schema({
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        default: null,
        ref: 'admins'
    },
    token : {
        type : String,
    }
})

const adminSession  = mongoose.model('adminSessions',adminSessionSchema)
module.exports = adminSession