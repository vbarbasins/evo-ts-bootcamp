import React from 'react';
import './App.css';

import { createRandomNumberArray } from './utils/appUtils';

interface AppProps {}

interface AppState {
  sorting: boolean,
  numbers: number[],
  lastI: number,
  lastJ: number,
}

class App extends React.Component<{}, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      sorting: false,
      numbers: createRandomNumberArray(100, 30),
      lastI: 0,
      lastJ: 0,
    };
  }

  newSetHandler = () => {
    this.setState({
      sorting: false,
      numbers: createRandomNumberArray(100, 30),
      lastI: 0,
      lastJ: 0,
    });
  }

  progressHandler = () => {
    const { sorting } = this.state;
    if (!sorting) {
      this.setState((prevState) => ({
        ...prevState,
        sorting: true,
      }));
      setInterval(this.sortNumbers, 100);
    } else {
      this.setState((prevState) => ({
        ...prevState,
        sorting: false,
      }));
    }
  }

  sortNumbers = () => {
    const { numbers, lastI, lastJ } = this.state;
    if (lastI < numbers.length) {
      const newNumbers = [...numbers];
      const nextJ = lastJ + 1;
      if (numbers[lastJ] > numbers[nextJ]) {
        const tmp = newNumbers[lastJ];
        newNumbers[lastJ] = newNumbers[nextJ];
        newNumbers[nextJ] = tmp;
      }
      this.setState((prevState) => ({
        ...prevState,
        numbers: newNumbers,
        lastI: nextJ < numbers.length - 1 ? prevState.lastI : prevState.lastI + 1,
        lastJ: nextJ < numbers.length - 1 ? nextJ : 0,
      }));
    }
  }

  render() {
    const { sorting, numbers } = this.state;
    return (
      <div>
        <button onClick={this.newSetHandler}>
          New set
        </button>
        <button onClick={this.progressHandler}>
          {sorting ? 'Pause' : 'Start'}
        </button>
        <p>{`numbers: ${numbers.toString()}`}</p>
      </div>
    );
  }
}

export default App;
