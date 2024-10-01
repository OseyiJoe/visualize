import { Outlet } from 'react-router-dom';
import { useUser } from '../CustomProviderComponent/CustomProviderComponent';
import {
  Container,
  Header,
  Logo,
  Link,
  Sign,
  Frame,
  IconLabel,
  Symbol
} from './SharedLayout.styled';
import css from './SharedLayout.module.css';
import { Suspense } from 'react';
import { useEffect } from 'react';
import { selectVotes } from '../../redux/selectors';
import { useSelector } from 'react-redux';

export const SharedLayout = () => {
  const { toggleSign, makingTrue, makingFalse, setChger } = useUser();
  let { chger } = useUser();

 

  /*setInterval(() => {
    setChger(prevChger => prevChger + 1);
    console.log(chger);
  }, 10000);

 

  useEffect(() => {
    makingTrue();
    console.log(toggleSign);
    setTimeout(() => {
    
      makingFalse()
    }
  
, 5000);
  }, [chger]);

  //console.log(toggleSign);*/

  useEffect(() => {
    const intervalId = setInterval(() => {
      setChger(prevChger => prevChger + 1);
    }, 6000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  useEffect(() => {
    makingTrue();
    //console.log('ToggleSign after makingTrue:', true);

    const timeoutId = setTimeout(() => {
      makingFalse();
      //console.log('ToggleSign after makingFalse:', false);
    }, 3000);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chger]);

   const countTotalFeedback = (good, neutral, bad) => {
     return good + neutral + bad;
   };


  const votes = useSelector(selectVotes);

  const total = countTotalFeedback( votes.Scooby, votes.Goofy, votes.Brian)
  //console.log(votes.Scooby);
 


  return (
    <Container>
      <Header>
        <Symbol to="/">
          <Logo>
            <Frame role="img" aria-label="computer icon">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1623/1623681.png"
                alt="Dog"
                width="50px"
              />
            </Frame>
            <IconLabel>Canine</IconLabel>
            <IconLabel>Cove</IconLabel>
          </Logo>
        </Symbol>
        <div className={css.advertContainer}>
          {toggleSign ? (
            total === 50 ? (
              <div className={css.advert}>Election is Over</div>
            ) : (
              <div className={css.advert}>Cast your vote in the Town Hall</div>
            )
          ) : (
            <>
              {total < 50 &&
                votes.Scooby > votes.Goofy &&
                votes.Scooby > votes.Brian && (
                  <div className={css.advert}>Scooby is in the lead</div>
                )}
              {total < 50 &&
                votes.Goofy > votes.Scooby &&
                votes.Goofy > votes.Brian && (
                  <div className={css.advert}>Goofy is in the lead</div>
                )}
              {total < 50 &&
                votes.Brian > votes.Scooby &&
                votes.Brian > votes.Goofy && (
                  <div className={css.advert}>Brian is in the lead</div>
                )}
              {votes.Scooby === votes.Goofy && votes.Scooby > votes.Brian && (
                <div className={css.advert}>
                  Scooby and Goofy are tied in the lead
                </div>
              )}
              {votes.Scooby === votes.Brian && votes.Scooby > votes.Goofy && (
                <div className={css.advert}>
                  Scooby and Brian are tied in the lead
                </div>
              )}
              {votes.Goofy === votes.Brian && votes.Goofy > votes.Scooby && (
                <div className={css.advert}>
                  Goofy and Brian are tied in the lead
                </div>
              )}
              {votes.Scooby === votes.Goofy && votes.Scooby === votes.Brian && (
                <div className={css.advert}>All candidates are tied</div>
              )}
              {total === 50 &&
                votes.Scooby > votes.Goofy &&
                votes.Scooby > votes.Brian && (
                  <div className={css.advertWinner}>Scooby is the Winner</div>
                )}
              {total === 50 &&
                votes.Goofy > votes.Scooby &&
                votes.Goofy > votes.Brian && (
                  <div className={css.advertWinner}>Goofy is in the Winner</div>
                )}
              {total === 50 &&
                votes.Brian > votes.Scooby &&
                votes.Brian > votes.Goofy && (
                  <div className={css.advertWinner}>Brian is in the Winner</div>
                )}
            </>
          )}
        </div>
        <nav>
          <Link to="/">Home</Link>
          <Link className={css.signLink} to="/town_hall">
            Town Hall
            <Sign />
          </Link>
          <Link to="/library">Library</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/cinema">Cinema</Link>
        </nav>
      </Header>
      <main className={css.home}>
        <Suspense fallback={<div>Loading page...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </Container>
  );
};
