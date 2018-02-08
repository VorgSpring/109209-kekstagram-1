const userCommand = process.argv[2]

const COMMAND = {
  HELP: '--help',
  VERSION: '--version',
  WITHOUT: undefined
}

const ERROR_EXIT_CODE = 1

switch(userCommand) {
  case COMMAND.HELP:
    console.log (
      `Доступные команды:
      --help    — печатает этот текст;
      --version — печатает версию приложения;`
    )
    break

  case COMMAND.VERSION:
    console.log(`v0.0.1`)
    break

  case COMMAND.WITHOUT:
    console.log(
      `Привет пользователь!
      Эта программа будет запускать сервер «Кекстаграм».
      Автор: Кекс.`
    )
    break

  default:
    console.error(
      `Неизвестная команда ${userCommand}.
      Чтобы прочитать правила использования приложения, наберите "--help"`
    )
    process.exitCode = ERROR_EXIT_CODE
}
