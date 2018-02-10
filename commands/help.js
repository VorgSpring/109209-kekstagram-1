module.exports = {
  name: `--help`,
  description: `Shows program help`,
  execute() {
    console.log(
        `Доступные команды:
      --help         — печатает этот текст;
      --version      — печатает версию приложения;
      --author       — печатает автора приложения;
      --description  — печатает описание приложения;
      --license      — печатает информацию о лицензии;`
    );
  }
};
