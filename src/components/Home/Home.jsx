import css from './Home.module.css';
import { Loader } from '../InitLoader/Loader';
import play from './play.png';
import {
  selectPopularVideos,
  selectMyKey,
  selectOpenModal,
  selectOpenKeyModal,
  selectMyKeyName,
  selectMyKeyId,
} from '../../redux/Application/selectors';
import { FullLoader } from '../Loader/Loader';
import {
  saveVideos,
  fetchMorePopularVideos,
  createKey,
  retrieveKey,
  openModal,
  closeModal,
  openKeyModal,
  closeKeyModal,
} from '../../redux/Application/operations';
import { selectUser } from '../../redux/Auth/selectors';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import svg from '../SharedLayout/icons.svg';

export const Home = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUser);
  const isOpenModal = useSelector(selectOpenModal);
  const isOpenKeyModal = useSelector(selectOpenKeyModal);
  const popularVideos = useSelector(selectPopularVideos);
  const myKey = useSelector(selectMyKey);
  const myKeyName = useSelector(selectMyKeyName);
  const myKeyId = useSelector(selectMyKeyId);
  
    const handlePress = (videoFiles, evt) => {
      evt.target.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';

      setTimeout(() => {
        evt.target.style.boxShadow = 'none';
      }, 2000);

      console.log(videoFiles); // Log the array of video files

      dispatch(saveVideos({ video_files: videoFiles }));
  };
  
  const handleButtonPress = (evt) => {
    evt.target.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';

    setTimeout(() => {
      evt.target.style.boxShadow = 'none';
    }, 2000);
    dispatch(fetchMorePopularVideos());
  }

  const handleSubmit = (e) => {
 e.preventDefault();
 const form = e.currentTarget;
 dispatch(
   createKey({
     name: form.elements.name.value,
     customMETAData: form.elements.customMetaData.value,
     customAccountId: form.elements.customAccountId.value,
   })
 );
  }

  const handleModalOpen = () => {
    dispatch(openModal())
    console.log(isOpenModal);
  }

  const handleModalClose = () => {
    dispatch(closeModal());
    console.log(isOpenModal);
  };

  const handleKeyModalOpen = () => {
    dispatch(openKeyModal());
  };

  const handleKeyModalClose = () => {
    dispatch(closeKeyModal());
  };

 
    useEffect(() => {
      Fancybox.bind("[data-fancybox='gallery']", {
        // Custom options
      });

      // Cleanup function
      return () => {
        Fancybox.destroy();
      };
    }, [popularVideos]);
  
  useEffect(() => {
      dispatch(retrieveKey());
      //dispatch(fetchPopularVideos());
    }, [dispatch]); 

  //const ifLoggedIn = useSelector(selectIfLoggedIn);
  //const ifRegisteredIn = useSelector(selectIfRegistered);

  return (
    <div>
      <FullLoader />
      <span className={css.movieGalleryLabel}>
        <img
          src={play}
          alt="Play"
          width="100"
          className={css.movieGalleryAnimation}
        />
        <div className={css.headerWrapper}>
          <span className={css.headerLabel}>Hello, {userName.name}</span>
          <span className={css.movieGalleryTitle}>Trending Videos</span>
          {myKey === null && (
            <span className={css.genWrapper}>
              <span className={css.genLabel}>For more access</span>
              <button className={css.genButton} onClick={handleModalOpen}>
                CREATE KEY
              </button>
            </span>
          )}
          {isOpenModal === true && (
            <div className={css.overlay}>
              <button className={css.closeModal} onClick={handleModalClose}>
                <svg width="20px" height="20px" className={css.modalIcon}>
                  <use href={`${svg}#icon-cross`}></use>
                </svg>
              </button>
              <div className={css.login}>
                <div>
                  <div className={css.formContainer}>
                    <form
                      className={css.form}
                      onSubmit={handleSubmit}
                      autoComplete="off"
                    >
                      <label className={css.label}>
                        KEY NAME
                        <input
                          type="text"
                          name="name"
                          className={css.input}
                          required
                        />
                      </label>
                      <label className={css.label}>
                        CUSTOM ACCOUNT ID
                        <input
                          type="text"
                          name="customAccountId"
                          className={css.input}
                          required
                        />
                      </label>
                      <label className={css.label}>
                        CUSTOM META DATA
                        <input
                          type="text"
                          name="customMetaData"
                          className={css.input}
                          required
                        />
                      </label>
                      <button
                        className={css.inputButton}
                        name="button"
                        type="submit"
                      >
                        CREATE A KEY
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
          {myKey !== null && (
            <div>
              {console.log(myKey)}
              <span className={css.genWrapper}>
                <span className={css.genLabel}>To View KEY details</span>
                <button className={css.genButton} onClick={handleKeyModalOpen}>
                  CLICK HERE
                </button>
              </span>
            </div>
          )}
          {isOpenKeyModal === true && (
            <div className={css.overlay}>
              <button className={css.closeModal} onClick={handleKeyModalClose}>
                <svg width="20px" height="20px" className={css.modalIcon}>
                  <use href={`${svg}#icon-cross`}></use>
                </svg>
              </button>
              <table className={css.transactionHistory}>
                <thead>
                  <tr>
                    <th>KEY NAME</th>
                    <th>KEY</th>
                    <th>KEY ID</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>{myKeyName}</td>
                    <td>{myKey}</td>
                    <td>{myKeyId}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
        <img
          src={play}
          alt="Play"
          width="100"
          className={css.movieGalleryAnimation}
        />
      </span>
      <div className={css.galleryFrame}>
        <Loader />
        {popularVideos.length !== 0 && (
          <ul className={`${css.movieGallery} gallery`}>
            {popularVideos.map(popularVideo => (
              <li
                key={popularVideo.video_files[2].id}
                className={css.movieItem}
              >
                <a
                  href={popularVideo.video_files[0].link}
                  data-fancybox="gallery"
                >
                  <video
                    className={css.movieImage}
                    src={popularVideo.video_files[2].link}
                    controls
                  ></video>
                </a>
                <button
                  className={css.liker}
                  onClick={evt => handlePress(popularVideo.video_files, evt)}
                >
                  Save
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={css.buttonWrapper}>
        {popularVideos.length !== 0 ? (
          <button onClick={handleButtonPress} className={css.loadBtn}>
            Load More
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Home;