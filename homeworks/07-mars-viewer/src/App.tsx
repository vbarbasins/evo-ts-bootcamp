import React from 'react';
import styles from './App.module.css';

import { SolSelectForm } from './components/SolSelectForm';
import { SolPhotos } from './components/SolPhotos';

export const App: React.FC = () => (
  <div className="App">
    <div className={styles.container}>
      <h1 className={styles.title}>Select Sol and press "load"!</h1>
      <SolSelectForm />
      <SolPhotos />
    </div>
  </div>
);
