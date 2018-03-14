const db = require(`../../database/index`);
const logger = require(`../../logger/index`);

const NAME_COLLECTION = `posts`;
const ERROR_FIND = `Failed to set up "${NAME_COLLECTION}"-collection`;

const setupCollection = async () => {
  const dBase = await db;

  const collection = dBase.collection(NAME_COLLECTION);
  collection.createIndex({username: -1}, {unique: true});
  return collection;
};

class PostsStore {
  constructor(collection) {
    this.collection = collection;
  }

  async getPost(date) {
    return (await this.collection).findOne({date});
  }

  async getAllPosts() {
    return (await this.collection).find();
  }

  async save(postData) {
    return (await this.collection).insertOne(postData);
  }

}

module.exports = new PostsStore(setupCollection().catch((e) => logger.error(ERROR_FIND, e)));
