import { useUser } from '../CustomProviderComponent/CustomProviderComponent';
import css from './Reviews.module.css';
import svg from '../SharedLayout/icons.svg';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

export const Reviews = () => {
  const { filmReviews } = useUser();
  const { movieId } = useParams();

  return (
    <div className={css.reviews}>
      <Link to={`/cinema/${movieId}`}>
        <span className={css.closebtn}>
          <svg width="10px" height="10px">
            <use href={`${svg}#icon-cross`}></use>
          </svg>
        </span>
      </Link>
      {filmReviews.length === 0 ? (
        <div>There are no reviews for this movie yet.</div>
      ) : (
        <ul className={css.reviewList}>
          {filmReviews.map(review => (
            <li key={review.created_at} className={css.reviewItem}>
              <div className={css.reviewAuthor}>{review.author}:</div>
              <p className={css.reviewContent}>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Reviews.propTypes = {
  filmReviews: PropTypes.array.isRequired,
};

export default Reviews;