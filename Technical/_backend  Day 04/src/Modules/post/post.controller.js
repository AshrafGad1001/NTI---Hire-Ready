import Post from './post.model.js';
import User from '../user/user.model.js';

// GET /posts → Get All Posts
export const getAllPosts = async (req, res) => {
    try {
        const { status } = req.query;
        const filter = status ? { status } : {};
        const posts = await Post.find(filter);
        res.status(200).json({ success: true, count: posts.length, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET /posts/:id → Get One Post
export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        res.status(200).json({ success: true, data: post });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// POST /posts → Create Post
export const createPost = async (req, res) => {
    try {
        const { title, body, userId, status } = req.body;

        if (!title || !body || !userId) {
            return res.status(400).json({
                success: false,
                message: 'title, body, userId are required'
            });
        }

        // تأكد إن الـ User موجود
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const newPost = await Post.create({ title, body, userId, status });
        res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// PUT /posts/:id → Update Post
export const updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        res.status(200).json({ success: true, data: post });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// DELETE /posts/:id → Delete Post
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        res.status(200).json({ success: true, message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET /users/:id/posts → Get User Posts
export const getUserPosts = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const posts = await Post.find({ userId: req.params.id });
        res.status(200).json({ success: true, count: posts.length, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};