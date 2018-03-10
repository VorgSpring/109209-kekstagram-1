const request = require(`supertest`);
const {app} = require(`../server/index`);

describe(`#POST`, function () {
  it(`should consume JSON`, () => {
    return request(app).post(`/api/posts`).
        send({
          'url': `test/image/test.jpg`,
          'scale': 1,
          'effect': `none`,
          'hashtags': `#css`,
          'description': `Lorem Ipsum is simply dummy text.`,
          'likes': 0,
          'comments': `Lorem Ipsum is simply dummy text.`
        }).
        expect(200, {
          'url': `test/image/test.jpg`,
          'scale': 1,
          'effect': `none`,
          'hashtags': `#css`,
          'description': `Lorem Ipsum is simply dummy text.`,
          'likes': 0,
          'comments': `Lorem Ipsum is simply dummy text.`
        });
  });

  it(`should consume form data`, () => {
    return request(app).post(`/api/posts`).
        field(`url`, `test/image/test.jpg`).
        field(`scale`, `1`).
        field(`effect`, `none`).
        field(`hashtags`, `#css`).
        field(`description`, `Lorem Ipsum is simply dummy text.`).
        field(`likes`, `0`).
        field(`comments`, `Lorem Ipsum is simply dummy text.`).
        expect(200, {
          'url': `test/image/test.jpg`,
          'scale': `1`,
          'effect': `none`,
          'hashtags': `#css`,
          'description': `Lorem Ipsum is simply dummy text.`,
          'likes': `0`,
          'comments': `Lorem Ipsum is simply dummy text.`
        });
  });
});
