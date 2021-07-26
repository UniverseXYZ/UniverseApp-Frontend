import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import checkIcon from '../../assets/images/check-black.svg';
import count from '../../assets/images/slidecounts.svg';
import videoIcon from '../../assets/images/marketplace/video-icon.svg';
import audioIcon from '../../assets/images/marketplace/audio-icon.svg';
import mp3Icon from '../../assets/images/mp3-icon.png';
import priceIcon from '../../assets/images/marketplace/price.svg';
import './styles/NftGalleryItemCard.scss';

const NftGalleryItemCard = (props) => {
  const { nft, onClick, ...restProps } = props;
  const [active, setActive] = useState(false);
  const [nftCopy, setNFTCopy] = useState(nft);
  const history = useHistory();

  const handleLikeClick = () => {
    setNFTCopy({
      ...nftCopy,
      likesCount: !nftCopy.liked ? nft.likesCount + 1 : nft.likesCount,
      liked: !nftCopy.liked,
    });
  };

  useEffect(() => {
    setNFTCopy({ ...nft });
  }, [nft]);

  return (
    <div
      className={
        !active
          ? 'nft--gallery--item--card--parent'
          : 'nft--gallery--item--card--parent nft--gallery--item--card--parent--avtive'
      }
      aria-hidden="true"
      onClick={() => {
        setActive(!active);
        if (!active) onClick({ ...nft }, true);
        else onClick({ ...nft }, false);
      }}
      {...restProps}
    >
      <div className="nft--gallery--item--card--child">
        <div className="nft--box--header">
          <div className="three--images">
            <div className="creator--details">
              <img src={nftCopy.creator.avatar} alt={nftCopy.creator.name} />
              <span className="tooltiptext">{`Creator: ${nftCopy.creator.name}`}</span>
            </div>
            <div className="collection--details">
              <img src={nftCopy.collection.avatar} alt={nftCopy.collection.name} />
              <span className="tooltiptext">{`Collection: ${nftCopy.collection.name}`}</span>
            </div>
            <div className="owner--details">
              <img src={nftCopy.owner.avatar} alt={nftCopy.owner.name} />
              <span className="tooltiptext">{`Owner: ${nftCopy.owner.name}`}</span>
            </div>
          </div>
          {nftCopy.type === 'bundles' ? (
            <div className="bundles--count">
              <img src={count} alt="cover" />
              <span>{nftCopy.allItems.length}</span>
            </div>
          ) : (
            <div className="likes--count">
              <div>
                <svg
                  className={nftCopy.liked ? 'fill' : ''}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLikeClick();
                  }}
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
                <div className="tooltiptext">
                  <div className="likers--text">{`${nftCopy.likesCount} people liked this`}</div>
                  <div className="likers--avatars">
                    <img src={nftCopy.owner.avatar} alt="Liker" />
                    <img src={nftCopy.owner.avatar} alt="Liker" />
                    <img src={nftCopy.owner.avatar} alt="Liker" />
                    <img src={nftCopy.owner.avatar} alt="Liker" />
                    <img src={nftCopy.owner.avatar} alt="Liker" />
                    <img src={nftCopy.owner.avatar} alt="Liker" />
                  </div>
                </div>
              </div>
              <span>{nftCopy.likesCount}</span>
            </div>
          )}
        </div>
        <div className="nft--box--body" aria-hidden="true">
          <div>
            {nftCopy.media.type !== 'audio/mpeg' && nftCopy.media.type !== 'video/mp4' && (
              <img className="nft--image" src={nftCopy.media.url} alt={nftCopy.name} />
            )}
            {nftCopy.media.type === 'video/mp4' && (
              <video
                onMouseOver={(event) => event.target.play()}
                onFocus={(event) => event.target.play()}
                onMouseOut={(event) => event.target.pause()}
                onBlur={(event) => event.target.pause()}
                muted
              >
                <source src={nftCopy.media.url} type="video/mp4" />
                <track kind="captions" />
                Your browser does not support the video tag.
              </video>
            )}
            {nftCopy.media.type === 'audio/mpeg' && (
              <img className="nft--image" src={mp3Icon} alt={nft.name} />
            )}
            {nftCopy.media.type === 'video/mp4' && (
              <div className="video__icon">
                <img src={videoIcon} alt="Video Icon" />
              </div>
            )}
            {nftCopy.media.type === 'audio/mpeg' && (
              <div className="video__icon">
                <img src={audioIcon} alt="Video Icon" />
              </div>
            )}
          </div>
        </div>
        <div className="nft--box--footer">
          <div className="name--and--price">
            <h4>{nftCopy.name}</h4>
          </div>
          <div className="quantity--and--offer">
            <p>{nftCopy.editions}</p>
            <div className="price--offer--div">
              <label>Last</label>
              <img src={priceIcon} alt="Price" />
              <span>{nftCopy.price}</span>
            </div>
          </div>
        </div>
      </div>
      {active && (
        <div className="nft--selected">
          <img src={checkIcon} alt="img" />
        </div>
      )}
    </div>
  );
};

NftGalleryItemCard.propTypes = {
  nft: PropTypes.shape({
    editions: PropTypes.string,
    offerFor: PropTypes.number,
    likesCount: PropTypes.number,
    media: PropTypes.shape({ type: PropTypes.string, url: PropTypes.string }),
    name: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    type: PropTypes.string,
    liked: PropTypes.bool,
    allItems: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
        type: PropTypes.string,
      })
    ),
    creator: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
    collection: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
    owner: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default NftGalleryItemCard;
