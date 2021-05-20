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
      type="text"
      name="query"
      className={styles.input}
      placeholder={'Try "dog" or "apple"'}
      value={inputValue}
      onChange={(e) => inputHandler(e.target.value)}
    />
    <button type="submit" className={styles.button}>
      Search
    </button>
  </form>
);
