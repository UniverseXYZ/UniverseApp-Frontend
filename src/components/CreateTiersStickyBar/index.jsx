/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import mp3Icon from '../../assets/images/mp3-icon.png';
import Button from '../button/Button.jsx';

const CreatTiersStickyBar = ({ winnersData, tierSettings, handleContinue }) => {
  const data = winnersData.map((info) => info.nftIds);

  return (
    <div className="selected-ntf create-tiers-sticky-bar">
      <div className="container selected-body">
        <div className="infoSelect-div">
          <span>Number of winners : {tierSettings.numberOfWinners}</span>
          <span>NFTs per winner : {tierSettings.nftsPerWinner}</span>
          {data.map((nft) => (
            <div className="img-div">
              <div key={nft.id} className="imgs">
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
                  <img className="smallView-image" src={mp3Icon} alt="" />
                )}
                {nft.artworkType &&
                  !nft.artworkType.endsWith('mpeg') &&
                  !nft.artworkType.endsWith('mp4') && (
                    <img className="smallView-image" src={nft.url} alt="" />
                  )}
                {/* <img
                    className="del-img"
                    src={crossSmall}
                    onClick={() => handledeleteNft(nft)}
                    alt="delete"
                    aria-hidden="true"
                  /> */}
              </div>
              {Array(5)
                .fill(0)
                .map((el, i) => (
                  <div className="placeholder" key={uuid()} />
                ))}
            </div>
          ))}
        </div>
        <div className="sel-info">
          {/* {nftsPerWinner > previewNFTs.length && (
              <span className="err-select">
                You have not selected enough NFTs for this reward tier
              </span>
            )} */}
          <div className="continue-nft">
            <Button onClick={() => handleContinue(winnersData)} className="light-button">
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

CreatTiersStickyBar.propTypes = {
  winnersData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  tierSettings: PropTypes.oneOfType([PropTypes.object]).isRequired,
  handleContinue: PropTypes.func.isRequired,
};

export default CreatTiersStickyBar;
