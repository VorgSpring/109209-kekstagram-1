const request = require(`supertest`);
const assert = require(`assert`);
const {ERROR_MESSAGE} = require(`../server/posts/errors`);
const {getValidationError} = require(`../server/error/index`);
const mockPostsRouter = require(`./mock/router`);
const app = require(`express`)();

app.use(`/api/posts`, mockPostsRouter);

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
    describe(`#JSON`, () => {
      it(`should respond with 400 on invalid from JSON`, () => {
        return request(app).post(`/api/posts`)
            .send({
              'image': {mimetype: `text/html`},
              'scale': `blah`,
              'effect': `blah`,
              'hashtags': `blah`,
              'description': `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet orci porttitor, pellentesque nisl vel, auctor mauris. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam amet.`
            })
            .expect(400)
            .expect(`Content-Type`, /json/)
            .then((response) => {
              assert.deepEqual(response.body, getValidationError([
                ERROR_MESSAGE.IMAGE,
                ERROR_MESSAGE.SCALE,
                ERROR_MESSAGE.EFFECT,
                ERROR_MESSAGE.HASHTAGS,
                ERROR_MESSAGE.DESCRIPTION
              ]));
            });
      });

      it(`should respond with 400 on empty from JSON`, () => {
        return request(app).post(`/api/posts`)
            .send({
              'image': ``,
              'scale': ``,
              'effect': ``
            })
            .expect(400)
            .expect(`Content-Type`, /json/)
            .then((response) => {
              assert.deepEqual(response.body, getValidationError([
                ERROR_MESSAGE.EMPTY.IMAGE,
                ERROR_MESSAGE.EMPTY.SCALE,
                ERROR_MESSAGE.EMPTY.EFFECT
              ]));
            });
      });
    });

    describe(`#form data`, () => {
      it(`should respond with 400 on invalid from form data`, () => {
        return request(app).post(`/api/posts`)
            .attach(`image`, `test/files/test.txt`)
            .field(`scale`, `blah`)
            .field(`effect`, `blah`)
            .field(`hashtags`, `blah`)
            .field(`description`, `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet orci porttitor, pellentesque nisl vel, auctor mauris. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam amet.`)
            .expect(400)
            .expect(`Content-Type`, /json/)
            .then((response) => {
              assert.deepEqual(response.body, getValidationError([
                ERROR_MESSAGE.SCALE,
                ERROR_MESSAGE.EFFECT,
                ERROR_MESSAGE.HASHTAGS,
                ERROR_MESSAGE.DESCRIPTION,
                ERROR_MESSAGE.IMAGE
              ]));
            });
      });

      it(`should respond with 400 on empty from form data`, () => {
        return request(app).post(`/api/posts`)
            .attach(`image`, ``)
            .field(`scale`, ``)
            .field(`effect`, ``)
            .expect(400)
            .expect(`Content-Type`, /json/)
            .then((response) => {
              assert.deepEqual(response.body, getValidationError([
                ERROR_MESSAGE.EMPTY.IMAGE,
                ERROR_MESSAGE.EMPTY.SCALE,
                ERROR_MESSAGE.EMPTY.EFFECT
              ]));
            });
      });
    });
  });
});
