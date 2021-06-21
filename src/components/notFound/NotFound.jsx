import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../../ContextAPI';
import Button from '../button/Button';
import './NotFound.scss';
import notFoundImg from '../../assets/images/404img.png';

const NotFound = () => {
  const { setWebsite } = useContext(AppContext);
  const history = useHistory();
  useEffect(() => {
    setWebsite(false);
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
