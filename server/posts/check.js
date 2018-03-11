const {checkNumber} = require(`../../util/index`);
const {ERROR_MESSAGE} = require(`./errors`);

const IMAGE_TYPES = [`image/jpeg`, `image/png`];
const EFFECTS = {
  TYPE: `string`,
  VALUES: [`none`, `chrome`, `sepia`, `marvin`, `phobos`, `heat`]
};
const SCALE = {
  MIN_VALUE: 0,
  MAX_VALUE: 100
};
const HASHTAGS = {
  MAX_ITEMS: 5,
  MAX_VALUE: 20
};
const DESCRIPTION = {
  TYPE: `string`,
  MAX_VALUE: 140
};
const REQUIRED_FIELDS = [`image`, `scale`, `effect`];

const check = {
  image(image) {
    return IMAGE_TYPES.indexOf(image.mimetype) !== -1;
  },

  effect(effect) {
    return typeof effect === EFFECTS.TYPE
      && EFFECTS.VALUES.indexOf(effect) !== -1;
  },

  scale(scale) {
    return checkNumber(scale)
      && scale >= SCALE.MIN_VALUE
        && scale <= SCALE.MAX_VALUE;
  },

  hashtags(hashtags) {
    if (!Array.isArray(hashtags)
      || hashtags.length >= HASHTAGS.MAX_ITEMS) {
      return false;
    }

    const isValid = true;
    hashtags.forEach((hashtag, index) => {
      if (hashtag.indexOf(`#`) === 0
        && hashtag.indexOf(` `) === -1
          && hashtag.length <= HASHTAGS.MAX_VALUE) {

        const hashtagsFiltered = hashtags.filter((item, i) => {
          return i !== index && item === hashtag;
        });

        if (hashtagsFiltered.length !== 0) {
          isValid = false;
          return;
        }
      } else {
        isValid = false;
        return;
      }
    });

    return isValid;
  },

  description(description) {
    return typeof description === DESCRIPTION.TYPE
      && description.length <= DESCRIPTION.MAX_VALUE;
  }
};

const checkGetRequest = (req) => {
  const {skip, limit} = req.query;
  const date = req.params.date;
  const errors = [];

  if (skip && !checkNumber(skip)) {
    errors.push(ERROR_MESSAGE.QUERY.SKIP);
  }
  if (limit && !checkNumber(limit)) {
    errors.push(ERROR_MESSAGE.QUERY.LIMIT);
  }
  if (date && !checkNumber(date)) {
    errors.push(ERROR_MESSAGE.PARAM);
  }

  return errors;
};

const checkPostData = (data) => {
  const errors = [];
  const fields = Object.keys(data);

  REQUIRED_FIELDS.forEach((field) => {
    if (fields.indexOf(field) === -1 || !data[field]) {
      errors.push(ERROR_MESSAGE.EMPTY[field.toUpperCase()]);
    }
  });

  if (errors.length !== 0) {
    return errors;
  }

  fields.forEach((field) => {
    if (check[field] && !check[field](data[field])) {
      errors.push(ERROR_MESSAGE[field.toUpperCase()]);
    }
  });

  return errors;
};

module.exports = {
  get: checkGetRequest,
  post: checkPostData
};
