const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const {getData} = require(`../../data/get`);

const postsRouter = new Router();
postsRouter.use(bodyParser.json());

const upload = multer({storage: multer.memoryStorage()});

const getPosts = (skip = 0, limit = 20) => {
  const data = getData(limit);
  return data.slice(skip, skip + limit);
};

postsRouter.get(``, (req, res) => {
  const {skip, limit} = req.query;
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
    res.status(400).end();
  }

  const {skip, limit} = req.query;

  let posts = getPosts(skip, limit);

  posts = posts.filter((item)=> {
    return item.date === date;
  });

  if (posts.length === 0) {
    res.status(404).end();
  }

  res.send({
    posts,
    skip,
    limit,
    total: posts.length
  });
});

const appUpload = upload.fields([{name: `avatar`, maxCount: 1}, {name: `photos`, maxCount: 3}]);

postsRouter.post(``, appUpload, (req, res) => {
  res.send(req.body);
});

module.exports = {
  postsRouter
};
