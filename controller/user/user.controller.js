const config = require('../../config/config')
const User = require('../../model/user/user.model')
const userSession = require('../../model/user/userSession.model')
const Validator = require('validatorjs')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const post = require('../../model/post/post.model')


//...........User registration API............
const UserRegistration = async (req, res) => {
    let validation = new Validator(req.body, {
        userName: 'required|string|max:50',
        email: 'required|email',
        password: 'required|max:15|min:8',
        address: 'required|string',
        post: 'required'
    })
    if (validation.fails()) {

        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage))
    }

    try {
        const { userName, email, password, address, post } = req.body;
        const ExistEmail = await User.findOne({ email: email })
        if (ExistEmail) {
            return RESPONSE.error(res, 1009)
        }
        const user = await User.create({ userName, email, password, address, post })

        const token = jwt.sign({ email, userName, user_id: user._id }, config.jwt_secret_key, { expiresIn: '1h' });

        const session = await userSession.create({ user_id: user._id, token })
        console.log(session);

        return RESPONSE.success(res, 1001, session)
    } catch (error) {
        console.log(error);
        RESPONSE.error(res, 9999)
    }
}

//...................get All User Profile........................
const getAllUserProfile = async (req, res) => {
    try {
        const findUser = await User.find({ deleted_At: null }, '-password')

        return RESPONSE.success(res, 1010, findUser)
    } catch (error) {
        return RESPONSE.error(res, 9999)
    }
}

//.....................Get User Profile By Id.......
const getUserProfile = async (req, res) => {
    try {
        const id = req.query._id;

        const findUser = await User.findOne({ _id: id, deleted_At: null }, '-password')
        return RESPONSE.success(res, 1010, findUser)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}

//.........................get user with post...............
const getUserWithPost = async (req, res) => {
    try {
        const authUser = req.user;
        const id = req.query._id;

        if (!authUser) {
            return RESPONSE.error(res, 1014)
        }

        const findData = await User.findOne({ _id: id }).populate()
        if (!findData) {
            return RESPONSE.error(res, 1307)
        }
        return RESPONSE.success(res, 1010, findData)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}




//...................Update User Profile..............
const updateUserProfile = async (req, res) => {
    try {
        const id = req.query._id
        const { userName, address, current_password, new_password } = req.body;
        let object = {
            userName,
            address
        }
        if (new_password) {
            let validation = new Validator({
                current_password: 'required',
                new_password: 'required|max:15|min:8'
            })
            if (validation.fails()) {
                firstMessage = Object.keys(validation.errors.all())[0];
                return RESPONSE.error(res, validation.errors.first(firstMessage))
            }
            object.password = new_password;
        }
        await User.findByIdAndUpdate({ _id: id }, object)
        return RESPONSE.success(res, 1011);
    } catch (error) {
        console.error(error);
        return RESPONSE.error(res, 9999, 'An error occurred while updating user profile');
    }
};

//......................delete User By Id....................
const deleteUserById = async (req, res) => {
    try {
        const id = req.query._id;
        const findUser = await User.findOne({ _id: id })

        if (!findUser) {
            return RESPONSE.error(res, 1007)
        }

        await User.deleteOne({ _id: findUser.id })
        await userSession.deleteMany({ user_id: id });

        return RESPONSE.success(res, 1013)
    } catch (error) {
        return RESPONSE.error(res, 9999)
    }
}


module.exports = {
    UserRegistration,
    getAllUserProfile,
    getUserProfile,
    getUserWithPost,
    updateUserProfile,
    deleteUserById
}