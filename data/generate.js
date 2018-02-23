const {getRandomNumber, getRandomArray} = require(`./util`);

const effects = [`none`, `chrome`, `sepia`, `marvin`, `phobos`, `heat`];
const hastags = [`#html`, `#css`, `#js`, `#node`, `#mocha`, `#blah`];
const comments = [
  `Lorem Ipsum.`,
  `Lorem Ipsum is simply dummy text.`,
  `Lorem Ipsum is simply dummy text of the printing.`,
  `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
  `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
  `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown.`
];

const MAX_VALUE_FOR = {
  IMAGES_REQUIRES: 200,
  SCALE: 100,
  HASHTAGS: 5,
  COMMENTS: 5,
  LIKES: 1000
};

function generateEntity() {
  const data = {
    'url': `https://picsum.photos/600/?${getRandomNumber(MAX_VALUE_FOR.IMAGES_REQUIRES)}`,
    'scale': getRandomNumber(MAX_VALUE_FOR.SCALE),
    'effect': effects[getRandomNumber(effects.length)],
    'hashtags': getRandomArray(hastags, MAX_VALUE_FOR.HASHTAGS),
    'description': `Lorem Ipsum is simply dummy text.`,
    'likes': getRandomNumber(MAX_VALUE_FOR.LIKES),
    'comments': getRandomArray(comments, MAX_VALUE_FOR.COMMENTS)
  };

  return JSON.stringify(data);
}

module.exports = {
  generateEntity
};
