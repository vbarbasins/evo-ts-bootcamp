import React from 'react';
import styles from './SearchForm.module.css';

interface SearchFormProps {
  submitHandler: (e: React.FormEvent) => void;
  inputHandler: (value: string) => void;
  inputValue: string;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  submitHandler,
  inputHandler,
  inputValue,
}) => (
  <form className={styles.form} onSubmit={submitHandler}>
    <input
      type="number"
      name="sol"
      className={styles.input}
      placeholder={'Select the sol'}
      value={inputValue}
      onChange={(e) => inputHandler(e.target.value)}
      min="1"
    />
    <button type="submit" className={styles.button}>
      Load
    </button>
  </form>
);
