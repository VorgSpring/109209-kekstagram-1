const server = require(`../server/index`);

module.exports = {
  name: `--server`,
  description: `запускает сервер`,
  execute() {
    server.run();
  }
};
