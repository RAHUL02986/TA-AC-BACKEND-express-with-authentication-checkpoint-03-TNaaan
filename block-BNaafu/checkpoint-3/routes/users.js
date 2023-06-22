var express = require('express');
var User = require('../models/User');
var router = express.Router();

/* GET users listing. */
router.get('/register', function (req, res, next) {
  res.render('register');
});
router.get('/login', function (req, res, next) {
  res.render('login');
});

//connect to database
router.post('/register', async (req, res) => {
  try {
    var user = await User.create(req.body);
    res.redirect('/users/login');
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.post('/login', async (req, res) => {
  try {
    var { email, password } = req.body;
    if (!password || !email) {
      return res.redirect('/users/login');
    }
    var user = await User.findOne({ email });
    if (!user) {
      return res.redirect('/users/login');
    }
    user.verifyPassword(password, (err, result) => {
      if (!result) {
        return res.redirect('/users/login');
      }
    });
    req.session.userId = user.id;
    return res.redirect('/client');
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.redirect('/users/login');
});

module.exports = router;
