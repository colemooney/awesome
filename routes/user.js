const express = require('express');
const router = express.Router();

// const Dream   = require("../models/Dream.js");
// const User           = require("../models/User.js");
// const bcrypt         = require("bcrypt");
// const bcryptSalt     = 10;
// const passport = require("passport");

router.get('/signup', (req, res, next)=>{
  
  res.render('signup')
})


module.exports = router;