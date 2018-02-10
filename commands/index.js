const author = require(`./author`);
const description = require(`./description`);
const help = require(`./help`);
const license = require(`./license`);
const version = require(`./version`);
const without = require(`./without`);

const commands = [
  author,
  description,
  help,
  license,
  version,
  without
];

module.exports = new Map(commands.map((command) => (
  [command.name, command.execute]
)));
