const Validator = require('validatorjs')
const Post = require('../../model/post/post.model')
const userAuth = require('../../middelware/authapi')

//....................User Access....................//

//...............create post by user..................
const createPost = async (req, res) => {
    let validation = new Validator(req.body, {
        title: 'required|string|max:50',
        content: 'required|string|max:150'
    })
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.errors(res, validation.errors.first(firstMessage))
    }
    try {
        const userAuth = req.user;
        if (!userAuth) {
            return RESPONSE.error(res, 1014)
        }
        const { title, content, author, comment } = req.body;
        const postData = await Post.create({
            title,
            content,
            author,
            comment
        })
        return RESPONSE.success(res, 1301, postData)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}


//......................get post by user....................
const getAllPostByUser = async (req, res) => {
    try {
        const userAuth = req.user;
        if (!userAuth) {
            return RESPONSE.error(res, 1014)
        }
        const findPost = await Post.find()
        return RESPONSE.success(res, 1302, findPost)

    } catch (error) {
        return RESPONSE.error(res, 9999)
    }
}

//................ get Post by user id.............
const getProductByPostId = async (req, res) => {
    try {
        const authUser = req.user;
        const id = req.query._id;
        if (!authUser) {
            return RESPONSE.error(res, 1014)
        }

        const findPost = await Post.findOne({ _id: id })

        if (!findPost) {
            return RESPONSE.error(res, 1307)
        }
        return RESPONSE.success(res, 1302, findPost)

    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}


//..................Update Post By Id....................

const updatePostById = async (req, res) => {
    let validation = new Validator(req.body, {
        title: 'required|string|max:50',
        content: 'required|string|max:150'
    });
    if (validation.fails()) {
        const firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage));
    }

    try {
        const userAuth = req.user;
        const id = req.query._id;
        const { title, content } = req.body;

        if (!userAuth) {
            return RESPONSE.error(res, 1014);
        }

        const findPost = await Post.findByIdAndUpdate(id, { title, content });

        if (!findPost) {
            return RESPONSE.error(res, 1307);
        }

        return RESPONSE.success(res, 1308, findPost);
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999);
    }
};

//..................Delete Post By Id....................

const deletePostById = async (req, res) => {
    try {
        const authUser = req.user;
        if (!authUser) {
            return RESPONSE.error(res, 1014);
        }

        const findPost = await Post.findOne({ _id: req.query._id, deleted_at: null });
        if (!findPost) {

            return RESPONSE.error(res, 1307);
        }

        await Post.findByIdAndDelete(findPost._id);

        return RESPONSE.success(res, 1304,);
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999);
    }
};

module.exports = {
    createPost,
    getAllPostByUser,
    getProductByPostId,
    updatePostById,
    deletePostById

}