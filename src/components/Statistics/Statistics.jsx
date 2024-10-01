import css from './Statistics.module.css';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { selectVotes } from '../../redux/selectors';
import { useSelector } from 'react-redux';
import { useUser } from '../CustomProviderComponent/CustomProviderComponent';


export const Statistics = ({ children }) => {
  const goodId = nanoid();
  const neutralId = nanoid();
  const badId = nanoid();
  const totalId = nanoid();
  const positiveFeedbackId = nanoid();

  const { countTotalFeedback, countPositiveFeedbackPercentage } = useUser();

  const votes = useSelector(selectVotes);


  return (
    <div className={css.statistics}>
      <h3 className={css.statisticsTitle}>Statistics</h3>
      {votes.Scooby !== 0 || votes.Goofy !== 0 || votes.Brian !== 0 ? (
        <div className={css.stats}>
          <div className={css.statsCandidate}>
            <div className={css.statsCandidateItem}>
              <div className={css.statsImage}>
                <img
                  className={css.statsImageItem}
                  src="https://i.pinimg.com/736x/a6/aa/2a/a6aa2a792c6fd769c4ebef223de23cca.jpg"
                  alt="Unavailable"
                />
              </div>
              <div key={goodId} className={css.statsResult}>
                Scooby: {votes.Scooby}
              </div>
            </div>
            <div>
              <div className={css.statsImage}>
                <img
                  className={css.statsImageItem}
                  src="https://i.pinimg.com/736x/e7/9c/e0/e79ce05e10e609d9dd08ddb0f88abf27.jpg"
                  alt="Unavailable"
                />
              </div>
              <div key={neutralId} className={css.statsResult}>
                Goofy: {votes.Goofy}
              </div>
            </div>
            <div>
              <div className={css.statsImage}>
                <img
                  className={css.statsImageItem}
                  src="https://i.pinimg.com/564x/99/ad/10/99ad1042ab520a579a99d35581f2785a.jpg"
                  alt="Unavailable"
                />
              </div>
              <div key={badId} className={css.statsResult}>
                Brian: {votes.Brian}
              </div>
            </div>
          </div>

          <div className={css.statsInfo}>
            <div key={totalId} className={css.statsInfoItem}>
              Total Votes:{' '}
              {countTotalFeedback(votes.Scooby, votes.Goofy, votes.Brian)}
            </div>
            <div className={css.statsPercent}>
              <div key={positiveFeedbackId} className={css.statsInfoItem}>
                Pawsitive Progressive Party:{' '}
                {Number(
                  countPositiveFeedbackPercentage(
                    votes.Scooby,
                    votes.Goofy,
                    votes.Brian,
                    votes.Scooby
                  ).toFixed(2)
                )}
                %
              </div>

              <div className={css.statsInfoItem}>
                Canine Unity Coalition:{' '}
                {Number(
                  countPositiveFeedbackPercentage(
                    votes.Scooby,
                    votes.Goofy,
                    votes.Brian,
                    votes.Goofy
                  ).toFixed(2)
                )}
                %
              </div>

              <div className={css.statsInfoItem}>
                The Loyal Leash Party:{' '}
                {Number(
                  countPositiveFeedbackPercentage(
                    votes.Scooby,
                    votes.Goofy,
                    votes.Brian,
                    votes.Brian
                  ).toFixed(2)
                )}
                %
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

Statistics.propTypes = {
  children: PropTypes.node,
};
