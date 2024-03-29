import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import sizeUpIcon from '../../assets/images/size-up.svg';
import sizeDownIcon from '../../assets/images/size-down.svg';
import closeIcon from '../../assets/images/close-menu.svg';
import arrowIcon from '../../assets/images/arrow.svg';
import frankie from '../../assets/images/frankie.png';

const PreviewNFTsPopup = ({ onClose, onTier }) => {
  const [selectedNFTIndex, setSelectedNFTIndex] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);

  const handleArrowClick = (direction) => {
    if (direction === 'right') {
      if (selectedNFTIndex + 1 < onTier.nfts.length) {
        setSelectedNFTIndex(selectedNFTIndex + 1);
      } else {
        setSelectedNFTIndex(0);
      }
    } else if (selectedNFTIndex > 0) {
      setSelectedNFTIndex(selectedNFTIndex - 1);
    } else {
      setSelectedNFTIndex(onTier.nfts.length - 1);
    }
  };

  useEffect(() => {
    document.body.classList.add('no__scroll');

    return () => document.body.classList.remove('no__scroll');
  }, []);

  return (
    <div className={`preview__nfts__popup ${fullScreen ? 'fullscreen' : ''}`}>
      <div className="slider">
        {fullScreen ? (
          <img
            className="full__screen"
            src={sizeDownIcon}
            alt="Exit Full Screen"
            onClick={() => setFullScreen(false)}
            aria-hidden="true"
          />
        ) : (
          <img
            className="full__screen"
            src={sizeUpIcon}
            alt="Show Full Screen"
            onClick={() => setFullScreen(true)}
            aria-hidden="true"
          />
        )}
        <img className="close" src={closeIcon} alt="Close" onClick={onClose} aria-hidden="true" />

        <div
          className="slider__left__arrow"
          onClick={() => handleArrowClick('left')}
          aria-hidden="true"
        >
          <img src={arrowIcon} alt="Slide left" />
        </div>
        <div
          className="slider__right__arrow"
          onClick={() => handleArrowClick('right')}
          aria-hidden="true"
        >
          <img src={arrowIcon} alt="Slide right" />
        </div>

        <div className="show__selected__nft__image">
          <Animated
            animationIn="zoomIn"
            key={onTier.nfts[selectedNFTIndex].id}
            style={{ height: '100%' }}
          >
            <img
              src={onTier.nfts[selectedNFTIndex].optimized_url}
              alt={onTier.nfts[selectedNFTIndex].name}
            />
          </Animated>
        </div>
      </div>
      <div className="details">
        <div className="tier__details">
          <div className="tier__title">
            <span
              style={{
                backgroundColor: onTier?.color,
              }}
            />
            <h2>{onTier.name}</h2>
          </div>
          <div className="tier__info">
            <span>Bidders #10</span>
            <span>{`${onTier.nftsPerWinner} NFTs per winner`}</span>
            {onTier.minBidValue ? <span>{`Minimum bid: ${onTier.minBidValue} ETH`}</span> : <></>}
          </div>
          <div className="tier__nfts">
            {onTier.nfts.map((nft, index) => (
              <div
                className={`nft__image ${selectedNFTIndex === index ? 'selected' : ''}`}
                key={nft.id}
                onClick={() => setSelectedNFTIndex(index)}
                aria-hidden="true"
              >
                <img src={nft.optimized_url} alt={nft.name} />
              </div>
            ))}
          </div>
        </div>
        <div className="nft__details">
          <h2 className="nft__title">{onTier.nfts[selectedNFTIndex].name}</h2>
          <div className="nft__released">
            <div className="item">
              <span>Released</span>
              {/* // TODO:: we don't have that info yet */}
              {/* <p>{`${onTier.nfts[selectedNFTIndex].releasedDate.toString().split(' ')[1]} ${
                onTier.nfts[selectedNFTIndex].releasedDate.toString().split(' ')[2]
              }, ${onTier.nfts[selectedNFTIndex].releasedDate.toString().split(' ')[3]}`}</p> */}
            </div>
            {onTier.nfts[selectedNFTIndex].collection && (
              <div className="item">
                <span>Collection</span>
                {/* // TODO:: we don't have the info about the collection yet, so you a dummy image */}
                <p>
                  <img
                    // src={URL.createObjectURL(onTier.nfts[selectedNFTIndex].collection.avatar)}
                    src={frankie}
                    alt="onTier.nfts[selectedNFTIndex].collection.name"
                  />
                  onTier.nfts[selectedNFTIndex].collection.name
                </p>
              </div>
            )}
          </div>
          <div className="description">
            {onTier.nfts[selectedNFTIndex].description || onTier.description}
          </div>
        </div>
      </div>
    </div>
  );
};

PreviewNFTsPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onTier: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default PreviewNFTsPopup;
