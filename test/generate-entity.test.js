const assert = require(`assert`);
const generate = require(`../data/generate`);

describe(`#correctly generates data`, () => {
  const data = JSON.parse(generate.generateEntity());

  describe(`#url`, () => {
    it(`should be address is url`, () => {
      const objRE = /^((https|http)\:\/\/)/;
      assert.ok(objRE.test(data.url));
    });
  });

  describe(`#scale`, () => {
    it(`should be scale is number`, () => {
      assert.ok(!isNaN(data.scale));
    });

    it(`should have scale value more than 0 but less than 100`, () => {
      assert.ok(data.scale >= 0 && data.scale <= 100);
    });
  });

  describe(`#effect`, () => {
    it(`should be effect is string`, () => {
      assert.ok(typeof data.effect === `string`);
    });

    it(`should have effect one of the preset values`, () => {
      const effect = [`none`, `chrome`, `sepia`, `marvin`, `phobos`, `heat`];
      assert.notEqual(effect.indexOf(data.effect), -1);
    });
  });

  describe(`#hashtags`, () => {
    it(`should be hashtags is array`, () => {
      assert.ok(Array.isArray(data.hashtags));
    });

    it(`should have in hashtags no more than 5 elements`, () => {
      assert.ok(data.hashtags.length <= 5);
    });

    it(`should have each line starts with the '#' character`, () => {
      data.hashtags.forEach((hashtag) => {
        assert.ok(hashtag.indexOf(`#`) === 0);
      });
    });

    it(`should have contain one word with no spaces`, () => {
      data.hashtags.forEach((hashtag) => {
        assert.ok(hashtag.indexOf(` `) === -1);
      });
    });

    it(`should have words not repeated`, () => {
      data.hashtags.forEach((hashtag, index) => {
        const hashtags = data.hashtags.filter((item, i) => {
          return i !== index && item === hashtag;
        });
        assert.ok(hashtags.length === 0);
      });
    });

    it(`should have length of one hashtag does not exceed 20 characters`, () => {
      data.hashtags.forEach((hashtag) => {
        assert.ok(hashtag.length <= 20);
      });
    });
  });

  describe(`#description`, () => {
    it(`should be description is string`, () => {
      assert.ok(typeof data.description === `string`);
    });

    it(`should have no more than 140 characters`, () => {
      assert.ok(data.description.length <= 140);
    });
  });

  describe(`#likes`, () => {
    it(`should be likes is number`, () => {
      assert.ok(!isNaN(data.likes));
    });

    it(`should have likes value more than 0 but less than 1000`, () => {
      assert.ok(data.scale >= 0 && data.scale <= 1000);
    });
  });

  describe(`#comments`, () => {
    it(`should be comments is array`, () => {
      assert.ok(Array.isArray(data.comments));
    });

    it(`should have length of one comment does not exceed 140 characters`, () => {
      data.comments.forEach((comment) => {
        assert.ok(comment.length <= 140);
      });
    });
  });
});
