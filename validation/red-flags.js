const validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateRedflagInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.location = !isEmpty(data.location) ? data.location : '';
  data.comments = !isEmpty(data.comments) ? data.comments : '';

  if (!validator.isLength(data.location, { min: 2, max: 50 })) {
    errors.location = 'Location must be between 2 and 50 characters';
  }

  if (!validator.isLength(data.comments, { min: 2, max: 500 })) {
    errors.comments = 'Comments must be between 2 and 500 characters';
  }

  if (validator.isEmpty(data.location)) {
    errors.location = 'Location field is required';
  }

  if (!validator.isLength(data.title, { min: 2, max: 500 })) {
    errors.title = 'Title must be between 2 and 50 characters';
  }

  if (validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }

  if (validator.isEmpty(data.comments)) {
    errors.comments = 'Comments field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
