import { useUser } from '../CustomProviderComponent/CustomProviderComponent';
import css from './Button.module.css';


export const Button = () => {
  const { movieResults, didUserSearch, handleButtonPress, fewResponse } =
    useUser();

  return (
    <div>
      {movieResults.length !== 0 && didUserSearch && !fewResponse ? (
        <button onClick={handleButtonPress} className={css.loadBtn}>
          Load More
        </button>
      ) : null}
    </div>
  );
};


