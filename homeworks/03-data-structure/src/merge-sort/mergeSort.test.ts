import {
  mergeArrays,
  mergeSort,
  CompareFunction,
} from './mergeSort';

const givenNumberArr = [43, 40, 46, 10, 2, 1, 5, 67];
const givenStringArr = ['a', 'B', 'Array', 'MergeSort', 'This', 'Is', 'Hard'];

const descendingNumberSort: CompareFunction<number> = (a:number, b:number) => {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
};

const ascendingNumberSort: CompareFunction<number> = (a: number, b: number) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const alphabeticalStringSort: CompareFunction<string> = (a: string, b: string) => {
  const stringA = a.toUpperCase();
  const stringB = b.toUpperCase();
  if (stringA < stringB) return -1;
  if (stringA > stringB) return 1;
  return 0;
};
const caseSensitiveStringSort: CompareFunction<string> = (a: string, b: string) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

describe('mergeSort', () => {
  describe('mergeSort', () => {
    describe.each([
      [ascendingNumberSort, givenNumberArr, [1, 2, 5, 10, 40, 43, 46, 67]],
      [descendingNumberSort, givenNumberArr, [67, 46, 43, 40, 10, 5, 2, 1]],
    ])('call with number compare %p', (compareFunction, given, expected) => {
      it(`should return ${expected}`, () => {
        expect(mergeSort(given, compareFunction)).toStrictEqual(expected);
      });
    });
  });

  describe('mergeSort', () => {
    describe.each([
      [alphabeticalStringSort, givenStringArr, ['a', 'Array', 'B', 'Hard', 'Is', 'MergeSort', 'This']],
      [caseSensitiveStringSort, givenStringArr, ['Array', 'B', 'Hard', 'Is', 'MergeSort', 'This', 'a']],
    ])('call with string compare %p', (compareFunction, given, expected) => {
      it(`should return ${expected}`, () => {
        expect(mergeSort(given, compareFunction)).toStrictEqual(expected);
      });
    });
  });

  describe('mergeArrays', () => {
    it('should return array of merged and sorted numbers', () => {
      expect(
        mergeArrays([13, 15], [12, 14], ascendingNumberSort),
      ).toStrictEqual([12, 13, 14, 15]);
    });
  });
});
