export type CompareFunction<T> = (a: T, b: T) => number;

export type MergeSort = <T>(arr: T[], compare: CompareFunction<T>) => T[];

export type MergeArrays = <T>(aArr: T[], bArr: T[], compare: CompareFunction<T>) => T[];

export const mergeArrays: MergeArrays = (leftArr, rightArr, compare) => {
  const arr = [];

  while (leftArr.length && rightArr.length) {
    if (compare(leftArr[0], rightArr[0]) === -1) {
      arr.push(leftArr.shift()!);
    } else {
      arr.push(rightArr.shift()!);
    }
  }

  return [...arr, ...leftArr, ...rightArr];
};

export const mergeSort: MergeSort = (arr, compare) => {
  if (arr.length < 2) {
    return arr;
  }
  const middle = Math.floor(arr.length / 2);
  const leftArr = arr.slice(0, middle);
  const rightArr = arr.slice(middle, arr.length);
  return mergeArrays(
    mergeSort(leftArr, compare),
    mergeSort(rightArr, compare),
    compare,
  );
};
