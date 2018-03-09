const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const {getData} = require(`../../data/get`);
const {checkNumber} = require(`../../util/index`);
const {dataRenderer} = require(`../util/data-renderer`);
const {NotFoundError, ValidationError} = require(`../error/index`);

const postsRouter = new Router();
postsRouter.use(bodyParser.json());
postsRouter.use((exception, req, res, next) => {
  dataRenderer.renderException(req, res, exception);
  next();
});

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
    throw new ValidationError();
  }

  const posts = getPosts(skip, limit);
  res.send({
    posts,
    skip,
    limit,
    total: posts.length
  });
});

postsRouter.get(`/:date`, (req, res) => {
  const date = parseInt(req.params.date, 10);

  if (isNaN(date)) {
    throw new ValidationError();
  }

  let posts = getPosts();

  posts = posts.filter((item)=> {
    return item.date === date;
  });

  if (posts.length === 0) {
    throw new NotFoundError();
  }

  res.send({
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
