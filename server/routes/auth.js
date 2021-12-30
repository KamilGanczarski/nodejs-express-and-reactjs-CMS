module.exports = (app, passport) => {
  app.post(
    '/api/v1/auth/login',
    passport.authenticate('local-login', {
      successRedirect: '/admin',
      failureRedirect: '/login',
      failureFlash: true
    })
  );

  app.post(
    '/api/v1/auth/signup',
    passport.authenticate('local-signup', {
      successRedirect: '/admin',
      failureRedirect: '/signup',
      failureFlash: true
    })
  );
};