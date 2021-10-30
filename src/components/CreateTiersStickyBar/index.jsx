/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import Popup from 'reactjs-popup';
import CarouselForNfts from '../carouselForNfts/corouselForNfts';
import mp3Icon from '../../assets/images/mp3-icon.png';
import crossSmall from '../../assets/images/nft-cross.svg';
import RectIcon from '../../assets/images/selectedNft-rect.svg';
import Button from '../button/Button.jsx';
import EditionsRemovePopup from '../popups/EditionsRemovePopup.jsx';

const CreatTiersStickyBar = ({ winnersData, tierSettings, handleContinue, disabled }) => (
  <div className="selected-ntf create-tiers-sticky-bar">
    <div className="container selected-body">
      <div className="infoSelect-div">
        <span>Number of winners : {tierSettings.numberOfWinners}</span>
        <span>NFTs per winner : {tierSettings.nftsPerWinner}</span>
        {winnersData?.length ? (
          <CarouselForNfts winnersData={winnersData} />
        ) : (
          <div className="img-div">
            {winnersData?.nftsData?.length &&
              winnersData.nftsData.map((nft) => (
                <div key={nft.id} className="imgs imgs-mr">
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
                  {nft.numberOfEditions && nft.numberOfEditions > 1 && (
                    <span className="for-editions-count">{nft.numberOfEditions}</span>
                  )}
                  <div className="delete-hover">
                    {nft.numberOfEditions > 1 ? (
                      <span className="upRemove-txt remove-eds">Select editions to remove</span>
                    ) : (
                      <span className="upRemove-txt remove">Remove</span>
                    )}
                    <img className="rec-img" src={RectIcon} alt="down-sideIcon" />
                    {nft.numberOfEditions > 1 ? (
                      <Popup
                        trigger={
                          <img
                            className="del-img"
                            src={crossSmall}
                            alt="delete"
                            aria-hidden="true"
                          />
                        }
                      >
                        {(close) => <EditionsRemovePopup onClose={close} nft={nft} />}
                      </Popup>
                    ) : (
                      <img className="del-img" src={crossSmall} alt="delete" aria-hidden="true" />
                    )}
                  </div>
                </div>
              ))}
            {Array(5)
              .fill(0)
              .map((el, i) => (
                <div className="placeholder" key={uuid()} />
              ))}
          </div>
        )}
      </div>
      <div className="sel-info">
        {/* {nftsPerWinner > previewNFTs.length && (
              <span className="err-select">
                You have not selected enough NFTs for this reward tier
              </span>
            )} */}
        <div className="continue-nft">
          <Button
            onClick={() => handleContinue(winnersData)}
            disabled={!disabled}
            className="light-button"
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  </div>
);

CreatTiersStickyBar.propTypes = {
  winnersData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  tierSettings: PropTypes.oneOfType([PropTypes.object]).isRequired,
  handleContinue: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default CreatTiersStickyBar;
