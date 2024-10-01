import { SectionTitle } from '../SectionTitle/SectionTitle';
import { Statistics } from '../Statistics/Statistics';
import { FeedbackOptions } from '../FeedbackOptions/FeedbackOptions';
import { Notification } from '../Notification/Notification';

export const VotingApp = () => {
  return (
    <div>
      <SectionTitle>
        <>
          <FeedbackOptions />
          <Statistics>
            <Notification/>
          </Statistics>
        </>
      </SectionTitle>
    </div>
  );
};
