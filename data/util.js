const getRandomNumber = (max) => {
  return Math.floor(Math.random() * max);
};

const getRandomArray = (sourceArray, length) => {
  const result = [];
  let array = [...sourceArray];

  while (result.length !== length) {
    let index = getRandomNumber(array.length);
    result.push(array[index]);
    array.splice(index, 1);
  }

  return result;
};


module.exports = {
  getRandomArray,
  getRandomNumber
};
