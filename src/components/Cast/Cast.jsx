import { useUser } from '../CustomProviderComponent/CustomProviderComponent';
import css from './Cast.module.css';
import svg from '../SharedLayout/icons.svg';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

export const Cast = () => {
  const { filmCast } = useUser();
  const { movieId } = useParams();

  return (
    <div className={css.castDetails}>
      <Link to={`/cinema/${movieId}`}>
        <span className={css.closebtn}>
          <svg width="10px" height="10px">
            <use href={`${svg}#icon-cross`}></use>
          </svg>
        </span>
      </Link>
      <ul className={css.movieCast}>
        {filmCast.map(cast => (
          <li key={cast.id}>{cast.name}</li>
        ))}
      </ul>
    </div>
  );
};

Cast.propTypes = {
  filmCast: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Cast;