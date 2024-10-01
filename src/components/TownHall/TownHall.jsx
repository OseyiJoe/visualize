
import css from './TownHall.module.css';
import { VotingApp } from '../VotingApp/VotingApp';
import buildingImage from './town-halll.png';


export const TownHall = () => {
  

  return (
    <div>
      <span className={css.titleContainer}>
        <span className={css.iconContainer}>
          <img
            src={buildingImage}
            className={css.icon}
            style={{ width: '100px' }}
            alt=""
          />
        </span>
        <span className={css.title}>Welcome to our Town Hall</span>
        <span className={css.iconContainer}>
          <img
            src={buildingImage}
            className={css.iconTwo}
            style={{ width: '100px' }}
            alt=""
          />
        </span>
      </span>

      <VotingApp />
    </div>
  );
};



export default TownHall;