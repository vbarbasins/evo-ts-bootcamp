import React from 'react';
import './App.css';

import { BarSet } from './components/BarSet';

import { createRandomNumberArray, makeSortingStep } from './utils/appUtils';

const MAX_NUMBER = 100;
const NUMBER_COUNT = 40;
const SORT_TIMEOUT = 75;

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
  state = {
    sorting: false,
    sortingState: { iteration: 0, currentIndex: 0 },
    numbers: createRandomNumberArray(MAX_NUMBER, NUMBER_COUNT),
    solved: false,
  };

  componentDidUpdate(): void {
    const { sorting } = this.state;
    if (sorting) setTimeout(this.sortNumbers, SORT_TIMEOUT);
  }

  private newSetHandler = (): void => {
    this.setState({
      sorting: false,
      sortingState: { iteration: 0, currentIndex: 0 },
      numbers: createRandomNumberArray(MAX_NUMBER, NUMBER_COUNT),
      solved: false,
    });
  }

  private progressHandler = (): void => {
    this.setState(({ sorting }) => ({ sorting: !sorting }));
  }

  private sortNumbers = (): void => {
    const { numbers, sortingState, sorting } = this.state;
    const { iteration, currentIndex } = sortingState;

    if (!sorting) return;

    const sortingStepResult = makeSortingStep(numbers, iteration, currentIndex);

    if (sortingStepResult) {
      const { newNumbers, nextSortingStep } = sortingStepResult;
      this.setState({
        numbers: newNumbers,
        sortingState: nextSortingStep,
      });
    } else {
      this.setState({
        sorting: false,
        solved: true,
      });
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
