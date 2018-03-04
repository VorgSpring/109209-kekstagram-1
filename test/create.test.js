const assert = require(`assert`);
const createDataFile = require(`../data/create`).createDataFile;
const promisify = require(`util`).promisify;
const fs = require(`fs`);
const path = require(`path`);

const readFilePromise = promisify(fs.readFile);
const unlinkPromise = promisify(fs.unlink);

describe(`#correctly create and rewrite data file`, () => {
  const dirPath = `data`;
  const dataCount = 2;
  const fileName = `data.json`;
  const filePath = path.join(dirPath, fileName);
  let data;

  before(async () => {
    await createDataFile(dataCount, filePath);
    data = JSON.parse(await readFilePromise(filePath));
  });

  after(async () => {
    await unlinkPromise(filePath);
  });

  it(`should write data to file`, () => {
    assert.equal(data.length, dataCount);
  });

  it(`should rewrite data to file`, async () => {
    assert.equal(data.length, dataCount);
    const newCount = 4;
    await createDataFile(newCount, filePath);
    data = JSON.parse(await readFilePromise(filePath));
    assert.equal(data.length, newCount);
  });
});
