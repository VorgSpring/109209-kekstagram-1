/* eslint-disable no-unused-vars*/
const colors = require(`colors`);

const author = require(`./author`);
const description = require(`./description`);
const license = require(`./license`);
const version = require(`./version`);

const commands = [
  author,
  description,
  license,
  version
];

const help = commands.map((command) => `${command.name.gray} — ${command.description.green}`).join(`\n\t`);

module.exports = {
  name: `--help`,
  description: `Shows program help`,
  execute() {
    console.log(
        `Доступные команды:
        ${help}`
    );
  }
};
