import React from 'react';
import PropTypes from 'prop-types';
import './ActiveAuction.scss';
import Button from '../../components/button/Button';
import picture from '../../assets/images/image.svg';

const ActiveAuction = (props) => {
  const { ...rest } = props;
  return (
    <div className="active__auction__item">
      <div className="title">
        <h1>Auction Title</h1>
        <div className="artist__details">
          <img src={picture} alt="Artist" />
          <span>by</span>
          <button type="button">Justin 3LAU</button>
        </div>
      </div>
      <div className="view__auction">
        <Button className="light-button">View auction</Button>
      </div>
      <div className="auction__img">
        <img className="original" src={picture} alt="Original" />
        <img className="artist__image" src={picture} alt="Title" />
      </div>
      <div className="auction__details">
        <div>
          <div className="auction__details__box">
            <p>Time Left:</p>
            <h3>2d : 5h : 20m: 30s</h3>
          </div>
          <div className="auction__details__box">
            <p>Winners</p>
            <h3>35</h3>
          </div>
          <div className="auction__details__box">
            <p>NFTs Per Winner:</p>
            <h3>10-7</h3>
          </div>
        </div>
        <div>
          <div className="auction__details__box">
            <p>Highest Winning Bid:</p>
            <h3>
              {`40 ETH `}
              <span>~$120,594</span>
            </h3>
          </div>
          <div className="auction__details__box">
            <p>Lowest Winning Bid:</p>
            <h3>
              {`14 ETH `}
              <span>~$41,594</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveAuction;
