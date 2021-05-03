type SortingDoneResult = {
  newNumbers: number[],
  nextSortingStep: {
    iteration: number,
    currentIndex: number,
  }
}

type SortingStepResult = SortingDoneResult | null

export const makeSortingStep = (
  numbers: number[],
  iteration: number,
  currentIndex: number,
): SortingStepResult => {
  if (iteration < numbers.length) {
    const newNumbers = [...numbers];
    const nextIndex = currentIndex + 1;
    if (numbers[currentIndex] > numbers[nextIndex]) {
      const tmp = newNumbers[currentIndex];
      newNumbers[currentIndex] = newNumbers[nextIndex];
      newNumbers[nextIndex] = tmp;
    }
    const continueIteration = nextIndex < numbers.length - iteration;
    return {
      newNumbers,
      nextSortingStep: {
        iteration: continueIteration ? iteration : iteration + 1,
        currentIndex: continueIteration ? nextIndex : 0,
      },
    };
  }
  return null;
};

export const createRandomNumberArray = (
  maxNumber: number,
  numberCount: number,
): number[] => Array.from(
  { length: numberCount },
  () => Math.floor(Math.random() * maxNumber) + 1,
);
