const express = require(`express`);
const {postsRouter} = require(`./posts/router`);
const app = express();

app.use(express.static(`static`));

app.use(`/api/posts`, postsRouter);

const HOSTNAME = `127.0.0.1`;
const PORT = process.argv[3] || 3000;

const serverAddress = `http://${HOSTNAME}:${PORT}`;

module.exports = {
  run() {
    app.listen(PORT, HOSTNAME, () => {
      console.log(`Server running at ${serverAddress}/`);
    });
  },
  app
};
