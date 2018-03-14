const {MongoClient} = require(`mongodb`);

const URL_DB = `mongodb://localhost:27017`;
const ERROR_EXIT_CODE = 1;

module.exports = MongoClient.connect(URL_DB).then((client) => client.db(`code-and-magick`)).catch((e) => {
  console.error(`Failed to connect to MongoDB`, e);
  process.exitCode = ERROR_EXIT_CODE;
});
