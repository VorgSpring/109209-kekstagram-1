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

const help = commands.map(command => `${command.name} — ${command.description}`).join('\n\t')


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
