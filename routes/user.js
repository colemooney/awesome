const express = require('express');
const router = express.Router();

// const Dream   = require("../models/Dream.js");
const User           = require("../models/User.js");
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

router.get('/signup', (req, res, next)=>{
  console.log(req.user, "meeeeeeee")
  res.render('signup')
})

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email
  const realName = req.body.realName
console.log(req.body)
  if (username === "" || password === "") {
    res.render("/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username })
  .then(user => {
    if (user !== null) {
      res.render("/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username: username,
      password: hashPass,
      email: email,
      realName: realName
    });

    newUser.save((err) => {
      if (err) {
        res.render("signup", { message: "Something went wrong" });
      } else {
        res.redirect("/");
      }
    });
  })
  .catch(error => {
    next(error)
  })
});

router.get("/login", (req, res, next) => {
  
  res.render("login", { user: req.session.currentUser})
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));
router.use((req, res, next) => {
  console.log(req.user, "meeeeeeee")
  if (req.user) { 
    next(); 
  } else {
    res.redirect("/login");
  }
});

router.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("private", { user: req.user });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("login");
});


module.exports = router;