/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import audioIcon from '../../assets/images/marketplace/audio-icon.svg';
import mp3Icon from '../../assets/images/mp3-icon.png';
import Select from '../availableNFTsEditionSelect';
import universeIcon from '../../assets/images/universe-img.svg';

const NFTCard = React.memo(({ data, onEditionClick, canSelect }) => {
  const { nfts, collection, optimized_url: url, artworkType } = data;
  const selectOptions = nfts.rewardAndTokenIds.map(({ tokenId, id }) => ({
    value: `${tokenId}||${id}||${url}||${artworkType}`,
    label: `#${tokenId}`,
  }));

  return (
    <div className={`nft--card nft__box ${canSelect ? 'can--select' : 'disabled'}`}>
      <div className="nft--card--body" aria-hidden="true">
        <div aria-hidden="true">
          {nfts.artworkType !== 'audio/mpeg' && nfts.artworkType !== 'mp4' && (
            <img className="nft--image" src={nfts.optimized_url} alt={nfts.name} />
          )}
          {nfts.artworkType === 'mp4' && (
            <video
              onMouseOver={(event) => event.target.play()}
              onFocus={(event) => event.target.play()}
              onMouseOut={(event) => event.target.pause()}
              onBlur={(event) => event.target.pause()}
              muted
            >
              <source src={nfts.optimized_url} type="video/mp4" />
              <track kind="captions" />
              Your browser does not support the video tag.
            </video>
          )}
          {nfts.artworkType === 'audio/mpeg' && (
            <img className="nft--image" src={mp3Icon} alt={nfts.name} />
          )}
          {nfts.artworkType === 'audio/mpeg' && (
            <div className="video--icon">
              <img src={audioIcon} alt="Video Icon" />
            </div>
          )}
        </div>
      </div>
      <div className="nft--card--footer">
        <div className="name--and--price">
          <h4>{nfts.name}</h4>
          <Select options={selectOptions} onChange={onEditionClick} isMulti />
        </div>
        <div className="quantity--and--offer">
          <div className="collection__details">
            {collection && (
              <>
                {collection.address ===
                process.env.REACT_APP_UNIVERSE_ERC_721_ADDRESS.toLowerCase() ? (
                  <img src={universeIcon} alt={collection.name} />
                ) : (
                  <img src={collection.coverUrl} alt={collection.name} />
                )}
                <span>{collection.name}</span>
              </>
            )}
          </div>
          <div className="collection__count">{`x${nfts.rewardAndTokenIds.length}`}</div>
        </div>
      </div>
      {nfts.rewardAndTokenIds.length > 1 && (
        <>
          <div className="nft__box__highlight__one" />
          <div className="nft__box__highlight__two" />
        </>
      )}
      {/* {selectedNFTsIds && selectedNFTsIds.includes(nft.id) && (
        <div className="nft--selected">
          <img src={checkIcon} alt="img" />
        </div>
      )} */}
    </div>
  );
});

NFTCard.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  onEditionClick: PropTypes.func.isRequired,
  canSelect: PropTypes.bool.isRequired,
};

export default NFTCard;
