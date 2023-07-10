const Validator = require('validatorjs')
const Comment = require('../../model/comment/comment.model')
//const User = require('../../model/user/user.model')

//...............create comment by user...................
const createComment = async (req, res) => {
    let validation = new Validator(req.body, {
        comment: 'required|string|max:100',
    })
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage));
    }
    try {
        const authUser = req.user;
        const { comment, author } = req.body;

        if (!authUser) {
            return RESPONSE.error(res, 1014)
        }
        const commentData = await Comment.create({ comment, author })
        return RESPONSE.success(res, 1501, commentData)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}

//.......................get all comment by user....................
const getAllCommentByUser = async (req, res) => {
    try {
        const authUser = req.user;
        if (!authUser) {
            return RESPONSE.error(res, 1014);
        }

        const findComment = await Comment.find()
        return RESPONSE.success(res, 1502, findComment)

    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}

//...............delete comment by user.............
const deleteCommentById = async (req, res) => {
    try {
        const authUser = req.user;
        const id = req.query._id;
        if (!authUser) {
            return RESPONSE.error(res, 1014)
        }

        const findComment = await Comment.findOne({ _id: id })
        if (!findComment) {
            return RESPONSE.error(res, 1503)
        }

        await Comment.findByIdAndDelete(findComment._id)
        return RESPONSE.success(res, 1504)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}

//.............get all comment by admin
const getAllCommentByAdmin = async (req, res) => {
    try {
        const authUser = req.user;
        if (!authUser) {
            return RESPONSE.error(res, 1406);
        }

        const findComment = await Comment.find()
        return RESPONSE.success(res, 1502, findComment)

    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}


//...................delete comment by admin
const deleteCommentByAdmin = async (req, res) => {
    try {
        const authUser = req.user;
        const id = req.query._id;

        if (!authUser) {
            return RESPONSE.error(res, 1406)
        }

        const findComment = await Comment.findOne({ _id: id })
        if (!findComment) {
            return RESPONSE.error(res, 1503)
        }
        await Comment.findByIdAndDelete(findComment._id)
        return RESPONSE.success(res, 1504)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}

module.exports = {
    createComment,
    getAllCommentByUser,
    getAllCommentByAdmin,
    deleteCommentById,
    deleteCommentByAdmin
}