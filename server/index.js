const express = require(`express`);
const imageStore = require(`./store/imageStore`);
const postsStore = require(`./store/postsStore`);
const logger = require(`../logger/index`);
const postsRouter = require(`./posts/router`)(postsStore, imageStore);
const app = express();

app.use(express.static(`static`));
app.use(`/api/posts`, postsRouter);

const HOSTNAME = process.env.SERVER_HOST || `127.0.0.1`;
const PORT = process.env.SERVER_PORT || 3000;
const SERVER_INFO_MESSAGE = `Server running at http://${HOSTNAME}:${PORT}/`;

module.exports = {
  run() {
    app.listen(PORT, HOSTNAME, () => {
      logger.info(SERVER_INFO_MESSAGE);
    });
  },
  app
};
