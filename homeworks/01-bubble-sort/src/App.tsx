import React from 'react';
import './App.css';

import { createRandomNumberArray } from './utils/appUtils';

interface AppProps {}

interface AppState {
  sorting: boolean,
  numbers: number[],
}

class App extends React.Component<{}, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      sorting: false,
      numbers: createRandomNumberArray(100, 30),
    };
  }

  newSetHandler = () => {
    this.setState({
      sorting: false,
      numbers: createRandomNumberArray(100, 30),
    });
  }

  progressHandler = () => {
    const { sorting } = this.state;
    if (!sorting) {
      this.setState({ sorting: true });
    } else {
      this.setState({ sorting: false });
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
        <p>{numbers}</p>
      </div>
    );
  }
}

export default App;
