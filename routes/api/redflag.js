const express = require('express');
const router = express.Router();

// Load Input Validation
const validateRedflagInput = require('../../validation/red-flags');
const validateRedflagLocationInput = require('../../validation/red-flag-location');
const validateRedflagCommentInput = require('../../validation/red-flag-comment');

// Red-Flag Store
const redflagStore = [
  {
    id: Math.floor(Math.random() * 1550),
    createdOn: new Date().toLocaleString(),
    createdBy: 90,
    title: "Bribery case",
    type: 'red-flag',
    location: '50long',
    status: 'under-investigation',
    images: [],
    videos: [],
    comments: 'Down the aile'
  },
  {
    id: Math.floor(Math.random() * 1550),
    createdOn: new Date().toLocaleString(),
    createdBy: 100,
    title: "Fraud case",
    type: 'red-flag',
    location: '10long',
    status: 'under-investigation',
    images: [],
    videos: [],
    comments: 'up the aile'
  }
];

// Enable CORS
router.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// @route GET api/red-flags
// @desc Get red flags Route
// @access Public
router.get('/', (req, res) => {
  const errors = {};
  redflagStore.forEach(data => {
    return res.status(200).json({ status: 200, redflagStore });
  });
  errors.msg = 'No red-flag record Found';
  return res.status(404).json({ status: 404, errors });
});

// @route GET api/red-flags/:redflagId
// @desc Get one red flag Route
// @access Public
router.get('/:redflagid', (req, res) => {
  const errors = {};
  let redflagid = req.params.redflagid;
  redflagStore.forEach(data => {
    if (data.id == redflagid) return res.status(200).json({ status: 200, data });
  });

  redflagStore.forEach(data => {
    if (data.id != redflagid) {
      errors.msg = 'Page not Found';
      return res.status(404).json({ status: 404, errors });
    }
  });
});

// @route POST api/red-flags
// @desc Post red flags Route
// @access Public
router.post('/', (req, res) => {
  // For validation
  const { errors, isValid } = validateRedflagInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json({errors});
  }

  const newRedflag = {
    id: Math.floor(Math.random() * 1550),
    createdOn: new Date().toLocaleString(),
    createdBy: 89,
    title: req.body.title,
    type: 'red-flag',
    location: req.body.location,
    status: req.body.status,
    images: [req.body.images],
    videos: [req.body.videos],
    comments: req.body.comments
  };

  // Images - split into array
  if (typeof req.body.images !== 'undefined' || null) {
    newRedflag.images = req.body.images.split(',');
  }

  // Videos - split into array
  if (typeof req.body.videos !== 'undefined' || null) {
    newRedflag.videos = req.body.videos.split(',');
  }

  redflagStore.push(newRedflag);
  return res.status(200).json({
    status: 200,
    data: [{ id: newRedflag.id, message: 'Created red-flag record' }]
  });
});

// @route PATCH api/red-flags/:redflagId/:location
// @desc update the location
// @access Public
router.patch('/:redflagid/:location', (req, res) => {
  const errors = {};
  let redflagid = req.params.redflagid;
  let location = req.params.location;

  redflagStore.forEach(data => {
    if (data.id == redflagid && data.location == location) {
      // For validation
      const { errors, isValid } = validateRedflagLocationInput(req.body);

      // Check Validation
      if (!isValid) {
        return res.status(400).json({errors : errors});
      }

      // Insert input field value into global array
      data.location = req.body.location;
      return res.status(200).json({
        status: 200,
        data: [
          {
            id: data.id,
            message: "Updated red-flag record's location"
          }
        ]
      });
    }
  });

  redflagStore.forEach(data => {
    if (data.id != redflagid) {
      errors.msg = 'Page not Found';
      return res.status(404).json({ status: 404, errors });
    }
  });
});

// @route PATCH api/red-flags/:redflagId/:comment
// @desc update the comment
// @access Public
router.put('/:redflagid/:comment', (req, res) => {
  const errors = {};
  let redflagid = req.params.redflagid;
  let comments = req.params.comment;

  redflagStore.forEach(data => {
    if (data.id == redflagid && data.comments == comments) {
      // For validation
      const { errors, isValid } = validateRedflagCommentInput(req.body);

      // Check Validation
      if (!isValid) {
        return res.status(400).json(errors);
      }

      // Insert input field value into global array
      data.comments = req.body.comments;
      return res.status(200).json({
        status: 200,
        data: [
          {
            id: data.id,
            message: "Updated red-flag record's comment"
          }
        ]
      });
    }
  });

  redflagStore.forEach(data => {
    if (data.id != redflagid) {
      errors.msg = 'Page not Found';
      return res.status(404).json({ status: 404, errors });
    }
  });
});

// @route DELETE api/red-flags/:redflagId/:comment
// @desc delete a specified red-flag record
// @access Public
router.delete('/:redflagid', (req, res) => {
  const errors = {};
  let redflagid = req.params.redflagid;
  redflagStore.filter((data, index) => {
    if (data.id == redflagid) {
      // Get removeIndex
      const removeIndex = index;
      //   Splice out of array
      redflagStore.splice(removeIndex, 1);
      return res.status(200).json({
        status: 200,
        data: [
          {
            id: data.id,
            message: 'red-flag record has been deleted”'
          }
        ]
      });
    }
    errors.msg = 'No red-flag record Found';
    return res.status(404).json({ status: 404, errors });
  });
});

module.exports = router;
