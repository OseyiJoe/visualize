import { useUser } from '../CustomProviderComponent/CustomProviderComponent';
import css from './Modal.module.css';
import svg from '../SharedLayout/icons.svg';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import { useEffect } from 'react';

export const Modal = () => {
  const { isOpen, handleClose } = useUser();
  const { movieId } = useParams();
  const movieLink = 'https://vidsrc.xyz/embed/movie?tmdb=' + movieId;  
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
      {isOpen !== undefined && (
        <div className={css.overlay}>
          <button className={css.closeModal} onClick={handleClose}>
            <svg width="20px" height="20px" className={css.modalIcon}>
              <use href={`${svg}#icon-cross`}></use>
            </svg>
          </button>
          <div className={css.modal}>
            <iframe
              width="900"
              height="500"
              ref={playerRef}
              frameBorder="10"
              src={movieLink}
              allowFullScreen
              className={css.frame}
              title={movieId}
            >
              Sorry, movie is not available or your browser does not support
              embedded videos.
            </iframe>
          </div>
        </div>
      )}
    </>
  );
};

Modal.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  altSrc: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

export default Modal;