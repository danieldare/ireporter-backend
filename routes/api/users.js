const express = require('express');
const router = express.Router();

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Store House
const usersData = [
  {
    id: Math.floor(Math.random() * 1550),
    firstname: 'Dodo',
    lastname: 'Dede',
    othernames: 'Dada',
    email: 'Dodeda@gmail.com',
    phonenumber: '09023291',
    username: 'Dodeda',
    registered: new Date().toLocaleString(),
    isAdmin: false,
    password: '1234562'
  },
  {
    id: Math.floor(Math.random() * 1550 + 1),
    firstname: 'Dodo1',
    lastname: 'Dede1',
    othernames: 'Dada1',
    email: 'Dodeda1@gmail.com',
    phonenumber: '09023291',
    username: 'Dodeda1',
    registered: new Date().toLocaleString(),
    isAdmin: false,
    password: '1234561'
  }
];

// Enable CORS
router.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// @route GET api/users
// @desc Get users Route
// @access Public
router.get('/', (req, res) => {
  const errors = {};
  usersData.forEach(data => {
    return res.status(200).json({ status: 200, usersData });
  });
  errors.msg = 'No red-flag record Found';
  return res.status(404).json({ status: 404, errors });
});

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', (req, res) => {
  // For validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json({errors});
  }

  usersData.forEach(data => {
    console.log(data.email);
    if (data.email == req.body.email) {
      errors.email = 'Email already exists';
      return res.status(400).json({ status: 404, errors }); //email: "Email Already exists"
    }
  });

  const newUser = {
    id: Math.floor(Math.random() * 1550),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    othernames: req.body.othernames,
    email: req.body.email,
    phoneNumber: req.body.phonenumber,
    username: req.body.username,
    registered: new Date().toLocaleString(),
    isAdmin: false,
    password: req.body.password
  };

  // Store in user Array
  usersData.push(newUser);
  res.status(200).json({ status: 200, data: usersData });
});

// @route POST api/users/login
// @desc Login user
// @access Public
router.post('/login', (req, res) => {
  // For validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json({errors: errors});
  }

  const password = req.body.password;

  usersData.forEach(data => {
    if (data.email === req.body.email) {
      if (data.password == password) {
        return res.status(200).json({ status: 200, data }); //email: "User can Login"
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json({ status: 400, errors }); // errors: "password Incorrect"
      }
    }
  });

  usersData.forEach(data => {
    if (data.email !== req.body.email) {
      errors.email = 'User not found';
      return res.status(404).json({ status: 404, errors });
    }
    });
});



module.exports = router;
