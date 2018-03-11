const request = require(`supertest`);
const assert = require(`assert`);
const {app} = require(`../server/index`);
const {ERROR_MESSAGE} = require(`../server/posts/errors`);
const {getValidationError} = require(`../server/error/index`);

describe(`#POST`, function () {
  describe(`#correct request`, () => {
    it(`should consume JSON`, () => {
      return request(app).post(`/api/posts`).
          send({
            'image': {mimetype: `image/jpeg`},
            'scale': 1,
            'effect': `none`,
            'hashtags': [`#css`],
            'description': `Lorem Ipsum is simply dummy text.`,
            'likes': 0,
            'comments': `Lorem Ipsum is simply dummy text.`
          }).
          expect(200);
    });

    it(`should consume form data`, () => {
      return request(app).post(`/api/posts`).
          attach(`image`, `test/image/test.jpg`).
          field(`scale`, `1`).
          field(`effect`, `none`).
          field(`hashtags[0]`, `#css`).
          field(`description`, `Lorem Ipsum is simply dummy text.`).
          field(`likes`, `0`).
          field(`comments`, `Lorem Ipsum is simply dummy text.`).
          expect(200);
    });
  });

  describe(`#bad request`, () => {
    describe(`#image`, () => {
      describe(`#JSON`, () => {
        it(`should respond with 400 on invalid image from JSON`, () => {
          return request(app).post(`/api/posts`)
              .send({
                'image': {mimetype: `text/html`},
                'scale': 1,
                'effect': `none`
              })
              .expect(400)
              .expect(`Content-Type`, /json/)
              .then((response) => {
                assert.deepEqual(response.body, getValidationError([ERROR_MESSAGE.IMAGE]));
              });
        });

        it(`should respond with 400 on empty image from JSON`, () => {
          return request(app).post(`/api/posts`)
              .send({
                'image': ``,
                'scale': 1,
                'effect': `none`
              })
              .expect(400)
              .expect(`Content-Type`, /json/)
              .then((response) => {
                assert.deepEqual(response.body, getValidationError([ERROR_MESSAGE.EMPTY.IMAGE]));
              });
        });
      });

      describe(`#form data`, () => {
        it(`should respond with 400 on invalid image from form data`, () => {
          return request(app).post(`/api/posts`)
              .attach(`image`, `test/files/test.txt`)
              .field(`scale`, `1`)
              .field(`effect`, `none`)
              .expect(400)
              .expect(`Content-Type`, /json/)
              .then((response) => {
                assert.deepEqual(response.body, getValidationError([ERROR_MESSAGE.IMAGE]));
              });
        });

        it(`should respond with 400 on empty image from form data`, () => {
          return request(app).post(`/api/posts`)
              .attach(`image`, ``)
              .field(`scale`, `1`)
              .field(`effect`, `none`)
              .expect(400)
              .expect(`Content-Type`, /json/)
              .then((response) => {
                assert.deepEqual(response.body, getValidationError([ERROR_MESSAGE.EMPTY.IMAGE]));
              });
        });
      });
    });

    describe(`#scale`, () => {
      describe(`#JSON`, () => {
        it(`should respond with 400 on invalid field from JSON`, () => {
          return request(app).post(`/api/posts`)
              .send({
                'image': {mimetype: `image/jpeg`},
                'scale': `blah`,
                'effect': `none`
              })
              .expect(400)
              .expect(`Content-Type`, /json/)
              .then((response) => {
                assert.deepEqual(response.body, getValidationError([ERROR_MESSAGE.SCALE]));
              });
        });

        it(`should respond with 400 on empty field from JSON`, () => {
          return request(app).post(`/api/posts`)
              .send({
                'image': {mimetype: `image/jpeg`},
                'scale': ``,
                'effect': `none`
              })
              .expect(400)
              .expect(`Content-Type`, /json/)
              .then((response) => {
                assert.deepEqual(response.body, getValidationError([ERROR_MESSAGE.EMPTY.SCALE]));
              });
        });
      });

      describe(`#form data`, () => {
        it(`should respond with 400 on invalid field from form data`, () => {
          return request(app).post(`/api/posts`)
              .attach(`image`, `test/image/test.jpg`)
              .field(`scale`, `blah`)
              .field(`effect`, `none`)
              .expect(400)
              .expect(`Content-Type`, /json/)
              .then((response) => {
                assert.deepEqual(response.body, getValidationError([ERROR_MESSAGE.SCALE]));
              });
        });

        it(`should respond with 400 on empty field from form data`, () => {
          return request(app).post(`/api/posts`)
              .attach(`image`, `test/image/test.jpg`)
              .field(`scale`, ``)
              .field(`effect`, `none`)
              .expect(400)
              .expect(`Content-Type`, /json/)
              .then((response) => {
                assert.deepEqual(response.body, getValidationError([ERROR_MESSAGE.EMPTY.SCALE]));
              });
        });
      });
    });

    describe(`#effect`, () => {
      describe(`#JSON`, () => {
        it(`should respond with 400 on invalid field from JSON`, () => {
          return request(app).post(`/api/posts`)
              .send({
                'image': {mimetype: `image/jpeg`},
                'scale': `1`,
                'effect': `blah`
              })
              .expect(400)
              .expect(`Content-Type`, /json/)
              .then((response) => {
                assert.deepEqual(response.body, getValidationError([ERROR_MESSAGE.EFFECT]));
              });
        });

        it(`should respond with 400 on empty field from JSON`, () => {
          return request(app).post(`/api/posts`)
              .send({
                'image': {mimetype: `image/jpeg`},
                'scale': `1`,
                'effect': ``
              })
              .expect(400)
              .expect(`Content-Type`, /json/)
              .then((response) => {
                assert.deepEqual(response.body, getValidationError([ERROR_MESSAGE.EMPTY.EFFECT]));
              });
        });
      });

      describe(`#form data`, () => {
        it(`should respond with 400 on invalid field from form data`, () => {
          return request(app).post(`/api/posts`)
              .attach(`image`, `test/image/test.jpg`)
              .field(`scale`, `1`)
              .field(`effect`, `blah`)
              .expect(400)
              .expect(`Content-Type`, /json/)
              .then((response) => {
                assert.deepEqual(response.body, getValidationError([ERROR_MESSAGE.EFFECT]));
              });
        });

        it(`should respond with 400 on empty field from form data`, () => {
          return request(app).post(`/api/posts`)
              .attach(`image`, `test/image/test.jpg`)
              .field(`scale`, `1`)
              .field(`effect`, ``)
              .expect(400)
              .expect(`Content-Type`, /json/)
              .then((response) => {
                assert.deepEqual(response.body, getValidationError([ERROR_MESSAGE.EMPTY.EFFECT]));
              });
        });
      });
    });

    describe(`#hashtags`, () => {
      describe(`#JSON`, () => {
        it(`should respond with 400 on invalid field from JSON`, () => {
          return request(app).post(`/api/posts`)
              .send({
                'image': {mimetype: `image/jpeg`},
                'scale': `1`,
                'effect': `none`,
                'hashtags': `blah`
              })
              .expect(400)
              .expect(`Content-Type`, /json/)
              .then((response) => {
                assert.deepEqual(response.body, getValidationError([ERROR_MESSAGE.HASHTAGS]));
              });
        });
      });

      describe(`#form data`, () => {
        it(`should respond with 400 on invalid field from form data`, () => {
          return request(app).post(`/api/posts`)
              .attach(`image`, `test/image/test.jpg`)
              .field(`scale`, `1`)
              .field(`effect`, `none`)
              .field(`hashtags`, `blah`)
              .expect(400)
              .expect(`Content-Type`, /json/)
              .then((response) => {
                assert.deepEqual(response.body, getValidationError([ERROR_MESSAGE.HASHTAGS]));
              });
        });
      });
    });

    describe(`#description`, () => {
      describe(`#JSON`, () => {
        it(`should respond with 400 on invalid field from JSON`, () => {
          return request(app).post(`/api/posts`)
              .send({
                'image': {mimetype: `image/jpeg`},
                'scale': `1`,
                'effect': `none`,
                'description': `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet orci porttitor, pellentesque nisl vel, auctor mauris. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam amet.`
              })
              .expect(400)
              .expect(`Content-Type`, /json/)
              .then((response) => {
                assert.deepEqual(response.body, getValidationError([ERROR_MESSAGE.DESCRIPTION]));
              });
        });
      });

      describe(`#form data`, () => {
        it(`should respond with 400 on invalid field from form data`, () => {
          return request(app).post(`/api/posts`)
              .attach(`image`, `test/image/test.jpg`)
              .field(`scale`, `1`)
              .field(`effect`, `none`)
              .field(`description`, `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet orci porttitor, pellentesque nisl vel, auctor mauris. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam amet.`)
              .expect(400)
              .expect(`Content-Type`, /json/)
              .then((response) => {
                assert.deepEqual(response.body, getValidationError([ERROR_MESSAGE.DESCRIPTION]));
              });
        });
      });
    });
  });
});
