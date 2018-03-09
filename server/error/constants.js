const ERRORS = {
  TYPE: {
    BAD_REQUEST: `Bad Request`,
    VALIDATION: `Validation Error`,
  },
  FIELDS: {
    QUERY: `Invalid Query Parametrs`,
    PARAMS: `Invalid Request Parametrs`,
  },
  MESSAGE: {
    QUERY: `skip and limit must be number value`,
    PARAMS: `date must must be number value `,
    NOT_FOUND: `this post is not found`
  }
};

module.exports = {
  ERRORS
};
