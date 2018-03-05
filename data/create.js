const promisify = require(`util`).promisify;
const fs = require(`fs`);

const generateEntity = require(`./generate`).generateEntity;
const writeFile = promisify(fs.writeFile);
const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};


const createDataFile = async (elementsCount, filePath) => {
  let data = [];
  for (let i = 0; i < elementsCount; i++) {
    data.push(generateEntity());
  }

  try {
    await writeFile(filePath, JSON.stringify(data), fileWriteOptions);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  createDataFile
};
