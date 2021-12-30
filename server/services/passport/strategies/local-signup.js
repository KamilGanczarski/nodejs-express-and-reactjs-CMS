// Attempt refactory of import {}
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (passport) => {
  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        usernameField: 'login',
        passwordField: 'password',
        passReqToCallback: true
      },
      async (req, login, password, done) => {
        const existingUser = await User.findOne({ 'login': login });

        if (existingUser) {
          return done(
            null,
            false,
            req.flash('signupMessage', 'That username is not available')
          )
        } else {
          const newUser = new User();
          newUser.login = login;
          newUser.password = newUser.generateHash(password);

          const user = await newUser.save();
          done(null, user);
        }
      }
    )
  )
};
