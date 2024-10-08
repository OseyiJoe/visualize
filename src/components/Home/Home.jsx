import css from './Home.module.css';
import { Loader } from '../InitLoader/Loader';
import play from './play.png';
import { selectPopularVideos } from '../../redux/Application/selectors';
import {
  saveVideos,
  fetchMorePopularVideos,
} from '../../redux/Application/operations';
import { selectUser } from '../../redux/Auth/selectors';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export const Home = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUser);
  const popularVideos = useSelector(selectPopularVideos);
  
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

 
    useEffect(() => {
      Fancybox.bind("[data-fancybox='gallery']", {
        // Custom options
      });

      // Cleanup function
      return () => {
        Fancybox.destroy();
      };
    }, [popularVideos]);
  
    /*useEffect(() => {
      dispatch(fetchPopularVideos());
    }, [dispatch]); */

  //const ifLoggedIn = useSelector(selectIfLoggedIn);
  //const ifRegisteredIn = useSelector(selectIfRegistered);

  return (
    <div>
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
