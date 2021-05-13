// const { cloudinary } = require('../../utils/cloudinary');
// import {Router} from "express";
// // const mongoose = require('mongoose');
// const express = require('express');
// const route = Router();
//
// export default app => {
//     // --------------------------------------------
//     app.use('/upload', route);
//
//     route.post('/', async (req, res) => {
//         try {
//             const fileStr = req.body.data;
//             const uploadResponse = await cloudinary.uploader.upload(fileStr, {
//                 upload_preset: 'ml_default',
//             });
//             console.log(uploadResponse);
//             res.json({ msg: 'Image was successfully uploaded to Cloudinary!' });
//         } catch (err) {
//             console.error(err);
//             res.status(500).json({ err: 'Something went wrong' });
//         }
//     });
//
//     route.get('/', async (req, res) => {
//
//         try {
//             cloudinary.search
//                 .expression('folder:instagram/posts/user_1')
//                 .sort_by('public_id','desc')
//                 .max_results(30)
//                 .execute().then(result=>console.log(result));
//         }
//         catch (err) {
//             console.error(err);
//             res.status(500).json({ err: 'Something went wrong' });
//         }
//
//     });
//
// };