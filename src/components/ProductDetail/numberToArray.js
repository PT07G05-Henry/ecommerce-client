export const ratingArray = (rating) => {
  if (rating === 0) {
    return [];
  }
  let arrayFill = [];
  for (let i = 0; i < rating; i++) {
    arrayFill.push(i + 1);
  }
  return arrayFill;
};

export const ratingArrayEmpty = (rating) => {
  if (rating === 0) {
    return [0];
  }
  if (rating === 5) {
    return [];
  }
  let arrayEmpty = []; //3 -> 2
  for (let i = 0; i < 5 - rating; i++) {
    arrayEmpty.push(i + 1);
  }
  return arrayEmpty;
};



