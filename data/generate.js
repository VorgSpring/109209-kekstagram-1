const generateEntity = () => {
  const data = {
    url: `https://picsum.photos/600/?random`,
    scale: 55,
    effect: `chrome`,
    hashtags: [
      `#html`, `#css`, `#js`, `#node`, `#mocha`
    ],
    description: `html academy`,
    likes: 555,
    comments: [
      `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
      `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown`
    ]
  };

  return JSON.stringify(data);
};

module.exports = {
  generateEntity
};
