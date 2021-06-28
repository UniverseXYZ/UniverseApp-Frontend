import React from 'react';
import PropTypes from 'prop-types';
import './FutureAuction.scss';
import avatar from '../../assets/images/profilavatar.svg';
import chess from '../../assets/images/chess.png';

const FutureAuction = (props) => {
  const { titleImg, auctionTitle, userAvatar, userName, startsIn, winners, NFTperWinner } = props;
  return (
    <div className="future__auction__item">
      <div className="auction__img">
        <img className="original" src={titleImg.url} alt="edjjdd" />
      </div>
      <div className="title">
        <h1>{auctionTitle}</h1>
        <div className="artist__details">
          <img src={userAvatar.url} alt="" />
          <span>by</span>
          <button type="button">{userName}</button>
        </div>
      </div>
      <div className="auction__details">
        <div className="auction__details__box">
          <p>Starts in:</p>
          <h3>{startsIn}</h3>
        </div>
        <div className="auction__details__box">
          <p>Winners</p>
          <h3>{winners}</h3>
        </div>
        <div className="auction__details__box">
          <p>NFTs Per Winner:</p>
          <h3>{NFTperWinner}</h3>
        </div>
      </div>
    </div>
  );
};

FutureAuction.propTypes = {
  titleImg: PropTypes.oneOfType([PropTypes.object]),
  auctionTitle: PropTypes.string,
  userAvatar: PropTypes.oneOfType([PropTypes.object]),
  userName: PropTypes.string,
  startsIn: PropTypes.string,
  winners: PropTypes.number,
  NFTperWinner: PropTypes.string,
};

FutureAuction.defaultProps = {
  titleImg: {
    type: 'image/svg',
    url: chess,
  },
  auctionTitle: 'Auction Title',
  userAvatar: {
    type: 'image/svg',
    url: avatar,
  },
  userName: 'Justin 3LAU',
  startsIn: '2d : 5h : 20m',
  winners: 35,
  NFTperWinner: '10-7',
};

export default FutureAuction;
