const Validator = require('validatorjs');
const config = require('../../config/config')
const Admin = require('../../model/admin/admin')
const AdminSession = require('../../model/admin/adminSession')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const adminSignUp = async (req, res) => {
    let validation = new Validator(req.body, {
        name: 'required|string|max:30',
        email: 'required|email|max:50',
        password: 'required|max:15|min:8'
    })
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage))
    }

    try {
        const { name, email, password } = req.body;
        const profile_image = req?.file?.filename;

        const ExistEmail = await Admin.findOne({ email: email })
        if (ExistEmail) {
            return RESPONSE.error(res, 1009)
        }

        const admin = await Admin.create({
            name,
            email,
            password,
            profile_image
        })

        const token = jwt.sign({ email, password, admin_id: admin._id }, config.jwt_secret_key, { expiresIn: '1hr' })

        const session = await AdminSession.create({ admin_id: admin._id, token })

        return RESPONSE.success(res, 1001, admin)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}


const getAllAdmin = async (req, res) => {
    try {
        const findData = await Admin.find()

        return RESPONSE.success(res, 1403, findData)

    } catch (error) {
        return RESPONSE.error(res, 9999)
    }
}

const getAdminById = async (req, res) => {
    try {
        const id = req.query._id;

        const findAdmin = await Admin.find({ _id: id }, '-password');

        return RESPONSE.success(res, 1403, findAdmin)

    } catch (error) {
        return RESPONSE.error(res, 9999)
    }
}


const updateAdminProfile = async (req, res) => {
    try {
        const { name, current_password, new_password } = req.body;
        let object = {
            name
        }
        if (new_password) {
            let validation = new Validator(req.body, {
                current_password: 'required',
                new_password: 'required|max:15|min:8'
            })
            if (validation.fails()) {
                firstMessage = Object.keys(validation.errors.all())[0];
                return RESPONSE.error(res, validation.errors.first(firstMessage))
            }
            object.password = new_password
        }
  
       await Admin.findByIdAndUpdate({_id : id},object)
     return RESPONSE.success(res,1404)

    } catch (error) {

    }
}
module.exports = {
    adminSignUp,
    getAllAdmin,
    getAdminById,
    updateAdminProfile
}