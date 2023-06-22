var express = require('express');
var router = express.Router();

var User = require('../models/User');
var Income = require('../models/Income');
var Expense = require('../models/Expense');
var Token = require('../models/Token');

router.get('/', async (req, res) => {
  try {
    var user = await User.findOne(req.body);
    res.render('single', { user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.get('/income/new', function (req, res, next) {
  res.render('incomeCreateForm');
});
router.get('/expense/new', function (req, res, next) {
  res.render('expenseCreateForm');
});

module.exports = router;
