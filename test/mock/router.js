const createPostsRouter = require(`../../server/posts/router`);
const {getData} = require(`../../data/get`);

const posts = getData(10);

class Cursor {
  constructor(data) {
    this.data = data;
  }

  skip(count) {
    return new Cursor(this.data.slice(count));
  }

  limit(count) {
    return new Cursor(this.data.slice(0, count));
  }

  async count() {
    return this.data.length;
  }

  async toArray() {
    return this.data;
  }
}

class MockPostsStore {
  constructor() {
  }

  async getPost(date) {
    return posts.find((post) => post.date === date);
  }

  async getAllPosts() {
    return new Cursor(posts).toArray();
  }

  async save() {
  }

}

class MockImageStore {

  async getBucket() {
  }

  async get() {
  }

  async save() {
  }

}

module.exports = createPostsRouter(new MockPostsStore(), new MockImageStore());
