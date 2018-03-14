const name = Symbol.for(`default`);

module.exports = {
  description: `предоставляет интерактивный ввод`,
  name,
  execute() {
    console.log(
        `Привет пользователь!
        Эта программа будет запускать сервер «Кекстаграм»\n.
        наберите "--help"`
    );
  }
};
