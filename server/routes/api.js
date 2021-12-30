module.exports = (app) => {
  app.get('/api/v1/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/v1/current_user', (req, res) => {
    console.log(req.user);
    let newUser = {}
    if (req.user) {
      const { _id: id, login } = req.user
      newUser = { id, login }
    }

    res.send(newUser);
  });
};
