const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const {getData} = require(`../../data/get`);
const {checkNumber} = require(`../../util/index`);
const {notFoundError, validationError} = require(`../error/index`);
const {ERRORS} = require(`../error/constants`);

const ERROR_MESSAGE = {
  QUERY: {
    type: ERRORS.TYPE.BAD_REQUEST,
    field: ERRORS.FIELDS.QUERY,
    name: `request`,
    error: ERRORS.MESSAGE.QUERY
  },
  PARAM: {
    type: ERRORS.TYPE.BAD_REQUEST,
    field: ERRORS.FIELDS.PARAMS,
    name: `request`,
    error: ERRORS.MESSAGE.PARAMS
  },
  NOT_FOUND: {
    error: ERRORS.MESSAGE.NOT_FOUND
  }
};

const postsRouter = new Router();
postsRouter.use(bodyParser.json());

const upload = multer({storage: multer.memoryStorage()});

const checkQueryParam = (skip, limit) => {
  let isValid = true;
  if (skip && !checkNumber(skip)) {
    isValid = false;
  }
  if (limit && !checkNumber(limit)) {
    isValid = false;
  }
  return isValid;
};

const getPosts = (skip = 0, limit = 50) => {
  const data = getData(limit);
  return data.slice(skip, skip + limit);
};

postsRouter.get(``, (req, res) => {
  const {skip, limit} = req.query;

  if (!checkQueryParam(skip, limit)) {
    return validationError(res, ERROR_MESSAGE.QUERY);
  }

  const posts = getPosts(skip, limit);
  return res.send({
    posts,
    skip,
    limit,
    total: posts.length
  });
});

postsRouter.get(`/:date`, (req, res) => {
  const date = parseInt(req.params.date, 10);

  if (isNaN(date)) {
    return validationError(res, ERROR_MESSAGE.PARAM);
  }

  let posts = getPosts();

  posts = posts.filter((item)=> {
    return item.date === date;
  });

  if (posts.length === 0) {
    return notFoundError(res, ERROR_MESSAGE.NOT_FOUND);
  }

  return res.send({
    posts,
    total: posts.length
  });
});


postsRouter.post(``, upload.single(`url`), (req, res) => {
  res.send(req.body);
});

module.exports = {
  postsRouter
};
