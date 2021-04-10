import React from 'react';
import './App.css';

import { BarSet } from './components/BarSet';

import { createRandomNumberArray } from './utils/appUtils';

const MAX_NUMBER = 100;
const NUMBER_COUNT = 40;
const SORT_TIMEOUT = 75;

interface AppProps {}

interface AppState {
  sorting: boolean,
  sortingState: {
    iteration: number,
    currentIndex: number,
  },
  numbers: number[],
  solved: boolean,
}

class App extends React.Component<{}, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      sorting: false,
      sortingState: { iteration: 0, currentIndex: 0 },
      numbers: createRandomNumberArray(MAX_NUMBER, NUMBER_COUNT),
      solved: false,
    };
  }

  componentDidUpdate(): void {
    const { sorting } = this.state;
    if (sorting) setTimeout(this.sortNumbers, SORT_TIMEOUT);
  }

  newSetHandler = (): void => {
    this.setState({
      sorting: false,
      sortingState: { iteration: 0, currentIndex: 0 },
      numbers: createRandomNumberArray(MAX_NUMBER, NUMBER_COUNT),
      solved: false,
    });
  }

  progressHandler = (): void => {
    const { sorting } = this.state;
    this.setState((prevState) => ({ ...prevState, sorting: !sorting }));
  }

  sortNumbers = (): void => {
    const { numbers, sortingState } = this.state;
    const { iteration, currentIndex } = sortingState;
    if (iteration < numbers.length) {
      const newNumbers = [...numbers];
      const nextIndex = currentIndex + 1;
      if (numbers[currentIndex] > numbers[nextIndex]) {
        const tmp = newNumbers[currentIndex];
        newNumbers[currentIndex] = newNumbers[nextIndex];
        newNumbers[nextIndex] = tmp;
      }
      this.setState((prevState) => {
        const continueIteration = nextIndex < numbers.length - iteration;
        return {
          ...prevState,
          numbers: newNumbers,
          sortingState: {
            iteration: continueIteration ? iteration : iteration + 1,
            currentIndex: continueIteration ? nextIndex : 0,
          },
        };
      });
    } else {
      this.setState((prevState) => ({
        ...prevState,
        sorting: false,
        solved: true,
      }));
    }
  }

  render() {
    const { sorting, numbers, solved, sortingState } = this.state;
    return (
      <div className="App">
        <h1>Bubble sort 🛁</h1>
        <BarSet numbers={numbers} currentIndex={sortingState.currentIndex} />
        <button onClick={this.newSetHandler}>
          New set
        </button>
        <button onClick={this.progressHandler} disabled={solved}>
          {sorting ? 'Pause' : 'Start'}
        </button>
        <p>{`Sorting is ${solved ? '' : 'not'} solved`}</p>
      </div>
    );
  }
}

export default App;
