const promisify = require(`util`).promisify;
const fs = require(`fs`);

const {getData} = require(`./get`);
const writeFile = promisify(fs.writeFile);
const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};

const createDataFile = async (elementsCount, filePath) => {
  let data = getData(elementsCount);

  try {
    await writeFile(filePath, JSON.stringify(data), fileWriteOptions);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  createDataFile
};
