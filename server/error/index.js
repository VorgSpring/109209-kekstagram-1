const getValidationError = (messages) => (
  messages.map((message) => ({
    "error": `${message.type}`,
    [message.name]: `${message.field}`,
    "errorMessage": `${message.error}`
  }))
);

const getNotFoundError = (message) => ({
  "error": `Not Found`,
  "errorMessage": `${message.error}`
});

const validationError = (res, messages) => (
  res.status(400).send(getValidationError(messages))
);

const notFoundError = (res, message) => (
  res.status(404).send(getNotFoundError(message))
);

module.exports = {
  notFoundError,
  validationError,
  getValidationError,
  getNotFoundError
};
