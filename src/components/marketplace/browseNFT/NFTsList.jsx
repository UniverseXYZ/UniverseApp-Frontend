import React, { useState } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import './NFTsList.scss';
import priceIcon from '../../../assets/images/marketplace/price.svg';
import videoIcon from '../../../assets/images/marketplace/video-icon.svg';
import audioIcon from '../../../assets/images/marketplace/audio-icon.svg';
import mp3Icon from '../../../assets/images/mp3-icon.png';

const NFTsList = ({ data }) => {
  const [nfts, setNFTs] = useState(data);

  const handleLikeClick = (id) => {
    setNFTs((prevState) =>
      prevState.map((el) =>
        el.id === id
          ? {
              ...el,
              likesCount: el.liked ? el.likesCount - 1 : el.likesCount + 1,
              liked: !el.liked,
            }
          : el
      )
    );
  };

  return (
    <div className="browse--nft--list">
      {nfts.map((nft) => (
        <div className="nft--box" key={uuid()}>
          <div className="nft--box--header">
            <div className="three--images">
              <div className="creator--details">
                <img src={nft.creator.avatar} alt={nft.creator.name} />
                <span className="tooltiptext">{`Creator: ${nft.creator.name}`}</span>
              </div>
              <div className="collection--details">
                <img src={nft.collection.avatar} alt={nft.collection.name} />
                <span className="tooltiptext">{`Collection: ${nft.collection.name}`}</span>
              </div>
              <div className="owner--details">
                <img src={nft.owner.avatar} alt={nft.owner.name} />
                <span className="tooltiptext">{`Owner: ${nft.owner.name}`}</span>
              </div>
            </div>
            <div className="likes--count">
              <svg
                className={nft.liked ? 'fill' : ''}
                onClick={() => handleLikeClick(nft.id)}
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.9998 13.3996C8.15207 13.3996 8.36959 13.302 8.52911 13.2114C12.6113 10.7016 15.1998 7.78044 15.1998 4.8105C15.1998 2.34253 13.4379 0.599609 11.1611 0.599609C9.7974 0.599609 8.7372 1.30007 8.07164 2.38196C8.03914 2.4348 7.96094 2.43454 7.92872 2.38153C7.27515 1.30607 6.20174 0.599609 4.83848 0.599609C2.56174 0.599609 0.799805 2.34253 0.799805 4.8105C0.799805 7.78044 3.38832 10.7016 7.47775 13.2114C7.63002 13.302 7.84754 13.3996 7.9998 13.3996Z"
                  stroke="black"
                  strokeOpacity="0.4"
                  strokeLinecap="round"
                />
              </svg>
              <span>{nft.likesCount}</span>
            </div>
          </div>
          <div className="nft--box--body">
            {nft.media.type !== 'audio/mpeg' && nft.media.type !== 'video/mp4' && (
              <img className="nft--image" src={nft.media.url} alt={nft.name} />
            )}
            {nft.media.type === 'video/mp4' && (
              <video
                onMouseOver={(event) => event.target.play()}
                onFocus={(event) => event.target.play()}
                onMouseOut={(event) => event.target.pause()}
                onBlur={(event) => event.target.pause()}
              >
                <source src={nft.media.url} type="video/mp4" />
                <track kind="captions" />
                Your browser does not support the video tag.
              </video>
            )}
            {nft.media.type === 'audio/mpeg' && (
              <img className="nft--image" src={mp3Icon} alt={nft.name} />
            )}
            {nft.media.type === 'video/mp4' && (
              <div className="video__icon">
                <img src={videoIcon} alt="Video Icon" />
              </div>
            )}
            {nft.media.type === 'audio/mpeg' && (
              <div className="video__icon">
                <img src={audioIcon} alt="Video Icon" />
              </div>
            )}
          </div>
          <div className="nft--box--footer">
            <div className="name--and--price">
              <h4>{nft.name}</h4>
              <div className="price--div">
                <img src={priceIcon} alt="Price" />
                <span>{nft.price}</span>
              </div>
            </div>
            <div className="quantity--and--offer">
              <p>{nft.quantity}</p>
              <div className="price--offer--div">
                <label>Offer for</label>
                <img src={priceIcon} alt="Price" />
                <span>{nft.offerFor}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

NFTsList.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]),
};

NFTsList.defaultProps = {
  data: [],
};

export default NFTsList;
