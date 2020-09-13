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

router.get('/posts/:id', (req, res, next)=>{
    console.log("PARAMS ------------",req.params.id)
    let id = req.params.id;
    Post.findById(id)
    .then((result)=>{
        console.log("RESULT ----------------", result)
        Post.find({user: req.params.id})
        .populate('user')
        .then((postresult)=>{
          console.log("postRESULT --------------", postresult)
          data = {
            result: result,
            postresult: postresult
          }
          console.log("these are the results ----------- ", result);
          res.render(`singlePost`, data)
        })
        .catch((err)=>{
          next(err)
      })
      .catch((err)=>{
        next(err)
      })
    })
    })

    
  

module.exports = router;
