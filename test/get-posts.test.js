const request = require(`supertest`);
const assert = require(`assert`);

const {app} = require(`../server/index`);

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
            data.posts.forEach((post) => {
              assert(post.date, 1519136255107);
            });
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
    it(`should respond with 404 on bad request`, function () {
      return request(app).get(`/api/pos`).set(`Accept`, `application/json`)
          .expect(404);
    });

    it(`should respond with 400 on bad request parameters`, function () {
      return request(app).get(`/api/posts/blah`).set(`Accept`, `application/json`)
          .expect(400);
    });
  });
});
