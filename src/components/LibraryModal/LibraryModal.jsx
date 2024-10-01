import { useUser } from '../CustomProviderComponent/CustomProviderComponent';
import css from './LibraryModal.module.css';
import svg from '../SharedLayout/icons.svg';
import { Loader } from '../Loader/Loader';

export const LibraryModal = () => {
  const {
    handleInfoClose,
    showCatInfo,
    isLoading,
    dogBreedInfo,
    dogImage,
  } = useUser();

  //console.log(dogBreedInfo);
  

  return (
    <>
      {showCatInfo !== undefined && (
        <div className={css.overlay}>
          <button className={css.closeModal} onClick={handleInfoClose}>
            <svg width="20px" height="20px" className={css.modalIcon}>
              <use href={`${svg}#icon-cross`}></use>
            </svg>
          </button>
          <div className={css.galleryFrame}>
            <Loader />
            {isLoading === false && (
              <div className={css.modal}>
                <div>
                  <img
                    src={dogImage}
                    alt="Dog Type"
                    height="200px"
                    className={css.catImage}
                  />
                  {/*dogBreedInfo.name*/}
                </div>
                <div className={css.dogDetails}>
                  <div className={css.dogDetailsInfo}>
                    <h3 className={css.dogInfoHeader}>{dogBreedInfo.name}</h3>
                  </div>
                  {dogBreedInfo.origin && (
                    <div className={css.dogDetailsInfo}>
                      <h3 className={css.dogInfo}>Origin</h3>
                      <p className={css.dogInfo}>{dogBreedInfo.origin}</p>
                    </div>
                  )}
                  {dogBreedInfo.life_span && (
                    <div className={css.dogDetailsInfo}>
                      <h3 className={css.dogInfo}>Life Span</h3>
                      <p className={css.dogInfo}>{dogBreedInfo.life_span}</p>
                    </div>
                  )}
                  {dogBreedInfo.temperament && (
                    <div className={css.dogDetailsInfo}>
                      <h3 className={css.dogInfo}>Temperament</h3>
                      <p className={css.dogInfo}>{dogBreedInfo.temperament}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};


