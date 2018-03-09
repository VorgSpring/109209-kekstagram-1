const {generateEntity} = require(`./generate`);

const getData = (count) => {
  let data = [];
  for (let i = 0; i < count; i++) {
    data.push(generateEntity());
  }
  return data;
};

module.exports = {
  getData
};
