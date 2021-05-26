import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import uuid from 'react-uuid';
import closeIcon from '../../assets/images/close-menu.svg';
import AppContext from '../../ContextAPI';
import buyerImage from '../../assets/images/nft-buyer.png';
import hrefIcon from '../../assets/images/href.svg';

const NFTPopup = ({ onClose, onNFT }) => {
  const { loggedInArtist } = useContext(AppContext);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const PLACEHOLDER_NFT_BUYER = 'Fran Solo';

  useEffect(() => {
    document.body.classList.add('no__scroll');

    return () => document.body.classList.remove('no__scroll');
  }, []);

  return (
    <div className="nft__popup">
      <div className="slider">
        <img className="close" src={closeIcon} alt="Close" onClick={onClose} aria-hidden="true" />

        <div className="show__selected__nft__image">
          <Animated animationIn="zoomIn" key={onNFT.id} style={{ height: '100%' }}>
            <img src={URL.createObjectURL(onNFT.previewImage)} alt={onNFT.previewImage} />
          </Animated>
        </div>
      </div>
      <div className="details">
        <h1 className="nft__title">{onNFT.name}</h1>
        <div className="genesis__link">
          <span>Genesis link: </span>
          <a href="https://niftygateway.com/3LAU" target="_blank" rel="noreferrer">
            niftygateway.com/3LAU
          </a>
        </div>
        <p className="description">{onNFT.description}</p>

        <div className="nft__creator">
          {loggedInArtist.name && loggedInArtist.avatar && (
            <div className="item">
              <span>Creator</span>
              <p>
                <img src={URL.createObjectURL(loggedInArtist.avatar)} alt={loggedInArtist.name} />
                {loggedInArtist.name}
              </p>
            </div>
          )}
          {onNFT.type === 'collection' && (
            <div className="item">
              <span>Collection</span>
              <p>
                {typeof onNFT.collectionAvatar === 'string' &&
                onNFT.collectionAvatar.startsWith('#') ? (
                  <b
                    className="random__bg__color"
                    style={{ backgroundColor: onNFT.collectionAvatar }}
                  >
                    {onNFT.collectionName.charAt(0)}
                  </b>
                ) : (
                  <img
                    src={URL.createObjectURL(onNFT.collectionAvatar)}
                    alt={onNFT.collectionName}
                  />
                )}
                {onNFT.collectionName}
              </p>
            </div>
          )}
        </div>

        <div className="tabs">
          <button
            type="button"
            onClick={() => setSelectedTabIndex(0)}
            className={selectedTabIndex === 0 ? 'selected' : ''}
          >
            Properties
          </button>
          <button
            type="button"
            onClick={() => setSelectedTabIndex(1)}
            className={selectedTabIndex === 1 ? 'selected' : ''}
          >
            History
          </button>
        </div>
        <div className="tab__content">
          <Animated animationIn="fadeIn" key={uuid()}>
            {selectedTabIndex === 0 ? (
              onNFT.properties[0].name ? (
                <div className="property__container">
                  {onNFT.properties.map((property) => (
                    <div className="property__box" key={uuid()}>
                      <div className="property__name">{property.name}</div>
                      <div className="property__value">{property.value}</div>
                      <div className="property__percent">58% have this trait</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no__properties">No properties</div>
              )
            ) : (
              <div className="history__container">
                <div className="boughtBy__box">
                  <div>
                    <img className="buyerImage" src={buyerImage} alt="Buyer" />
                  </div>
                  <div className="info">
                    <div className="buyer__name">
                      Bought by <b>{PLACEHOLDER_NFT_BUYER}</b>
                    </div>
                    <div className="time">2 weeks ago</div>
                  </div>
                  <div>
                    <img src={hrefIcon} alt="href" />
                  </div>
                </div>
                <div className="boughtBy__box">
                  <div>
                    <img
                      className="buyerImage"
                      src={URL.createObjectURL(loggedInArtist.avatar)}
                      alt="seller"
                    />
                  </div>
                  <div className="info">
                    <div className="buyer__name">
                      Put on sale by <b>{loggedInArtist.name}</b>
                    </div>
                    <div className="time">2 weeks ago</div>
                  </div>
                  <div>
                    <img src={hrefIcon} alt="href" />
                  </div>
                </div>
                <div className="boughtBy__box">
                  <div>
                    <img
                      className="buyerImage"
                      src={URL.createObjectURL(loggedInArtist.avatar)}
                      alt="seller"
                    />
                  </div>
                  <div className="info">
                    <div className="buyer__name">
                      Minted by <b>{loggedInArtist.name}</b>
                    </div>
                    <div className="time">2 weeks ago</div>
                  </div>
                  <div>
                    <img src={hrefIcon} alt="href" />
                  </div>
                </div>
              </div>
            )}
          </Animated>
        </div>
      </div>
    </div>
  );
};

NFTPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onNFT: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default NFTPopup;
