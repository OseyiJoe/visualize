import { useUser } from '../CustomProviderComponent/CustomProviderComponent';
import css from './VideoCollection.module.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { useEffect } from 'react';
import { Button } from '../GalleryButton/Button';
import { Loader } from '../GalleryLoader/Loader';
import galleryImage from './gallery.png'
import { useDispatch } from 'react-redux';
import { fetchPopularVideos } from '../../redux/Application/operations';
import { useSelector } from 'react-redux';
import { selectPopularVideos } from '../../redux/Application/selectors';


export const VideoCollection = () => {
  const dispatch = useDispatch();
  const { catPics } = useUser();
  const popularVideos = useSelector(selectPopularVideos);

  useEffect(() => {
    dispatch(fetchPopularVideos());
  },[])

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
  }, [catPics]);

  return (
    <main>
      <span className={css.titleContainer}>
        <span className={css.iconContainer}>
          <img
            src={galleryImage}
            className={css.icon}
            style={{ width: '100px' }}
            alt=""
          />
        </span>
        <span className={css.movieGalleryLabel}>Welcome To Our Gallery</span>
        <span className={css.iconContainer}>
          <img
            src={galleryImage}
            className={css.iconTwo}
            style={{ width: '100px' }}
            alt=""
          />
        </span>
      </span>
      <div className={css.galleryFrame}>
        {popularVideos.length !== 0 && (
          <ul className={`${css.movieGallery} gallery`}>
            {popularVideos.map(popularVideo => (
              <li className={css.movieItem}>
                <video
                  src={popularVideo.video_files[0].link}
                  alt="cat, feline, pet"
                  controls
                  height="100%"
                  width="100%"
                ></video>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Button />
    </main>
  );
};

export default VideoCollection;
