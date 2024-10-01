import { useUser } from '../CustomProviderComponent/CustomProviderComponent';
import css from './Library.module.css';
import { Loader } from '../InitLoader/Loader';
import { LibraryModal } from '../LibraryModal/LibraryModal';
import openBookImage from '../Library/open-book.png';

export const Library = () => {
  const { breedList, handleInfoClick } = useUser();

  return (
    <main>
      <span className={css.movieGalleryLabel}>
        <span className={css.movieGalleryIcon}>
          <img
            src={openBookImage}
            className={css.icon}
            style={{ width: '100px' }}
            alt=""
          />
        </span>

        <span className={css.movieGalleryTitle}>Welcome To Our Library</span>

        <span className={css.movieGalleryIcon}>
          <img
            src={openBookImage}
            className={css.icon}
            style={{ width: '100px' }}
            alt=""
          />
        </span>
      </span>

      <div className={css.galleryFrame}>
        <Loader />
        <LibraryModal />
        {breedList.length !== 0 && (
          <ul className={css.movieGallery}>
            {breedList.map(breed => (
              <li
                key={breed.id}
                className={css.movieItem}
                data-id1={breed.id}
                data-id2={breed.name}
                onClick={handleInfoClick}
              >
                {breed.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
};



export default Library;
