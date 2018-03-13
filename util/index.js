const {Duplex} = require(`stream`);

const checkNumber = (number) => {
  return !isNaN(parseInt(number, 10));
};

const createStreamFromBuffer = (buffer) => {
  const stream = new Duplex();
  stream.push(buffer);
  stream.push(null);
  return stream;
};

const async = (fn) => (req, res, next) => fn(req, res, next).catch(next);

module.exports = {
  checkNumber,
  createStreamFromBuffer,
  async
};
