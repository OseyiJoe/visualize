import { useUser } from '../CustomProviderComponent/CustomProviderComponent';
import css from './Notification.module.css';
import PropTypes from 'prop-types';

export const Notification = () => {
  const { message } = useUser();

  return (
    <div className={css.notification}>
      <p>{message}</p>
    </div>
  );
};

Notification.prototypes = {
  message: PropTypes.string.isRequired,
};
