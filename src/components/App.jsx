import { useState, useEffect } from 'react';
import { fetchImages } from 'api/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ButtonLoadMore } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import '../index.css';

export const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastPage, setLastPage] = useState(0);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState({
    showModal: false,
    largeImageURL: '',
  });
  const [noResults, setNoResults] = useState(false);

  const handleChange = event => {
    setInputValue(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (inputValue === '') {
      alert('Enter the name of the picture or photo');
      return;
    }

    if (query === inputValue) return;
    setImages([]);
    setQuery(inputValue);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const toggleModal = () => {
    setModal(prevState => ({ ...prevState, showModal: !prevState.showModal }));
  };

  const handleImageClick = largeImageURL => {
    setModal(prevState => ({ ...prevState, largeImageURL }));
    toggleModal();
  };

  useEffect(() => {
    if (page === 0) return;

    const fetchImagesByQuery = async searchQuery => {
      setIsLoading(true);
      setError(null);
      setNoResults(false);

      try {
        const response = await fetchImages(searchQuery, page);
        setImages(prevState => [...prevState, ...response.hits]);
        setLastPage(Math.ceil(response.totalHits / 12));
        response.totalHits === 0 && setNoResults(true);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImagesByQuery(query);
  }, [page, query]);

  return (
    <div>
      <Searchbar
        onSubmit={handleSubmit}
        onChange={handleChange}
        inputValue={inputValue}
      />
      <div className="App">
        {error && (
          <p className="alert">Whoops, something went wrong: {error.message}</p>
        )}

        {noResults && (
          <p className="alert">Sorry, there are no such pictures here</p>
        )}

        {isLoading && <Loader />}

        <ImageGallery images={images} onImageClick={handleImageClick} />
      </div>

      {page < lastPage && !isLoading ? (
        <ButtonLoadMore handleLoadMore={handleLoadMore}>
          Load more
        </ButtonLoadMore>
      ) : (
        <div style={{ height: 30 }}></div>
      )}

      {modal.showModal && (
        <Modal onClose={toggleModal} largeImageURL={modal.largeImageURL} />
      )}
    </div>
  );
};
