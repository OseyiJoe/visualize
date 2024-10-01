import { useUser } from '../CustomProviderComponent/CustomProviderComponent';
import css from './Button.module.css';


export const Button = () => {
  const { catPics, handleGalleryButtonPress } =
    useUser();

  return (
    <div>
      {catPics.length !== 0 ? (
        <button onClick={handleGalleryButtonPress} className={css.loadBtn}>
          Load More
        </button>
      ) : null}
    </div>
  );
};


