const asyncMiddleware = require("./middlewares/async");
const {celebrate} = require("celebrate");
const {Router} = require("express");
const _ = require('lodash');
const {Post} = require('../../db/models/post.model');
const {commentSchemaJoi,Comment} = require('../../db/models/comment.model');
const route = Router();

module.exports =  app => {
    app.use('/posts', route);

    route.get('/', asyncMiddleware(async (req, res) => {
        const posts = await Post.find().sort('name');
        res.send(posts);
    }));

    route.get('/:id', asyncMiddleware(async (req, res) => {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).send('The post with the given ID was not found.');

        const extendedPost = await Post.findById(req.params.id)
            .populate('author_id','username _id')
            // we populate the 'author_id' field from User collection and return those fields, specified in 2nd argument.
            .select('-__v');
        res.send(extendedPost);
        })
    );

    route.patch('/', celebrate(commentSchemaJoi), asyncMiddleware(async (req, res) => {
        const {author_id, post_id, text} = req.body;
        console.log(`comment text: ${text}`);
        console.log(`author_id: ${author_id}`);
        console.log(`post_id: ${post_id}`);

        let comment = new Comment(req.body);
        const post = await Post.findById(post_id);
        post.comments.push(comment);

        await post.save();
        res.status(200).send(post);
        })
    )
};