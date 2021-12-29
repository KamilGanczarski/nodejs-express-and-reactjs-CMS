module.exports = (app) => {
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    console.log(req.user);
    const { _id: id, login } = req.user
    const newUser = { id, login }
    res.send(newUser);
  });
};
