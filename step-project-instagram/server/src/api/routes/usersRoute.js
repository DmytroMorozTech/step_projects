const asyncMiddleware = require("./middlewares/async");
const {celebrate} = require("celebrate");
const {Router} = require("express");
const {Post} = require('../../db/models/post.model');
const _ = require('lodash');
const {User} = require('../../db/models/user.model');
const {userUpdateSchemaJoi} = require ('../../db/models/userUpdate.model');
const route = Router();

let currentTime;
let timeOfLastClick =  Date.now();

module.exports =  app => {
    app.use('/users', route);
    // --------------------------------------------
    route.get('/', asyncMiddleware(async (req, res) => {
        const users = await User.find().sort('name');
        res.send(users);
        if (!users) return res.status(404).send("No users were found in database.")
    })
    );

    route.get('/:id', asyncMiddleware(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send('The user with the given ID was not found.');

        const userWithPosts = await User.findById(req.params.id).populate('posts');
        res.send(userWithPosts);
    })
    );

    route.patch('/', celebrate(userUpdateSchemaJoi), asyncMiddleware(async (req, res) => {
    const {active_user, action_type, action_payload} = req.body;

    // ---------------------------------
    // In this code block we ensure that if user clicks on buttons too fast, web-app will work steadily.
    currentTime = Date.now();
    let timeDiffBetweenClicks = currentTime - timeOfLastClick;
    // console.log(`Time difference between clicks: ${timeDiffBetweenClicks}`);

    if (timeDiffBetweenClicks < 500) {
        console.log('Forbidden! You click on those buttons too fast!')
        return res.status(403).send('Forbidden! You click on those buttons too fast!');
    }
    // ---------------------------------

        if (action_type === "TOGGLE_SUBSCRIPTION") {
            timeOfLastClick = Date.now();
            // 1. We should find in database the active_user object and modify it’s field “subscriptions” by toggling ObjectId of passive_user (the one, active_user is subscribing to/unsubscribing from).
            // 2. We should find in database the passive_user object and modify it’s field subscribers by toggling ObjectId of active_user.
            console.log("TOGGLE_SUBSCRIPTION server-side")

            let activeUserId = active_user;
            let passiveUserId = action_payload;
            console.log(`activeUserId: ${activeUserId}`);
            console.log(`passiveUserId: ${passiveUserId}`);

            if (activeUserId === passiveUserId) {
                return res.status(403).send('User is unable to subscribe to himself');
            }

            let activeUser = await User.findById(activeUserId);
            let passiveUser = await User.findById(passiveUserId);
            if (!activeUser || !passiveUser) return res.status(404).send('The user with the given ID was not found.');

            if (activeUser.subscriptions.indexOf(passiveUserId)===-1) {
                activeUser.subscriptions.push(passiveUserId);
                passiveUser.subscribers.push(activeUserId);
            } else {
                let indexOfPassiveUser = activeUser.subscriptions.indexOf(passiveUserId);
                activeUser.subscriptions.splice(indexOfPassiveUser,1);

                let indexOfActiveUser = passiveUser.subscribers.indexOf(activeUserId);
                passiveUser.subscribers.splice(indexOfActiveUser,1);
            }

            console.log(`active_user subscriptions: ${activeUser.subscriptions}`);
            console.log(`passive_user subscribers: ${passiveUser.subscribers}`);

            await activeUser.save();
            await passiveUser.save();
            res.status(200).send({
                active_user_updated_data: {
                    user_id:activeUserId,
                    subscriptions: activeUser.subscriptions
                },
                passive_user_updated_data: {
                    user_id:passiveUserId,
                    subscribers: passiveUser.subscribers
                }
            });
        }
        // ------------------------------------------------------

        if (action_type === "TOGGLE_SAVED_POSTS") {
            timeOfLastClick = Date.now();
            // we will work with field "saved_posts" in object "user" of active_user.
            // if active_user already has this post (action_payload) saved in field "saved_posts", then it will be removed from this field.
            // if not - ObjectId of this post will be added to field "saved_posts" in active_user.
            const user = await User.findById(active_user);
            if (!user) return res.status(404).send('The user with the given ID was not found.');

            if (user.saved_posts.indexOf(action_payload)===-1) {
                user.saved_posts.push(action_payload);
            } else {
                let index = user.saved_posts.indexOf(action_payload);
                user.saved_posts.splice(index,1);
            }

            await user.save();
            console.log(user.saved_posts);
            res.send(user);
        }
        // ------------------------------------------------------

        if (action_type === "TOGGLE_LIKE") {
            timeOfLastClick = Date.now();
            // we will work with field "liked_posts" in object "user" of active_user.
            // if user has already liked this post(action_payload) before, then ObjectId of this post will be removed from "liked_posts".
            // if not - ObjectId of liked post will be added to field "liked_posts" .
            // besides that we will find in DB the post, where user clicked on "heart" icon and modify it's field "likes_counter": increment/decrement it by 1(depending on the context of action).

            const user = await User.findById(active_user);
            if (!user) return res.status(404).send('The user with the given ID was not found.');

            let likedPostId = action_payload;
            const post = await Post.findById(likedPostId);

            if (user.liked_posts.indexOf(likedPostId)===-1) {
                user.liked_posts.push(likedPostId);
                post.likes_counter +=1;
                console.log("Liked +1");
                console.log(`post.likes_counter: ${post.likes_counter}`);
            } else {
                let index = user.liked_posts.indexOf(likedPostId);
                user.liked_posts.splice(index,1);
                post.likes_counter -=1;
                // code line below ensures that counter will not go below zero.
                post.likes_counter < 0 ? post.likes_counter = 0 : post.likes_counter;
                console.log("Liked -1");
                console.log(`post.likes_counter: ${post.likes_counter}`);
            }

            await post.save();
            await user.save();
            res.send(post);
        }
    })
    )
}


// ----------------------------------------
// The route below is a draft for creating a new user.
// route.post('/', celebrate(userSchemaJoi), asyncMiddleware(async (req, res) => {
//     let userInDb = await User.findOne({email: req.body.email});
//     if (userInDb) return res.status(400).send('User already registered');
//
//     // Here we basically create a new user. His password that came here like a plain text, is hashed here and saved to database in hashed condition.
//
//     let user = new User(req.body);
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(user.password, salt);
//
//     await user.save();
//
//     const token = user.generateAuthToken();
//     res
//         .header('x-auth-token', token)
//         .header('access-control-expose-headers','x-auth-token')
//         .send(_.pick(user, ['_id', 'name', 'email']));
//     })
// )
// ------------------------------------------------------