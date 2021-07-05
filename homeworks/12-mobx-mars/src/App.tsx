import React from 'react';
import styles from './App.module.css';

import { PhotoLoader, PhotoViewer } from './components';

export const App: React.FC = () => (
  <div className="App">
    <div className={styles.container}>
      <h1 className={styles.title}>Select Sol and press "load"!</h1>
      <PhotoLoader />
      <PhotoViewer />
    </div>
  </div>
);
