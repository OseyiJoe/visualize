import styled, { keyframes }  from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 16px;
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Sign = styled.div`
  position: absolute;
  top: -100%;
  left: 4%;
  border-radius: 50%;
  border: 5px dotted rgb(114, 17, 17);
  animation-name: ${spin};
  animation-duration: 5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  width: 100px;
  height: 100px;
`;

/*export const Sign = styled.div`
  position: absolute;
  top: -130%;
  left: -5%;
  border-radius: 50%;
  border: 6px dotted rgb(114, 17, 17);
  animation-name: ${spin};
  animation-duration: 5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  width: 120px;
  height: 120px;
`;
*/


export const Frame = styled.div`
  border-radius: 50%;
  background-color: #f1dbba;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border: 1px solid rgb(114, 17, 17);
`;

export const Icon = styled.svg`
  fill: rgb(114, 17, 17);
`;

export const IconLabel = styled.span`
  font-family: 'Sansita Swashed';
  font-size: 20px;
  color: #f1dbba;
  text-shadow: 3px 3px 20px rgb(114, 17, 17), 5px 5px 5px #000000;
  margin: 2px;

  &::first-letter {
    font-size: 30px;
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 0;
  margin-bottom: 16px;
  margin-top: 16px;
  border: 5px solid #f1dbba;
  background-color: rgb(216, 155, 75);
  background-color: rgb(235, 144, 25);
  border-radius: 4px;
  filter: drop-shadow(0px 8px 8px rgba(0, 0, 0, 0.3));
  

  > nav {
    display: flex;
    font-family: 'Comic Sans MS';
    padding: 10px;
    gap: 7px;
  }
`;

export const Logo = styled.div`
  margin-left: 10px;
  font-weight: 700;
  display: flex;
  align-items: flex-end;
`;

export const Link = styled(NavLink)`
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  color: rgb(114, 17, 17);
  font-weight: 700;
  background-color: rgb(240, 164, 65);
  border: 1px solid rgb(114, 17, 17);

  &.active {
    color: white;
    background-color: rgb(114, 17, 17);
  }

  &:hover {
    color: white;
    background-color: rgb(114, 17, 17);
  }
`;


export const Symbol = styled(NavLink)`
  text-decoration: none;
  transition-property: transform;
  transition-duration: 250ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.1);
    
  }
`;
