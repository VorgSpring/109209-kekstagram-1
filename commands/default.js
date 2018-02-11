const name = Symbol.for(`default`);

module.exports = {
  description: `печатает информацию о приложении`,
  name,
  execute() {
    console.log(
        `Привет пользователь!
      Эта программа будет запускать сервер «Кекстаграм».
      Автор: Кекс.`
    );
  }
};
