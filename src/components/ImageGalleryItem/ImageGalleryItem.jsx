import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  onImageClick,
}) => (
  <li className={css.galleryItem}>
    <img
      src={webformatURL}
      alt=""
      className={css.ImageGalleryItem}
      onClick={() => onImageClick(largeImageURL)}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  onImageClick: PropTypes.func,
};
