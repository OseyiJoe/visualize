import css from './Home.module.css';
import { addUser } from '../../redux/Auth/operations';
import { Link } from 'react-router-dom';
import { Loader } from '../InitLoader/Loader';
import play from './play.png';
//import {selectIfLoggedIn,selectIfRegistered} from '../../redux/Auth/selectors';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { selectPopularVideos } from '../../redux/Application/selectors';
import { fetchPopularVideos } from '../../redux/Application/operations';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

export const Home = () => {
  const dispatch = useDispatch();
   const popularVideos = useSelector(selectPopularVideos);

 
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
      dispatch(fetchPopularVideos());
    }, []); 

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
        <span className={css.movieGalleryTitle}>Trending Videos</span>
        <img
          src={play}
          alt="Play"
          width="100"
          className={css.movieGalleryAnimation}
        />
      </span>
      <h3 className={css.townOfficialsIntro}>
        <i>"Create Your Personal Collection from the World’s Best Visuals"</i>
      </h3>
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
                    alt="cat, feline, pet"
                    controls
                  ></video>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
