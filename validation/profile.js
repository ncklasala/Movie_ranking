const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.screenName = !isEmpty(data.screenName) ? data.screenName : "";
  data.favoriteGenres = !isEmpty(data.favoriteGenres)
    ? data.favoriteGenres
    : "";

  if (!Validator.isLength(data.screenName, { min: 2, max: 40 })) {
    errors.screenName = "screenName needs to between 2 and 40 characters";
  }
  if (Validator.isEmpty(data.screenName)) {
    errors.screenName = "Profile screenName is required";
  }
  if (Validator.isEmpty(data.favoriteGenres)) {
    errors.favoriteGenres = "favoriteGenres field is required";
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid Url";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid Url";
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid Url";
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid Url";
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid Url";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
