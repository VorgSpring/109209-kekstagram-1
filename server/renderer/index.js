const util = require(`util`);
const {MongoError} = require(`mongodb`);

const CODE = {
  SUCCESS: 200,
  BAD: 400
};

const MONGO_ERROR_MEASSAGE = `Duplicate of an existing record`;

const renderErrorHtml = (errors, backUrl) => {
  // language=HTML
  return `
    <!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8">
      <title>Ошибка в отправленной форме</title>
    </head>
    <body>
      <h1>Отправленная форма неверна:</h1>
      <pre>
      ${util.inspect(errors)}
      </pre>
      <a href="${backUrl}">Назад</a>
    </body>
    </html>`;
};

const renderSuccessHtml = (form, backUrl) => {
  // language=HTML
  return `
    <!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8">
      <title>Успех</title>
    </head>
    <body>
      <h1>Данные формы получены успешно:</h1>
      <pre>
      ${util.inspect(form)}
      </pre>
      <a href="${backUrl}">Назад</a>
    </body>
    </html>`;
};

const render = (req, res, data, success) => {
  const badStatusCode = data.code ? data.code : CODE.BAD;
  res.status(success ? CODE.SUCCESS : badStatusCode);
  switch (req.accepts([`json`, `html`])) {
    case `html`:
      res.set(`Content-Type`, `text/html`);
      const referer = req.header(`Referer`);
      res.send((success ? renderSuccessHtml : renderErrorHtml)(data, referer));
      break;
    default:
      res.json(data);
  }
};

module.exports = {
  renderDataSuccess: (req, res, data) => render(req, res, data, true),
  renderDataError: (req, res, data) => render(req, res, data, false),
  renderException: (req, res, exception) => {
    let data = exception;
    if (exception instanceof MongoError) {
      data = {};
      switch (exception.code) {
        case 11000:
          data.code = 400;
          data.errorMessage = MONGO_ERROR_MEASSAGE;
          break;
        default:
          data.code = 501;
          data.errorMessage = exception.message;
      }
    }
    render(req, res, data, false);
  }
};
