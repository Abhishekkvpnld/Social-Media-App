import Post from "../models/post.js";
import User from "../models/user.js";

/* POST */
export const createPost = async (req, res) => {
    try {

        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post(
            {
                userId,
                firstName: user.firstName,
                lastName: user.lastName,
                location: user.location,
                description,
                userPicturePath: user.picturePath,
                picturePath,
                likes: {},
                comments: []
            }
        );
        await newPost.save();
        const post = await Post.find()
        res.status(201).json(post)

    } catch (err) {
        res.status(409)
            .json({ message: err.message })
    }
};



/* READ */
export const getFeedPost = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (err) {

        res.status(404)
            .json({ message: err.message });
    }
};



/* GET */
export const getUserPost = async (req, res) => {
    try {
        console.log("getUserPost")
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);
    } catch (err) {

        res.status(404)
            .json({ message: err.message });
    }
};



/* UPDATE */
export const likePost = async (req, res) => {
    try {

        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = await post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId);

        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );
        res.status(200).json(updatedPost);

    } catch (err) {

        res.status(404)
            .json({ message: err.message });
    }
};