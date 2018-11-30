const validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateRedflagLocationInput(data) {
  let errors = {};

  data.location = !isEmpty(data.location) ? data.location : "";

  if (!validator.isLength(data.location, { min: 2, max: 50 })) {
    errors.location = "Location must be between 2 and 30 characters";
  }

  if (validator.isEmpty(data.location)) {
    errors.location = "Location field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
