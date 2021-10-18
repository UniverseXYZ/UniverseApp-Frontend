/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import audioIcon from '../../assets/images/marketplace/audio-icon.svg';
import mp3Icon from '../../assets/images/mp3-icon.png';
import Select from '../select/SelectComponent';
import SearchFilters from '../nft/SearchFilters';

const NFTCard = React.memo(({ data, onEditionClick }) => {
  const { nfts, collection } = data;
  const selectOptions = nfts.rewardAndTokenIds.map(({ tokenId, id }) => ({
    value: `${tokenId}/${id}`,
    label: `#${tokenId}`,
  }));

  return (
    <div className="nft--card can--select">
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
          <p>{`${nfts.rewardAndTokenIds.length} / ${nfts.numberOfEditions}`}</p>
        </div>
      </div>
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
};

export default NFTCard;
