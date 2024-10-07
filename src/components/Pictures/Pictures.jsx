import css from './Pictures.module.css';
import { Loader } from '../InitLoader/Loader';
import { useEffect } from 'react';
//import { Button } from '../PetScopeButton/Button';
import imagePic from './photo.png';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  selectLoading,
  selectSearchedImgWord,
  selectSearchedImages,
  selectPopularImages,
} from '../../redux/Application/selectors';
import { searchImages, fetchImgWord } from '../../redux/Application/operations';

export const Pictures = () => {
  const dispatch = useDispatch();
  const searchedImages = useSelector(selectSearchedImages);
  const searchedImgWord = useSelector(selectSearchedImgWord);
  const ifLoading = useSelector(selectLoading);
  const popularImages = useSelector(selectPopularImages);
  const handleSubmit = evt => {
    evt.preventDefault();
    evt.target.elements.button.style.boxShadow =
      'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
    setTimeout(() => {
      evt.target.elements.button.style.boxShadow = 'none';
    }, 2000);
    const form = evt.target;
    dispatch(searchImages(form.elements.searcher.value));
    dispatch(fetchImgWord(form.elements.searcher.value));
    console.log(form.elements.searcher.value);
  };

  useEffect(() => {
    const lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
      closeText: 'X',
      animationSlide: false,
    });

    // Cleanup function
    return () => {
      lightbox.destroy();
    };
  }, [searchedImages]);

  return (
    <main>
      <span className={css.titleContainer}>
        
          <img
            src={imagePic}
            className={css.icon}
            style={{ width: '100px' }}
            alt=""
          />
      
        <span>
          <span className={css.movieGalleryLabel}>Pictures</span>
          <span className={css.movieGallerySlogan}>
            <i>Explore the World Through Pictures with PetScope!</i>
          </span>
        </span>
        
          <img
            src={imagePic}
            className={css.iconTwo}
            style={{ width: '100px' }}
            alt=""
          />
        
      </span>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          name="searcher"
          placeholder="Search for Pictures"
        />
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>Search</span>
        </button>
      </form>
      <div className={css.galleryFrame}>
        <Loader />
        {searchedImages.length !== 0 && searchedImgWord !== null ? (
          <ul className={`${css.movieGallery} gallery`}>
            {searchedImages.map(result => (
              <li key={result.id} className={css.movieItem}>
                <a href={result.largeImageURL}>
                  <img
                    className={css.image}
                    src={result.webformatURL}
                    alt={result.tags}
                    name={result.largeImageURL}
                  />
                </a>
              </li>
            ))}
          </ul>
        ) : searchedImages.length === 0 && searchedImgWord === null ? (
          <ul className={`${css.movieGallery} gallery`}>
            {popularImages.map(result => (
              <li key={result.id} className={css.movieItem}>
                <a href={result.largeImageURL}>
                  <img
                    className={css.image}
                    src={result.webformatURL}
                    alt={result.tags}
                    name={result.largeImageURL}
                  />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          ifLoading === false && (
            <div className={css.message}>
              <p className={css.messageItem}>
                No Videos, try another search term
              </p>
            </div>
          )
        )}
      </div>
      {/*<Button />*/}
    </main>
  );
};

export default Pictures;

