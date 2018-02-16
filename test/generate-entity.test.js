const assert = require(`assert`);
const generate = require(`../data/generate`);

describe(`#correctly generates data`, () => {
  const data = JSON.parse(generate.generateEntity());

  describe(`should correctly output url`, () => {
    it(`address is url`, () => {
      const objRE = /^((https|http)\:\/\/)/;
      assert.ok(objRE.test(data.url));
    });
  });

  describe(`should correctly output scale`, () => {
    it(`should scale is number`, () => {
      assert.ok(!isNaN(data.scale));
    });

    it(`should the scale value more than 0 but less than 100`, () => {
      assert.ok(data.scale >= 0 && data.scale <= 100);
    });
  });

  describe(`should correctly output effect`, () => {
    it(`should effect is string`, () => {
      assert.ok(typeof data.effect === `string`);
    });

    it(`should effect one of the preset values`, () => {
      const effect = [`none`, `chrome`, `sepia`, `marvin`, `phobos`, `heat`];
      assert.notEqual(effect.indexOf(data.effect), -1);
    });
  });

  describe(`should correctly output hashtags`, () => {
    it(`should hashtags is array`, () => {
      assert.ok(Array.isArray(data.hashtags));
    });

    it(`no more than 5 elements`, () => {
      assert.ok(data.hashtags.length <= 5);
    });

    it(`each line starts with the '#' character`, () => {
      data.hashtags.forEach((hashtag) => {
        assert.ok(hashtag.indexOf(`#`) === 0);
      });
    });

    it(`should contain one word with no spaces`, () => {
      data.hashtags.forEach((hashtag) => {
        assert.ok(hashtag.indexOf(` `) === -1);
      });
    });

    it(`words should not repeated`, () => {
      data.hashtags.forEach((hashtag, index) => {
        const hashtags = data.hashtags.filter((_, i) => i !== index).join(``);
        assert.ok(hashtags.indexOf(hashtag) === -1);
      });
    });

    it(`length of one hashtag does not exceed 20 characters`, () => {
      data.hashtags.forEach((hashtag) => {
        assert.ok(hashtag.length <= 20);
      });
    });
  });

  describe(`should correctly output description`, () => {
    it(`should description is string`, () => {
      assert.ok(typeof data.description === `string`);
    });

    it(`no more than 140 characters`, () => {
      assert.ok(data.description.length <= 140);
    });
  });

  describe(`should correctly output likes`, () => {
    it(`should likes is number`, () => {
      assert.ok(!isNaN(data.likes));
    });

    it(`should the likes value more than 0 but less than 1000`, () => {
      assert.ok(data.scale >= 0 && data.scale <= 1000);
    });
  });

  describe(`should correctly output comments`, () => {
    it(`should comments is array`, () => {
      assert.ok(Array.isArray(data.comments));
    });

    it(`length of one comment does not exceed 140 characters`, () => {
      data.comments.forEach((comment) => {
        assert.ok(comment.length <= 140);
      });
    });
  });
});
