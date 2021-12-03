import React from 'react';
import PropTypes from 'prop-types';
import './NftCard.scss';
import uuid from 'react-uuid';
import universeIcon from '../../../../assets/images/universe-img.svg';
import mp3Icon from '../../../../assets/images/mp3-icon.png';
import videoIcon from '../../../../assets/images/video-icon.svg';

const NftCard = ({
  artworkType,
  url,
  count,
  nftName,
  collectioName,
  collectionAddress,
  collectionUrl,
  tokenIdString,
  nftIsImage,
}) => (
  <div className="rev-reward__box" key={uuid}>
    <div className="rev-reward__box__image">
      {artworkType === 'mp4' ? (
        <video
          onMouseOver={(event) => event.target.play()}
          onFocus={(event) => event.target.play()}
          onMouseOut={(event) => event.target.pause()}
          onBlur={(event) => event.target.pause()}
        >
          <source src={url} type="video/mp4" />
          <track kind="captions" />
          Your browser does not support the video tag.
        </video>
      ) : artworkType === 'mpeg' ? (
        <img className="preview-image" src={mp3Icon} alt={nftName} />
      ) : (
        <img className="preview-image" src={url} alt={nftName} />
      )}
      {artworkType === 'mp4' && <img className="video__icon" src={videoIcon} alt="Video Icon" />}
    </div>
    <div className="rev-reward__box__name">
      <h3>{nftName}</h3>
    </div>
    <div className="rev-reward__box__footer">
      <div className="collection__details">
        {collectioName && (
          <>
            {!collectionUrl ? (
              <div className="random__bg__color" style={{ backgroundColor: collectionUrl }}>
                {collectioName.charAt(0)}
              </div>
            ) : collectionAddress ===
              process.env.REACT_APP_UNIVERSE_ERC_721_ADDRESS.toLowerCase() ? (
              <img src={universeIcon} alt={collectioName} />
            ) : (
              <img src={collectionUrl} alt={collectioName} />
            )}
            <span>{collectioName}</span>
          </>
        )}
      </div>
      <div>
        {count > 1 ? (
          <div className="tickeid-popup">
            <span className="ed-count">{`x${count || 1}`}</span>
            <div className="tooltiptext nft-tokenid-block">
              <span className="nft-tokenid-title">Token IDs: </span>
              <span className="nft-tokenids">{tokenIdString}</span>
            </div>
          </div>
        ) : (
          <span className="ed-count">{`x${count || 1}`}</span>
        )}
      </div>
    </div>
    {count > 1 && (
      <>
        <div className="rev-reward__box__highlight__one" />
        <div className="rev-reward__box__highlight__two" />
      </>
    )}
  </div>
);
NftCard.propTypes = {
  artworkType: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  nftName: PropTypes.string.isRequired,
  collectioName: PropTypes.string.isRequired,
  collectionAddress: PropTypes.string.isRequired,
  collectionUrl: PropTypes.string.isRequired,
  tokenIdString: PropTypes.string.isRequired,
  nftIsImage: PropTypes.bool.isRequired,
};

export default NftCard;
