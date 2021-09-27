import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../button/Button';
import './NotFound.scss';
import notFoundImg from '../../assets/images/404img.png';
import { useThemeContext } from '../../contexts/ThemeContext';

const NotFound = () => {
  const { setDarkMode } = useThemeContext();
  const history = useHistory();
  useEffect(() => {
    setDarkMode(false);
    document.title = `Universe Minting - 404 - page not found`;
    return () => {
      document.title = 'Universe Minting';
    };
  }, []);
  return (
    <div className="not__found__page">
      <div className="not__found__page__box">
        <h1>
          <img src={notFoundImg} alt="404" />
        </h1>
        <p>Oops.. page not found</p>
        <Button className="light-button" onClick={() => history.push('/')}>
          Go back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
