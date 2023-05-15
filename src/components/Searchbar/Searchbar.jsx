import { FcSearch } from 'react-icons/fc';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit, onChange, inputValue }) => (
  <header className={css.searchbar}>
    <form className={css.Form} onSubmit={onSubmit}>
      <button type="submit" className={css.Button}>
        <FcSearch size="30" />
      </button>
      <input
        className={css.Input}
        type="text"
        name="query"
        autoComplete="off"
        autoFocus
        placeholder="Search for pictures and photos"
        onChange={onChange}
        value={inputValue}
      />
    </form>
  </header>
);

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  query: PropTypes.string,
};
