const validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateRedflagCommentInput(data) {
  let errors = {};

  data.comments = !isEmpty(data.comments) ? data.comments : "";

  if (!validator.isLength(data.comments, { min: 2, max: 500 })) {
    errors.comments = "Comments must be between 2 and 500 characters";
  }

  if (validator.isEmpty(data.comments)) {
    errors.comments = "Comments field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
