const readline = require(`readline`);
const promisify = require(`util`).promisify;
const fs = require(`fs`);
const access = promisify(fs.access);
const path = require(`path`);
const name = Symbol.for(`default`);
const createDataFile = require(`../data/create`).createDataFile;

let state;
let rl;
const fileName = `data.json`;

const QUESTION = {
  DEFAULT: {
    TYPE: `question-default`,
    STRING: `Cгенерировать данные?(y/n) `
  },
  COUNT: {
    TYPE: `question-count`,
    STRING: `Сколько элементов нужно создать? `
  },
  PATH: {
    TYPE: `question-path`,
    STRING: `Укажи путь до файла: `
  },
  REWRITE: {
    TYPE: `question-rewrite`,
    STRING: `Файл уже существует, нужно ли его перезаписать?(y/n) `
  }
};

const ANSWER = {
  YES: `y`,
  NO: `n`
};

const ERROR = {
  COUNT: `Необходимо ввести число!`,
  PATH: `Такого пути не существует!`,
  OTHER: `Некорректный ответ!`
};

const INFO = {
  WAITING: `Подождите...`,
  DATA_CREATE: `Данные сгенерированы!`
};

const checkNumber = (number) => {
  return !isNaN(parseInt(number, 10));
};

const reducer = async (question, answer) => {
  switch (question) {
    case QUESTION.DEFAULT.TYPE:
      switch (answer) {
        case ANSWER.YES:
          state.question = QUESTION.COUNT;
          break;

        case ANSWER.NO:
          state = null;
          break;

        default:
          console.log(ERROR.OTHER);
      }
      break;

    case QUESTION.COUNT.TYPE:
      if (checkNumber(answer)) {
        state.question = QUESTION.PATH;
        state.dataCount = answer;
      } else {
        console.log(ERROR.COUNT);
      }
      break;

    case QUESTION.PATH.TYPE:
      state.path = path.join(answer, fileName);
      try {
        await access(state.path, fs.constants.W_OK);
        state.question = QUESTION.REWRITE;
      } catch (e) {
        console.log(INFO.WAITING);
        await createDataFile(state.dataCount, state.path);
        console.log(INFO.DATA_CREATE);
        state = null;
      }
      break;

    case QUESTION.REWRITE.TYPE:
      switch (answer) {
        case ANSWER.YES:
          console.log(INFO.WAITING);
          await createDataFile(state.dataCount, state.path);
          console.log(INFO.DATA_CREATE);
          state = null;
          break;

        case ANSWER.NO:
          state = null;
          break;

        default:
          console.log(ERROR.OTHER);
      }
      break;
  }
  askToQuestion();
};

const initialState = {
  question: QUESTION.DEFAULT,
  path: ``,
  dataCount: 0,
};

const askToQuestion = () => {
  if (state !== null) {
    rl.question(state.question.STRING, (answer) => {
      reducer(state.question.TYPE, answer);
    });
  } else {
    rl.close();
  }
};


module.exports = {
  description: `Создает файл с данными`,
  name,
  execute() {
    state = {...initialState};

    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    console.log(`Привет!`);
    askToQuestion();
  }
};
