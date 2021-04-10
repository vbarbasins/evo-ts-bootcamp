export const createRandomNumberArray = (
  maxNumber: number,
  numberCount: number,
): number[] => {
  const array: number[] = [];
  while (array.length < numberCount) {
    array.push(
      Math.floor(Math.random() * maxNumber) + 1,
    );
  }
  return array;
};
