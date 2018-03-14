const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const check = require(`./check`);
const {notFoundError, validationError} = require(`../error/index`);
const {ERROR_MESSAGE} = require(`./errors`);
const {createStreamFromBuffer, async} = require(`../../util/index`);

const postsRouter = new Router();
postsRouter.use(bodyParser.json());

const upload = multer({storage: multer.memoryStorage()});

const getPosts = async (cursor, skip = 0, limit = 50) => {
  return {
    posts: await (cursor.skip(skip).limit(limit).toArray()),
    skip,
    limit,
    total: await cursor.count()
  };
};

postsRouter.get(``, async(async (req, res) => {
  const errors = check.get(req);
  if (errors.length !== 0) {
    return validationError(res, errors);
  }

  const {skip, limit} = req.query;

  return res.send(
      await getPosts(await postsRouter.postsStore.getAllPosts(), skip, limit)
  );
}));

postsRouter.get(`/:date`, async(async (req, res) => {
  const errors = check.get(req);
  if (errors.length !== 0) {
    return validationError(res, errors);
  }

  const date = parseInt(req.params.date, 10);
  let post = await postsRouter.postsStore.getPost(date);

  if (!post) {
    return notFoundError(res, ERROR_MESSAGE.NOT_FOUND);
  }

  return res.send({post});
}));

postsRouter.get(`/:date/image`, async(async (req, res) => {
  const errors = check.get(req);
  if (errors.length !== 0) {
    return validationError(res, errors);
  }

  const date = parseInt(req.params.date, 10);
  let post = await postsRouter.postsStore.getPost(date);

  if (!post) {
    return notFoundError(res, ERROR_MESSAGE.NOT_FOUND);
  }

  const image = post.image;

  if (!image) {
    return notFoundError(res, ERROR_MESSAGE.NOT_FOUND);
  }

  const {info, stream} = await postsRouter.imageStore.get(image.path);

  if (!info) {
    return notFoundError(res, ERROR_MESSAGE.NOT_FOUND);
  }

  res.set(`content-type`, image.mimetype);
  res.set(`content-length`, info.length);
  res.status(200);
  return stream.pipe(res);
}));

postsRouter.post(``, upload.single(`image`), async(async (req, res) => {
  const data = req.body;
  const image = req.file;
  if (image) {
    data.image = image;
  }

  const errors = check.post(data);
  if (errors.length !== 0) {
    return validationError(res, errors);
  }

  data.date = Date.now().valueOf();

  if (image) {
    const imageInfo = {
      path: `/api/posts/${data.date}/image`,
      mimetype: image.mimetype
    };
    await postsRouter.imageStore.save(imageInfo.path, createStreamFromBuffer(image.buffer));
    data.image = imageInfo;
  }

  await postsRouter.postsStore.save(data);
  return res.send(data);
}));

module.exports = (postsStore, imageStore) => {
  postsRouter.postsStore = postsStore;
  postsRouter.imageStore = imageStore;
  return postsRouter;
};
