const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateTodoInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.userId = !isEmpty(data.userId) ? data.userId : "";

  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Todo is required";
  }

  // User checks
  if (Validator.isEmpty(data.userId)) {
    errors.userId = "User is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
