const author = require(`./author`);
const description = require(`./description`);
const help = require(`./help`);
const license = require(`./license`);
const version = require(`./version`);
const defaultCommand = require(`./default`);
const server = require(`./server`);

const ERROR_EXIT_CODE = 1;

const commands = new Map(
    [
      author,
      description,
      help,
      license,
      version,
      server,
      defaultCommand
    ].map((command) => (
      [command.name, command.execute]
    ))
);


module.exports = (command = Symbol.for(`default`)) => {
  if (commands.has(command)) {
    commands.get(command)();
  } else {
    help.execute();
    process.exitCode = ERROR_EXIT_CODE;
  }
};
