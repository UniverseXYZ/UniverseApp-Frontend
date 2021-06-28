import React from 'react';
import PropTypes, { string } from 'prop-types';
import './Card.scss';
import avatar from '../../assets/images/profilavatar.svg';

const Card = (props) => {
  const { auctionTitle, userAvatar, userName, startsIn, winners, NFTperWinner } = props;
  return (
    <div>
      <img src={userAvatar.url} alt="jfcjsk" />
    </div>
  );
};

Card.propTypes = {
  auctionTitle: PropTypes.string,
  //   children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  userAvatar: PropTypes.string,
  userName: PropTypes.string,
  startsIn: PropTypes.string,
  winners: PropTypes.number,
  NFTperWinner: PropTypes.string,
};

Card.defaultProps = {
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

export default Card;
