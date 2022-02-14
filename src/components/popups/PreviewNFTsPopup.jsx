import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactReadMoreReadLess from 'react-read-more-less';
import { Animated } from 'react-animated-css';
import sizeUpIcon from '../../assets/images/size-up.svg';
import sizeDownIcon from '../../assets/images/size-down.svg';
import closeIcon from '../../assets/images/close-menu.svg';
import arrowIcon from '../../assets/images/arrow.svg';
import frankie from '../../assets/images/frankie.png';
import BiddersDropdown from '../input/biddersDropdown/BiddersDropdown';
import universeIcon from '../../assets/images/universe-img.svg';
import videoIcon from '../../assets/images/video-icon.svg';

const PreviewNFTsPopup = ({ onClose, tier, auction, startPlace, endPlace }) => {
  const [selectedNFTIndex, setSelectedNFTIndex] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  const [selectedBidderIndex, setSelectedBidderIndex] = useState(startPlace);
  const [slotReserveValue, setSlotReserveValue] = useState(0);
  const [filteredNfts, setFilteredNfts] = useState([]);

  useEffect(() => {
    const filteredByBidder = tier.nfts.filter((nft) => nft.slot === selectedBidderIndex);
    const groupedTokenIds = filteredByBidder.reduce(
      (acc, nft) => ({ ...acc, [nft.editionUUID]: [...(acc[nft.editionUUID] || []), nft.tokenId] }),
      {}
    );
    let uniqueFiltered = [
      ...new Map(filteredByBidder.map((item) => [item.editionUUID, item])).values(),
    ];

    uniqueFiltered = uniqueFiltered.map((nft) => ({
      ...nft,
      tokenIds: groupedTokenIds[nft.editionUUID],
    }));

    setFilteredNfts(uniqueFiltered);
    const slot = tier.slots?.find((s) => s.index === selectedBidderIndex);
    setSelectedNFTIndex(0);
    setSlotReserveValue(slot?.minimumBid || 0);
  }, [selectedBidderIndex]);

  const handleArrowClick = (direction) => {
    if (direction === 'right') {
      if (selectedNFTIndex + 1 < filteredNfts.length) {
        setSelectedNFTIndex(selectedNFTIndex + 1);
      } else {
        setSelectedNFTIndex(0);
      }
    } else if (selectedNFTIndex > 0) {
      setSelectedNFTIndex(selectedNFTIndex - 1);
    } else {
      setSelectedNFTIndex(filteredNfts.length - 1);
    }
  };

  const getCollection = (nft) => {
    const nftCollection = auction.collections.filter(
      (collection) => collection.id === nft.collectionId
    )[0];

    return nftCollection;
  };

  useEffect(() => {
    document.body.classList.add('no__scroll');

    return () => document.body.classList.remove('no__scroll');
  }, []);

  const selectedNFT = filteredNfts[selectedNFTIndex];

  return selectedNFT ? (
    <div className={`preview__nfts__popup ${fullScreen ? 'fullscreen' : ''}`}>
      <div className="slider" style={{ backgroundColor: 'black' }}>
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
          <Animated animationIn="zoomIn" key={selectedNFT.id} style={{ height: '100%' }}>
            {selectedNFT.artworkType === 'mp4' ? (
              <video aria-hidden className="preview-video" controls>
                <source src={selectedNFT.optimized_url} type="video/mp4" />
                <track kind="captions" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img src={selectedNFT.optimized_url} alt={selectedNFT.name} />
            )}
          </Animated>
        </div>
      </div>
      <div className="details">
        <div className="tier__details__header">
          <div className="tier__title">
            <span
              style={{
                backgroundColor: tier?.color,
              }}
            />
            <h2>{tier.name}</h2>
          </div>

          <div className="tier__info">
            <span>
              {startPlace !== endPlace
                ? `Bidders #${startPlace}-${endPlace}`
                : `Bidder #${startPlace}`}
            </span>
            <span>NFTs: {tier.nfts.length}</span>
          </div>
        </div>

        <div className="tier__details__body">
          <div className="tier__details__body__dropdown__block">
            <BiddersDropdown
              startPlace={startPlace}
              endPlace={endPlace}
              setSelectedBidderIndex={setSelectedBidderIndex}
            />
            <div className="tier__info">
              <span>{`Reserve value: ${slotReserveValue} ETH`}</span>
            </div>
          </div>

          <div className="tier__nfts">
            {filteredNfts.map((nft, index) => {
              if (nft.artworkType === 'mp4') {
                return (
                  <div
                    key={nft.id}
                    className={`nft__image ${selectedNFTIndex === index ? 'selected' : ''}`}
                    onClick={() => setSelectedNFTIndex(index)}
                    aria-hidden="true"
                  >
                    <video aria-hidden className="preview-video">
                      <source src={nft.optimized_url} type="video/mp4" />
                      <track kind="captions" />
                      Your browser does not support the video tag.
                    </video>
                    <img className="video-icon" src={videoIcon} alt="Video Icon" />
                  </div>
                );
              }

              return (
                <div
                  className={`nft__image ${selectedNFTIndex === index ? 'selected' : ''}`}
                  key={nft.id}
                  onClick={() => setSelectedNFTIndex(index)}
                  aria-hidden="true"
                >
                  <img src={nft.optimized_url} alt={nft.name} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="nft__details">
          <h2 className="nft__title">{selectedNFT.name}</h2>
          <div className="nft__editions">
            <div className="item">
              <span>Editions</span>
              <p>
                {`${selectedNFT.tokenIds.length}/${selectedNFT.numberOfEditions}`}
                <span className="tooltiptext">
                  <span className="title">Token IDs:</span>
                  {selectedNFT.tokenIds.map(
                    (tokenId, index) =>
                      `#${tokenId}${selectedNFT.tokenIds.length - 1 !== index ? ', ' : ''}`
                  )}
                </span>
              </p>
            </div>
            <div
              className="item"
              aria-hidden
              onClick={() =>
                window.open(
                  `${window.location.origin}/collection/${getCollection(selectedNFT).address}`
                )
              }
            >
              <span>Collection</span>
              {/* // TODO:: we don't have the info about the collection yet, so you a dummy image */}
              <p>
                <img
                  src={
                    getCollection(selectedNFT).coverUrl
                      ? getCollection(selectedNFT).coverUrl
                      : universeIcon
                  }
                  alt="onselectedNFT.collection.name"
                />
                {getCollection(selectedNFT).name}
              </p>
            </div>
          </div>
          <div className="description">
            <ReactReadMoreReadLess
              charLimit={200}
              readMoreText="Read more"
              readLessText="Read less"
            >
              {selectedNFT.description || tier.description || ''}
            </ReactReadMoreReadLess>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

PreviewNFTsPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  tier: PropTypes.oneOfType([PropTypes.object]).isRequired,
  auction: PropTypes.oneOfType([PropTypes.object]).isRequired,
  startPlace: PropTypes.number.isRequired,
  endPlace: PropTypes.number.isRequired,
};

export default PreviewNFTsPopup;
