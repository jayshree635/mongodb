const Validator = require('validatorjs')
const Comment = require('../../model/comment/comment.model')
//const User = require('../../model/user/user.model')


const createComment = async (req,res) => {
    let validation = new Validator(req.body,{
        comment : 'required|string|max:100',
    })
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res,validation.errors.first(firstMessage));
    }
    try {
        const authUser = req.user;
        const {comment,author} = req.body;

        if (!authUser) {
            return RESPONSE.error(res,1014)
        }
        const commentData = await Comment.create({comment,author})
        return RESPONSE.success(res,1501,commentData)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res,9999)
    }
}

module.exports = {
    createComment
}