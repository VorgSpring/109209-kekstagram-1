const db = require(`../../database/index`);
const mongodb = require(`mongodb`);

class ImageStore {
  async get(filename) {
    const bucket = await this._getBucket();
    const results = await (bucket).find({filename}).toArray();
    const entity = results[0];
    if (!entity) {
      return void 0;
    }
    return {info: entity, stream: bucket.openDownloadStreamByName(filename)};
  }

  async save(filename, stream) {
    const bucket = await this._getBucket();
    return new Promise((success, fail) => {
      stream.pipe(bucket.openUploadStream(filename)).on(`error`, fail).on(`finish`, success);
    });
  }

  async _getBucket() {
    if (this._bucket) {
      return this._bucket;
    }
    const dBase = await db;
    if (!this._bucket) {
      this._bucket = new mongodb.GridFSBucket(dBase, {
        chunkSizeBytes: 1024,
        bucketName: `image`
      });
    }
    return this._bucket;
  }
}

module.exports = new ImageStore();
