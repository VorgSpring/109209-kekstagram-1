class ValidationError extends Error {
  constructor(errors) {
    super();
    this.code = 400;
    this.errors = errors;
  }
}

class NotFoundError extends Error {
  constructor(reason) {
    super();
    this.code = 404;
    this.message = `Not Found`;
    this.errorMessage = reason;
  }
}

module.exports = {
  NotFoundError,
  ValidationError
};
