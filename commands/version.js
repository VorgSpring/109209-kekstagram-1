/* eslint-disable no-unused-vars*/
const colors = require(`colors`);

const packageInfo = require(`../package.json`);

const [major, minor, patch] = packageInfo.version.split(`.`);

module.exports = {
  name: `--version`,
  description: `печатает версию приложения`,
  execute() {
    console.log(`v${colors.red(major)}.${colors.green(minor)}.${colors.blue(patch)}`);
  }
};
