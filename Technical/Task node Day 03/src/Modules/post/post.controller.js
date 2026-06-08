import Post from './post.model.js';
import User from '../user/user.model.js';

// ✅ الجديدة بس — فيها الـ status filter
export const getAllPosts = async (req, res) => {
    try {
        const { status } = req.query;
        const whereClause = status ? { status } : {};
        const posts = await Post.findAll({ where: whereClause });
        res.status(200).json({ success: true, count: posts.length, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getPostById = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        res.status(200).json({ success: true, data: post });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createPost = async (req, res) => {
    try {
        const { title, body, userId, status } = req.body; 

        if (!title || !body || !userId) {
            return res.status(400).json({
                success: false,
                message: 'title, body, userId are required'
            });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const newPost = await Post.create({ title, body, userId, status }); 
        res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updatePost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        const { title, body, status } = req.body;
        await post.update({
            title:  title  ?? post.title,
            body:   body   ?? post.body,
            status: status ?? post.status
        });
        res.status(200).json({ success: true, data: post });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        await post.destroy();
        res.status(200).json({ success: true, message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const posts = await Post.findAll({ where: { userId: req.params.id } });
        res.status(200).json({ success: true, count: posts.length, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};