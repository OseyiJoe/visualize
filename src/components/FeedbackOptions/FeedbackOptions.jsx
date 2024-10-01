import { useUser } from '../CustomProviderComponent/CustomProviderComponent';
import css from './FeedbackOptions.module.css';
import PropTypes from 'prop-types';
//import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addVote } from '../../redux/operations';
import { selectVotes } from '../../redux/selectors';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';



export const FeedbackOptions = () => {
  
  const votes = useSelector(selectVotes);

  
  const {
    countTotalFeedback,
    options,
    scoobyWins,
    setScoobyWins,
    goofyWins,
    setGoofyyWins,
    brianWins,
    setBrianWins,
  } = useUser();

  const total = countTotalFeedback(votes.Scooby, votes.Goofy, votes.Brian);

  

  useEffect(() => {
    if (
      total === 50 &&
      votes.Scooby > votes.Goofy &&
      votes.Scooby > votes.Brian
    ) {
      setScoobyWins(true);
      setGoofyyWins(false);
      setBrianWins(false);
    }

    if (
      total === 50 &&
      votes.Goofy > votes.Scooby &&
      votes.Goofy > votes.Brian
    ) {
      setScoobyWins(false);
      setGoofyyWins(true);
      setBrianWins(false);
    }

    if (
      total === 50 &&
      votes.Brian > votes.Goofy &&
      votes.Brian > votes.Scooby
    ) {
      setScoobyWins(false);
      setGoofyyWins(false);
      setBrianWins(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total])
  
  

  const dispatch = useDispatch();

  const onVote = evt => {
    evt.target.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
    setTimeout(() => {
      evt.target.style.boxShadow = 'none';
    }, 2000);
    
    const votes = JSON.parse(evt.target.getAttribute('data-votes'));
    //console.log(votes);
    //const { name } = evt.target;

    dispatch(addVote({ votesVar: votes, name: evt.target.name }));
    
    localStorage.setItem('hasVoted', JSON.stringify(true));
    
  };

  return (
    <>
      <div className={css.pictureBox}>
        <div className={css.movieItemCover}>
          {(brianWins === true || goofyWins === true) && (
            <div className={css.cover}></div>
          )}
          <div className={css.movieItem}>
            <div className={css.catOverlay}>
              <img
                className={css.movieImage}
                src="https://i.pinimg.com/736x/a6/aa/2a/a6aa2a792c6fd769c4ebef223de23cca.jpg"
                alt="Unavailable"
              />
              <p className={css.catDescription}>
                Welcome to the Pawsitive Progressive Party, where every paw
                counts, and every wagging tail signifies a brighter future! We
                are dedicated to creating a world where our furry friends
                thrive.
                <br />
                <br />
                Slogan: "Leading the Pack to a Brighter Tomorrow!"
              </p>
            </div>
            <span className={css.movieName}>
              Scooby
              <span className={css.catName}>Pawsitive Progressive Party</span>
            </span>
          </div>
        </div>
        <div className={css.movieItemCover}>
          {(scoobyWins === true || brianWins === true) && (
            <div className={css.cover}></div>
          )}
          <div className={css.movieItem}>
            <div className={css.catOverlay}>
              <img
                className={css.movieImage}
                src="https://i.pinimg.com/736x/e7/9c/e0/e79ce05e10e609d9dd08ddb0f88abf27.jpg"
                alt="Unavailable"
              />
              <p className={css.catDescription}>
                Introducing the Canine Unity Coalition, where every dog has a
                voice. We strive to ensure that every dog, regardless of breed
                or background, thrives in a supportive and nurturing
                environment.
                <br />
                <br />
                Slogan: "United Paws, Stronger Together!"
              </p>
            </div>
            <span className={css.movieName}>
              Goofy
              <span className={css.catName}>Canine Unity Coalition</span>
            </span>
          </div>
        </div>

        <div className={css.movieItemCover}>
          {(scoobyWins === true || goofyWins === true) && (
            <div className={css.cover}></div>
          )}
          <div className={css.movieItem}>
            <div className={css.catOverlay}>
              <img
                className={css.movieImage}
                src="https://i.pinimg.com/564x/99/ad/10/99ad1042ab520a579a99d35581f2785a.jpg"
                alt="Unavailable"
              />
              <p className={css.catDescription}>
                Welcome to the Loyal Leash Party, where dedication and loyalty
                pave the way for a brighter future for all canines! We are
                committed to ensuring every dog receives the care, and
                opportunities they deserve.
                <br />
                <br />
                Slogan: "Bound by Loyalty, Driven by Love!"
              </p>
            </div>
            <span className={css.movieName}>
              Brain
              <span className={css.catName}>The Loyal Leash Party</span>
            </span>
          </div>
        </div>
      </div>

      <div className={css.movieItemCover}>
        {total === 50 && <div className={css.cover}></div>}
        <div className={css.buttonBoxContainer}>
          <div className={css.buttonBox}>
            {options.map(option => (
              <button
                className={css.button}
                type="button"
                name={option}
                data-votes={JSON.stringify(votes)}
                onClick={onVote}
                key={options.indexOf(option)}
                disabled={JSON.parse(localStorage.getItem('hasVoted'))}
              >
                {option}
              </button>
            ))}
          </div>

          <p className={css.rulesHeader}>Election Rules</p>
          <ul className={css.rulesList}>
            <li className={css.rulesListItem}>
              When the total number of votes gets to 50, the candidate with the
              highest number of votes wins.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

FeedbackOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onLeaveFeedback: PropTypes.func.isRequired,
};
