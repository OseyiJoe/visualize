import { useUser } from '../CustomProviderComponent/CustomProviderComponent';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Loader } from '../Loader/Loader';
import PropTypes from 'prop-types';
import css from './Movies.module.css';


export const Movies = () => {
  const { myMovies, setMovieName, movieResults, isLoading } = useUser();
  //const { movie } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get('movie') ?? '';
  useEffect(() => {
    setMovieName(movieName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieName]);

  const settingMovieName = evt => {
    evt.preventDefault();
    setSearchParams({ movie: evt.target[0].value.trim() });
    evt.target[1].style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
    setTimeout(() => {
      evt.target[1].style.boxShadow =
        '0px 4px 6px -1px rgba(0, 0, 0, 0.3), 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 10px 12px -6px rgba(0, 0, 0, 0.4)';
    }, 5000);
    //evt.target.reset();
  };
  const location = useLocation();

  return (
    <div>
      <header className={css.searchBar}>
        <form className={css.form} onSubmit={settingMovieName}>
          <input
            className={css.input}
            type="text"
            autoComplete="off"
            placeholder="Search for Movies"
          />

          <button type="submit" className={css.button}>
            Search
          </button>
        </form>
      </header>
      <div className={css.galleryFrame}>
        <Loader />
        {myMovies.length !== 0 &&
        movieResults.length === 0 &&
        movieName === '' ? (
          <ul className={css.movieGallery}>
            {myMovies.map(movie => (
              <li key={movie.id} name={movie.id} className={css.movieItem}>
                <Link
                  to={`${movie.id}`}
                  name={movie.id}
                  className={css.movieInfo}
                  state={{ from: location }}
                >
                  <img
                    className={css.movieImage}
                    src={
                      'https://image.tmdb.org/t/p/original/' + movie.poster_path
                    }
                    alt="Unavailable"
                  />
                  <span className={css.movieName}>
                    {movie.original_title || movie.original_name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : movieName !== '' &&
          movieResults.length !== 0 &&
          myMovies.length !== 0 ? (
          <ul className={css.movieGallery}>
            {movieResults.map(movie => (
              <li key={movie.id} className={css.movieItem}>
                <Link
                  to={`${movie.id}`}
                  name={movie.id}
                  className={css.movieInfo}
                  state={{ from: location }}
                >
                  <img
                    className={css.movieImage}
                    src={
                      'https://image.tmdb.org/t/p/original/' + movie.poster_path
                    }
                    alt="Unavailable"
                  />

                  <span className={css.movieName}>
                    {movie.original_title || movie.original_name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          isLoading === false && <div>No Movies Found</div>
        )}
      </div>
    </div>
  );
};

Movies.propTypes = {
  myMovies: PropTypes.array.isRequired,
  setMovieName: PropTypes.func.isRequired,
  movieResults: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Movies;