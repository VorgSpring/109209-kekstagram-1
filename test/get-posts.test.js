const request = require(`supertest`);
const assert = require(`assert`);
const {ERROR_MESSAGE} = require(`../server/posts/errors`);
const {getValidationError, getNotFoundError} = require(`../server/error/index`);
const mockPostsRouter = require(`./mock/router`);
const app = require(`express`)();

app.use(`/api/posts`, mockPostsRouter);


describe(`#GET`, function () {
  describe(`#correct request`, () => {
    it(`should respond without request parameters`, function () {
      return request(app).get(`/api/posts`).set(`Accept`, `application/json`)
          .expect(200)
          .expect(`Content-Type`, /json/)
          .then((response) => {
            const data = response.body;
            assert(data.total, 20);
          });
    });

    it(`should respond with request parameters`, function () {
      return request(app).get(`/api/posts/1519136255107`).set(`Accept`, `application/json`)
          .expect(200)
          .expect(`Content-Type`, /json/)
          .then((response) => {
            const data = response.body;
            assert(data.post.date, 1519136255107);
          });
    });

    it(`should respond with query parameters`, function () {
      return request(app).get(`/api/posts/?skip=1&limit=4`).set(`Accept`, `application/json`)
          .expect(200)
          .expect(`Content-Type`, /json/)
          .then((response) => {
            const data = response.body;
            assert(data.total, 3);
          });
    });
  });

  describe(`#bad request`, () => {
    it(`should respond with 404 on empty response`, function () {
      return request(app).get(`/api/posts/23`).set(`Accept`, `application/json`)
          .expect(404)
          .expect(`Content-Type`, /json/)
          .then((response) => {
            assert.deepEqual(response.body, getNotFoundError(ERROR_MESSAGE.NOT_FOUND));
          });
    });

    it(`should respond with 400 on bad request parameters`, function () {
      return request(app).get(`/api/posts/blah`).set(`Accept`, `application/json`)
          .expect(400)
          .expect(`Content-Type`, /json/)
          .then((response) => {
            assert.deepEqual(response.body, getValidationError([ERROR_MESSAGE.PARAM]));
          });
    });

    it(`should respond with 400 on bad skip query parameter`, function () {
      return request(app).get(`/api/posts/?skip=blah`).set(`Accept`, `application/json`)
          .expect(400)
          .expect(`Content-Type`, /json/)
          .then((response) => {
            assert.deepEqual(response.body, getValidationError([ERROR_MESSAGE.QUERY.SKIP]));
          });
    });

    it(`should respond with 400 on bad limit query parameter`, function () {
      return request(app).get(`/api/posts/?limit=blah`).set(`Accept`, `application/json`)
          .expect(400)
          .expect(`Content-Type`, /json/)
          .then((response) => {
            assert.deepEqual(response.body, getValidationError([ERROR_MESSAGE.QUERY.LIMIT]));
          });
    });
  });
});
