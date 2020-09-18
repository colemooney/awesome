// const express      = require('express');
// const path         = require('path');
// const favicon      = require('serve-favicon');
// const logger       = require('morgan');
// const cookieParser = require('cookie-parser');
// const bodyParser   = require('body-parser');
const layouts      = require('express-ejs-layouts');
// const mongoose     = require('mongoose');

// const flash        = require("connect-flash");
// const session      = require("express-session");

// const MongoStore   = require("connect-mongo")(session);
// const bcrypt = require("bcrypt");
// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const session      = require("express-session");
const MongoStore   = require("connect-mongo")(session);
const flash        = require("connect-flash");

const bcrypt = require("bcrypt");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// const GoogleStrategy = require("passport-google-oauth20").Strategy;



mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/coleture');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// default value for title local
app.locals.title = 'Coleture';
app.locals.home = 'Coleture Home';
app.locals.posts = 'Coleture News'

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);

app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());

app.use(passport.session());

app.use(flash());

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {

  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

passport.use(new LocalStrategy((username, password, next) => {
  
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }

    return next(null, user);
  });
}));

// passport.use(
//   new GoogleStrategy({
//           clientID: process.env.GOOGLE_OATH_CLIENT_ID,
//           clientSecret: process.env.GOOGLE_OATH_CLIENT_SECRET,
//           callbackURL: process.env.GOOGLE_OATH_CALLBACK
//       },
//       (accessToken, refreshToken, profile, done) => {
//           User.findOne({ googleID: profile.id })
//               .then(user => {
//                   let userData = { googleID: profile.id, username: profile._json.name, email: profile._json.email, role: 'User' }
//                   if (profile.photos) userData.image = profile.photos[0].value
//                   if (user) {
//                       done(null, user);
//                       return;
//                   }
//                   User.create(userData)
//                       .then(newUser => {
//                           done(null, newUser);
//                       })
//                       .catch(err => done(err));
//               })
//               .catch(err => done(err));
//       }
//   )
// );


const index = require('./routes/index');
app.use('/', index);
const posts = require('./routes/posts');
app.use('/', posts);
const podcasts = require('./routes/podcasts');
app.use('/', podcasts);
const about = require('./routes/about');
app.use('/', about);
const user = require('./routes/user');
app.use('/', user);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
