import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIfRegistered } from '../../redux/Auth/selectors';

export const AuthRegisterRoute = ({
  component: Component,
  redirectTo = '/',
}) => {
  const ifRegistered = useSelector(selectIfRegistered);

  return ifRegistered ? <Navigate to={redirectTo} /> : Component;
};


