const validationError = (res, message) => {
  res.status(400).send({
    "error": `${message.type}`,
    [message.field]: `${message.name}`,
    "errorMessage": `${message.error}`
  });
};

const notFoundError = (res, message) => {
  res.status(404).send({
    "error": `Not Found`,
    "errorMessage": `${message.error}`
  });
};

module.exports = {
  notFoundError,
  validationError
};
