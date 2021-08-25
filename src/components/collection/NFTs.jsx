import React, { useState, useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import Popup from 'reactjs-popup';
import mp3Icon from '../../assets/images/mp3-icon.png';
import videoIcon from '../../assets/images/video-icon.svg';
import NFTPopup from '../popups/NFTPopup.jsx';
import hideIcon from '../../assets/images/hide.svg';
import unhideIcon from '../../assets/images/unhide.svg';
import AppContext from '../../ContextAPI';

const NFTs = ({ filteredNFTs }) => {
  const { myNFTs, setMyNFTs } = useContext(AppContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownID, setDropdownID] = useState(0);
  const ref = useRef(null);

  const hideNFT = (id) => {
    setMyNFTs(myNFTs.map((item) => (item.id === id ? { ...item, hidden: true } : item)));
  };

  const unhideNFT = (id) => {
    setMyNFTs(myNFTs.map((item) => (item.id === id ? { ...item, hidden: false } : item)));
  };

  const handleClickOutside = (event) => {
    if (!event.target.classList.contains('three__dots')) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return (
    <div className="saved__nfts__lists">
      {filteredNFTs.length ? (
        filteredNFTs.map((nft) => (
          <div className="saved__nft__box" key={uuid()}>
            <div className="saved__nft__box__image" aria-hidden="true">
              {nft.previewImage.type === 'video/mp4' && (
                <Popup
                  trigger={
                    <video
                      onMouseOver={(event) => event.target.play()}
                      onFocus={(event) => event.target.play()}
                      onMouseOut={(event) => event.target.pause()}
                      onBlur={(event) => event.target.pause()}
                    >
                      <source src={URL.createObjectURL(nft.previewImage)} type="video/mp4" />
                      <track kind="captions" />
                      Your browser does not support the video tag.
                    </video>
                  }
                >
                  {(close) => <NFTPopup onClose={close} onNFT={nft} />}
                </Popup>
              )}
              {nft.previewImage.type === 'audio/mpeg' && (
                <Popup trigger={<img className="preview-image" src={mp3Icon} alt={nft.name} />}>
                  {(close) => <NFTPopup onClose={close} onNFT={nft} />}
                </Popup>
              )}
              {nft.previewImage.type !== 'audio/mpeg' && nft.previewImage.type !== 'video/mp4' && (
                <Popup
                  trigger={
                    <img
                      className="preview-image"
                      src={URL.createObjectURL(nft.previewImage)}
                      alt={nft.name}
                    />
                  }
                >
                  {(close) => <NFTPopup onClose={close} onNFT={nft} />}
                </Popup>
              )}
              {nft.previewImage.type === 'video/mp4' && (
                <img className="video__icon" src={videoIcon} alt="Video Icon" />
              )}
            </div>
            <div className="saved__nft__box__name">
              <h3>{nft.name}</h3>
              <button
                type="button"
                className="three__dots"
                onClick={() => {
                  setShowDropdown(!showDropdown);
                  setDropdownID(nft.id);
                }}
              >
                <span />
                <span />
                <span />
                {dropdownID === nft.id && showDropdown && (
                  <ul ref={ref} className="edit__remove">
                    {nft.hidden ? (
                      <li className="edit" aria-hidden="true" onClick={() => unhideNFT(nft.id)}>
                        <img src={unhideIcon} alt="Unhide" />
                        <p>Unhide</p>
                      </li>
                    ) : (
                      <li className="edit" aria-hidden="true" onClick={() => hideNFT(nft.id)}>
                        <img src={hideIcon} alt="Hide" />
                        <p>Hide</p>
                      </li>
                    )}
                  </ul>
                )}
              </button>
            </div>
            <div className="saved__nft__box__footer">
              <div className="collection__details">
                {nft.type === 'collection' && (
                  <>
                    {typeof nft.collectionAvatar === 'string' &&
                    nft.collectionAvatar.startsWith('#') ? (
                      <div
                        className="random__bg__color"
                        style={{ backgroundColor: nft.collectionAvatar }}
                      >
                        {nft.collectionName.charAt(0)}
                      </div>
                    ) : (
                      <img
                        src={URL.createObjectURL(nft.collectionAvatar)}
                        alt={nft.collectionName}
                      />
                    )}
                    <span>{nft.collectionName}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="no__result">No Result</div>
      )}
    </div>
  );
};

NFTs.propTypes = {
  filteredNFTs: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default NFTs;
