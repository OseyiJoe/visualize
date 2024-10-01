import css from './SectionTitle.module.css';
import PropTypes from 'prop-types';

export const SectionTitle = ({ children }) => {
  return (
    <section className={css.feedbackSection}>
      {children}
    </section>
  );
};

SectionTitle.propTypes = {
  children: PropTypes.node,
};
