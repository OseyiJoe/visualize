import { useParams } from 'react-router-dom';
import { useUser } from '../CustomProviderComponent/CustomProviderComponent';
import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import svg from '../SharedLayout/icons.svg';
import css from './MovieDetails.module.css';
import { Loader } from '../MovieDetailsLoader/Loader';
import { Modal } from '../Modal/Modal';
import { Suspense } from 'react';
import PropTypes from 'prop-types';
import { useRef } from 'react';


export const MovieDetails = () => {
  const {
    movieDetails,
    moviePoster,
    setFilmDetails,
    name,
    filmName,
    isLoading,
    clearingFilmName,
    handlePlayClick,
  } = useUser();
  const { movieId } = useParams();
  useEffect(() => {
    setFilmDetails(movieId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);
  const imgLink = 'https://image.tmdb.org/t/p/original/' + moviePoster; 
  
  const movieLink = 'https://vidsrc.xyz/embed/movie?tmdb=' + movieId;  

  //const movieLink2 = 'https://www.2embed.cc/embed/' + movieId; 
  const playerRef = useRef();
 
  useEffect(() => {
    const frame = playerRef.current;
    if (frame) {
      
      const setSandboxAttribute = () => {
        frame.setAttribute('sandBox', 'allow-scripts allow-same-origin');
      };
      
      const timeoutId = setTimeout(setSandboxAttribute, 200);
      return () => clearTimeout(timeoutId); 
    }
  }, []);

  return (
    <>
      <div className={css.galleryFrame}>
        <Loader />
        {movieDetails !== '' && moviePoster !== '' ? (
          <div className={css.movieDetails}>
            {filmName !== '%20' ? (
              <Link
                to={`/cinema?movie=${filmName}`}
                className={css.previous}
                onClick={clearingFilmName}
              >
                <span className={css.arrowBtn}>
                  <svg width="15px" height="15px">
                    <use href={`${svg}#icon-arrow`}></use>
                  </svg>
                </span>
              </Link>
            ) : (
              <Link to={`/cinema`} className={css.previous}>
                <span className={css.arrowBtn}>
                  <svg width="15px" height="15px">
                    <use href={`${svg}#icon-arrow`}></use>
                  </svg>
                </span>
              </Link>
            )}
            <Modal />
            <div className={css.movieFrame}>
              <img src={imgLink} alt="Unavailable" className={css.movieImage} />
              <span className={css.movieName}>{name}</span>
              <button className={css.playBtn} onClick={handlePlayClick}>
                <span className={css.play}>
                  <svg width="25px" height="25px">
                    <use href={`${svg}#icon-play2`}></use>
                  </svg>
                  <span>Watch Movie</span>
                </span>
              </button>
            </div>
            <div className={css.playerFrame}>
              <iframe
                width="600"
                height="300"
                ref={playerRef}
                frameBorder="0"
                src={movieLink}
                allowFullScreen
                className={css.frame}
                title={movieId}
              >
                Sorry, movie is not available or your browser does not support
                embedded videos.
              </iframe>
            </div>
            <p className={css.movieOverview}>{movieDetails}</p>
            <ul className={css.movieDetailsList}>
              <li className={css.movieLinksItem}>
                <Link to="cast" className={css.movieLinks}>
                  Cast
                </Link>
              </li>
              <li className={css.movieLinksItem}>
                <Link to="reviews" className={css.movieLinks}>
                  Reviews
                </Link>
              </li>
            </ul>
            <Suspense fallback={<div>Loading page...</div>}>
              <Outlet />
            </Suspense>
          </div>
        ) : (
          isLoading === false && (
            <div>No Details on this Movie, try another movie</div>
          )
        )}
      </div>
    </>
  );
};

MovieDetails.propTypes = {
  movieDetails: PropTypes.string.isRequired,
  moviePoster: PropTypes.string.isRequired,
  setFilmDetails: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  filmName: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  clearingFilmName: PropTypes.func.isRequired,
};

export default MovieDetails;
