const express = require(`express`);
const imageStore = require(`./store/image`);
const postsStore = require(`./store/posts`);
const postsRouter = require(`./posts/router`)(postsStore, imageStore);
const app = express();

app.use(express.static(`static`));
app.use(`/api/posts`, postsRouter);

const HOSTNAME = `127.0.0.1`;
const PORT = process.argv[3] || 3000;
const SERVER_INFO_MESSAGE = `Server running at http://${HOSTNAME}:${PORT}/`;

module.exports = {
  run() {
    app.listen(PORT, HOSTNAME, () => {
      console.log(SERVER_INFO_MESSAGE);
    });
  },
  app
};
