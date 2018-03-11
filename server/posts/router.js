const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const {getData} = require(`../../data/get`);
const check = require(`./check`);
const {notFoundError, validationError} = require(`../error/index`);
const {ERROR_MESSAGE} = require(`./errors`);

const postsRouter = new Router();
postsRouter.use(bodyParser.json());

const upload = multer({storage: multer.memoryStorage()});

const getPosts = (skip = 0, limit = 50) => {
  const data = getData(limit);
  return data.slice(skip, skip + limit);
};

postsRouter.get(``, (req, res) => {
  const errors = check.get(req);
  if (errors.length !== 0) {
    return validationError(res, errors);
  }

  const {skip, limit} = req.query;

  const posts = getPosts(skip, limit);
  return res.send({
    posts,
    skip,
    limit,
    total: posts.length
  });
});

postsRouter.get(`/:date`, (req, res) => {
  const errors = check.get(req);
  if (errors.length !== 0) {
    return validationError(res, errors);
  }

  const date = parseInt(req.params.date, 10);
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

postsRouter.post(``, upload.single(`image`), (req, res) => {
  const data = req.body;
  if (!data.image) {
    data.image = req.file;
  }

  const errors = check.post(data);
  if (errors.length !== 0) {
    return validationError(res, errors);
  }

  return res.send(data);
});

module.exports = {
  postsRouter
};
