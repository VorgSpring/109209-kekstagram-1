const commands = require(`./commands/index`);
const userCommand = process.argv[2] || Symbol.for(undefined);

const ERROR_EXIT_CODE = 1;

if (commands.has(userCommand)) {
  commands.get(userCommand)();
} else {
  console.error(
      `Неизвестная команда ${userCommand}.
    Чтобы прочитать правила использования приложения, наберите "--help"`
  );
  process.exitCode = ERROR_EXIT_CODE;
}
