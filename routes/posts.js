const express = require('express');
const router  = express.Router();

const Post   = require("../models/Post.js");

/* GET posts page. */
router.get('/posts', (req, res, next) => {
    Post.find()
    .then((result)=>{
        console.log(result)
        res.render('post-page',{result})
        .catch((err)=>{
            next(err)
        })

    } )
});

module.exports = router;
