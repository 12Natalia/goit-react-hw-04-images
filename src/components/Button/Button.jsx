import css from './Button.module.css';
import PropTypes from 'prop-types';

export const ButtonLoadMore = ({ handleLoadMore }) => (
  <button type="button" className={css.Button} onClick={handleLoadMore}>
    Load more
  </button>
);

ButtonLoadMore.propTypes = {
  handleLoadMore: PropTypes.func,
};
