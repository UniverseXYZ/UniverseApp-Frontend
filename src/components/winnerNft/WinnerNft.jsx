import React from 'react';
import './WinnerNft.scss';
import PropTypes from 'prop-types';
import mp3Icon from '../../assets/images/mp3-icon.png';

const WinnerNFT = ({ nft }) => (
  <div key={nft.id} className="imgs imgs-winner">
    {nft.artworkType && nft.artworkType.endsWith('mp4') && (
      <video
        className="smallView-image"
        onMouseOver={(event) => event.target.play()}
        onFocus={(event) => event.target.play()}
        onMouseOut={(event) => event.target.pause()}
        onBlur={(event) => event.target.pause()}
      >
        <source src={nft.url} type="video/mp4" />
        <track kind="captions" />
        Your browser does not support the video tag.
      </video>
    )}
    {nft.artworkType && nft.artworkType.endsWith('mpeg') && (
      <img className="smallView-image" src={mp3Icon} alt={nft.name} />
    )}
    {nft.artworkType && !nft.artworkType.endsWith('mpeg') && !nft.artworkType.endsWith('mp4') && (
      <img className="smallView-image" src={nft.url} alt={nft.name} />
    )}
  </div>
);

WinnerNFT.propTypes = {
  nft: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default WinnerNFT;
