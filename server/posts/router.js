const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const {getData} = require(`../../data/get`);
const {checkNumber} = require(`../../util/index`);

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
  if (skip && limit && skip >= limit) {
    isValid = false;
  }
  return isValid;
};

const getPosts = (skip = 0, limit = 20) => {
  const data = getData(limit);
  return data.slice(skip, skip + limit);
};

postsRouter.get(``, (req, res) => {
  const {skip, limit} = req.query;

  if (!checkQueryParam(skip, limit)) {
    res.set(`Content-Type`, `text/html`);
    res.status(400).end();
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
    res.set(`Content-Type`, `text/html`);
    res.status(400).end();
  }

  const {skip, limit} = req.query;

  if (!checkQueryParam(skip, limit)) {
    res.set(`Content-Type`, `text/html`);
    res.status(400).end();
  }

  let posts = getPosts(skip, limit);

  posts = posts.filter((item)=> {
    return item.date === date;
  });

  if (posts.length === 0) {
    res.set(`Content-Type`, `text/html`);
    res.status(404).end();
  }

  res.send({
    posts,
    skip,
    limit,
    total: posts.length
  });
});


postsRouter.post(``, upload.single(`url`), (req, res) => {
  res.send(req.body);
});

module.exports = {
  postsRouter
};
