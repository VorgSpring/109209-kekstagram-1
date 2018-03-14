const readline = require(`readline`);
const {getData} = require(`../data/get`);
const postsStore = require(`../server/store/postsStore`);
const {checkNumber} = require(`../util/index`);

const QUESTION = `Cколько элементов нужно создать в базе? `;
const ERROR_VALIDATION = `Некорректное число!`;

let rl;

function question() {
  return new Promise((resolve, reject) => {
    rl.question(QUESTION, (count) => {
      if (checkNumber(count)) {
        resolve(count);
      } else {
        reject(ERROR_VALIDATION);
      }
    });
  });
}

module.exports = {
  description: `Заполняет БД данными`,
  name: `--fill`,
  execute() {
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    question()
        .then((res) => {
          const data = getData(res);
          postsStore.save(data);
          rl.close();
        })
        .catch(() => {
          rl.close();
          process.exit(1);
        });
  }
};
