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

const checkImage = (image) => (
  IMAGE_TYPES.indexOf(image.mimetype) !== -1
);

const checkEffect = (effect) => (
  typeof effect === EFFECTS.TYPE
    && EFFECTS.VALUES.indexOf(effect) !== -1
);

const checkScale = (scale) => (
  checkNumber(scale)
    && scale >= SCALE.MIN_VALUE
      && scale <= SCALE.MAX_VALUE
);

const checkHashtags = (hashtags) => {
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
};

const checkDescription = (description) => (
  typeof description === DESCRIPTION.TYPE
    && description.length <= DESCRIPTION.MAX_VALUE
);

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
  const {image, scale, effect, hashtags, description} = data;
  const errors = [];

  if (image) {
    if (!checkImage(image)) {
      errors.push(ERROR_MESSAGE.IMAGE.FORMAT);
    }
  } else {
    errors.push(ERROR_MESSAGE.IMAGE.EMPTY);
  }

  if (effect) {
    if (!checkEffect(effect)) {
      errors.push(ERROR_MESSAGE.EFFECT.FORMAT);
    }
  } else {
    errors.push(ERROR_MESSAGE.EFFECT.EMPTY);
  }

  if (scale) {
    if (!checkScale(scale)) {
      errors.push(ERROR_MESSAGE.SCALE.FORMAT);
    }
  } else {
    errors.push(ERROR_MESSAGE.SCALE.EMPTY);
  }

  if (hashtags) {
    if (!checkHashtags(hashtags)) {
      errors.push(ERROR_MESSAGE.HASHTAGS);
    }
  }

  if (description) {
    if (!checkDescription(description)) {
      errors.push(ERROR_MESSAGE.DESCRIPTION);
    }
  }

  return errors;
};

module.exports = {
  get: checkGetRequest,
  post: checkPostData
};
