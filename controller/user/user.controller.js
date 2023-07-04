const config = require('../../config/config')
const User = require('../../model/user/user.model')
const userSession = require('../../model/user/userSession.model')
const Validator = require('validatorjs')
const jwt = require('jsonwebtoken')


const UserRegistration = async (req, res) => {
    let validation = new Validator(req.body, {
        userName: 'required|string|max:50',
        email: 'required|email',
        password: 'required|max:15|min:8',
        address: 'required|string'
    })
    
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage))
    }

    try {
        const { userName, email, password, address } = req.body;

        const user = await User.create({ userName, email, password, address })

       const  token = jwt.sign({ email, userName, user_id: user._id }, config.jwt_secret_key, { expiresIn: '1h' });

        const session = await userSession.create({ user_id: user._id, token })

        return RESPONSE.success(res, 1001, session)

    } catch (error) {
        console.log(error);
        RESPONSE.error(res, 9999)
    }
}

const getUserProfile = async (req, res) => {
    try {

    } catch (error) {

    }
}

module.exports = {
    UserRegistration,
    getUserProfile
}