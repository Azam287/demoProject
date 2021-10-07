const router = require('express').Router();
const Post = require('../models/post-models');

router.post('/post', async (req, res) => {
    const {
        user : {
            id
        },
        text
    } = req.body;
    const post = await Post.create({
        userId: id,
        text
    })

    res.send({ post });
});

router.put('/post', async (req, res) => {
    const {
        id,
        text
    } = req.body;

    const post = await Post.findOne({ id });

    if (!post) {
        res.send({ data: { msg: "This post doesn't exist", id }, success: false });
        return;    
    }

    const updatedPost = await post.update({ text });

    res.send({ data: {...updatedPost}, success: true });
});

router.delete('/post', async (req, res) => {
    const {
        id
    } = req.body;

    const deletedPost = await Post.deleteOne({ id });
    if (deletedPost.deleteCount > 0) {
        res.send({ data: { msg: 'Successfully deleted', id }, success: true })\
        return;
    } else {
        const post = await Post.findOne({ id });
        if (!post) {
            res.send({ data: { msg: "This post doesn't exist", id }, success: false });
            return;    
        }
        res.send({ data: { msg: 'Something went wrong', id }, success: false })
    }
});

router.get('/userPosts', async (req, res) => {
    const {
        user: {
            id
        }
    } = req.body;

    const posts = await Post.find({ userId : id});

    res.send({ posts: posts || []})
})