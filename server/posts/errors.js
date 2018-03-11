const ERRORS = {
  TYPE: {
    BAD_REQUEST: `Bad Request`,
    VALIDATION: `Validation Error`,
  },

  NAME: {
    QUERY: `query`,
    REQUEST: `request`,
    IMAGE: `image`,
    FIELD: `scale`
  },

  FIELDS: {
    SKIP: `Invalid skip query param`,
    LIMIT: `Invalid limit query param`,
    PARAMS: `Invalid request parametrs`,
    IMAGE: `Invalid image`,
    SCALE: `Invalid field scale`,
    EFFECT: `Invalid field effect`,
    HASHTAGS: `Invalid field hashtags`,
    DESCRIPTION: `Invalid field description`
  },

  MESSAGE: {
    SKIP: `skip must be number value.`,
    LIMIT: `limit must be number value.`,
    PARAMS: `date must be number value.`,
    NOT_FOUND: `this post is not found.`,
    IMAGE: `invalid fomat image! Valid format only 'jpg' and 'png'.`,
    SCALE: `scale is should be number in the range from 0 to 100`,
    EFFECT: `effect should have effect one of the preset values: 'none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'`,
    HASHTAGS: `hashtags should be:
      - is array
      - no more than 5 elements
      - each line starts with the '#' character
      - contain one word with no spaces
      - words not repeated
      - one hashtag does not exceed 20 characters`,
    DESCRIPTION: `description should have no more than 140 characters`,
    EMPTY: `is required.`
  }
};

const ERROR_MESSAGE = {
  QUERY: {
    SKIP: {
      type: ERRORS.TYPE.BAD_REQUEST,
      field: ERRORS.FIELDS.SKIP,
      name: ERRORS.NAME.QUERY,
      error: ERRORS.MESSAGE.SKIP
    },
    LIMIT: {
      type: ERRORS.TYPE.BAD_REQUEST,
      field: ERRORS.FIELDS.LIMIT,
      name: ERRORS.NAME.QUERY,
      error: ERRORS.MESSAGE.LIMIT
    }
  },

  PARAM: {
    type: ERRORS.TYPE.BAD_REQUEST,
    field: ERRORS.FIELDS.PARAMS,
    name: ERRORS.NAME.REQUEST,
    error: ERRORS.MESSAGE.PARAMS
  },

  NOT_FOUND: {
    error: ERRORS.MESSAGE.NOT_FOUND
  },

  IMAGE: {
    type: ERRORS.TYPE.VALIDATION,
    field: ERRORS.FIELDS.IMAGE,
    name: ERRORS.NAME.IMAGE,
    error: ERRORS.MESSAGE.IMAGE
  },

  SCALE: {
    type: ERRORS.TYPE.VALIDATION,
    field: ERRORS.FIELDS.SCALE,
    name: ERRORS.NAME.FIELD,
    error: ERRORS.MESSAGE.SCALE
  },

  EFFECT: {
    type: ERRORS.TYPE.VALIDATION,
    field: ERRORS.FIELDS.EFFECT,
    name: ERRORS.NAME.FIELD,
    error: ERRORS.MESSAGE.EFFECT
  },

  HASHTAGS: {
    type: ERRORS.TYPE.VALIDATION,
    field: ERRORS.FIELDS.HASHTAGS,
    name: ERRORS.NAME.FIELD,
    error: ERRORS.MESSAGE.HASHTAGS
  },

  DESCRIPTION: {
    type: ERRORS.TYPE.VALIDATION,
    field: ERRORS.FIELDS.DESCRIPTION,
    name: ERRORS.NAME.FIELD,
    error: ERRORS.MESSAGE.DESCRIPTION
  },

  EMPTY: {
    IMAGE: {
      type: ERRORS.TYPE.VALIDATION,
      field: ERRORS.FIELDS.IMAGE,
      name: ERRORS.NAME.IMAGE,
      error: ERRORS.MESSAGE.EMPTY
    },

    SCALE: {
      type: ERRORS.TYPE.VALIDATION,
      field: ERRORS.FIELDS.SCALE,
      name: ERRORS.NAME.FIELD,
      error: ERRORS.MESSAGE.EMPTY
    },

    EFFECT: {
      type: ERRORS.TYPE.VALIDATION,
      field: ERRORS.FIELDS.EFFECT,
      name: ERRORS.NAME.FIELD,
      error: ERRORS.MESSAGE.EMPTY
    }
  }
};

module.exports = {
  ERRORS,
  ERROR_MESSAGE
};
