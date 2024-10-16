import { Outlet } from 'react-router-dom';
import {
  Container,
  Header,
  Logo,
  Link,
  Frame,
  IconLabel,
  Symbol,
  Linker
} from './SharedLayout.styled';
import css from './SharedLayout.module.css';
import { Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { logUserOut } from '../../redux/Auth/operations';
import { useSelector } from 'react-redux';
import { selectIfLoggedIn } from '../../redux/Auth/selectors';
import { Loader } from '../AuthLoader/Loader';
//import { useEffect } from 'react';
//import { selectVotes } from '../../redux/Application/selectors';
//import { useSelector } from 'react-redux';

export const SharedLayout = () => {
  const ifLoggedIn = useSelector(selectIfLoggedIn);
  const dispatch = useDispatch();
  const handleClick = () => {
  dispatch(logUserOut());
}
  

  return (
    <Container>
      <Loader />
      <Header>
        <Symbol to="/">
          <Logo>
            <Frame role="img" aria-label="computer icon">
              <img
                src="https://cdn-icons-png.flaticon.com/512/616/616438.png"
                alt="Eye"
                width="50px"
              />
            </Frame>
            <IconLabel>Visualize</IconLabel>
          </Logo>
        </Symbol>
        {ifLoggedIn && (
          <div className={css.navWrapper}>
            <nav>
              <Link to="/Home">Home</Link>
              <Link className={css.signLink} to="/videos">
                Videos
              </Link>
              <Link to="/pictures">Pictures</Link>
              <Link to="/videoCollection">Video Collection</Link>
              <Link to="/pictureCollection">Picture Collection</Link>
            </nav>
            <span className={css.navSlogan}>
              <i>
                "Create Your Personal Collection from the World’s Best Visuals"
              </i>
            </span>
          </div>
        )}
        {ifLoggedIn && (
          <button className={css.button} onClick={handleClick}>
            Logout
          </button>
        )}
        {ifLoggedIn === false && (
          <Linker to="/register" className={css.button}>
            Register
          </Linker>
        )}
      </Header>
      <main className={css.home}>
        <Suspense fallback={<div>Loading page...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </Container>
  );
};
