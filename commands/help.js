const colors = require(`colors`);

const author = require(`./author`);
const description = require(`./description`);
const license = require(`./license`);
const version = require(`./version`);
const server = require(`./server`);

const commands = [
  author,
  description,
  license,
  version,
  server
];

const help = commands.map((command) => `${colors.gray(command.name)} — ${colors.green(command.description)}`).join(`\n\t`);

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
