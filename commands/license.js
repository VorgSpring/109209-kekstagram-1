/* eslint-disable no-unused-vars*/
const colors = require(`colors`);

const packageInfo = require(`../package.json`);

module.exports = {
  name: `--license`,
  description: `печатает информацию о лицензии`,
  execute() {
    console.log(`лицензия: ${packageInfo.author.yellow}`);
  }
};
