import React, { useState, useContext, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import Popup from 'reactjs-popup';
import { useLocation } from 'react-router-dom';
import mp3Icon from '../../assets/images/mp3-icon.png';
import videoIcon from '../../assets/images/video-icon.svg';
import editIcon from '../../assets/images/edit.svg';
import removeIcon from '../../assets/images/remove.svg';
import RemovePopup from '../popups/RemoveNftPopup.jsx';
import NFTPopup from '../popups/NFTPopup.jsx';
import AppContext from '../../ContextAPI';

const NFTs = ({ filteredNFTs }) => {
  const { setActiveView, setShowModal, setSavedNFTsID } = useContext(AppContext);
  const [dropdownID, setDropdownID] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const ref = useRef(null);

  const handleEdit = (id) => {
    document.body.classList.add('no__scroll');
    setSavedNFTsID(id);
    setActiveView('single');
    setShowModal(true);
  };

  const handleClickOutside = (event) => {
    if (!event.target.classList.contains('three__dots')) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (document.getElementById('popup-root')) {
          if (!document.getElementById('popup-root').hasChildNodes()) {
            setShowDropdown(false);
          }
        } else {
          setShowDropdown(false);
        }
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
              {location.state.saved && (
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
                      <li className="edit" onClick={() => handleEdit(nft.id)} aria-hidden="true">
                        <p>Edit</p>
                        <img src={editIcon} alt="Edit Icon" />
                      </li>
                      <Popup
                        trigger={
                          <li className="remove">
                            <p>Remove</p>
                            <img src={removeIcon} alt="Remove Icon" />
                          </li>
                        }
                      >
                        {(close) => (
                          <RemovePopup
                            close={close}
                            nftID={nft.id}
                            removedItemName={nft.name}
                            removeFrom="saved"
                          />
                        )}
                      </Popup>
                    </ul>
                  )}
                </button>
              )}
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
              {nft.generatedEditions.length > 1 ? (
                <div className="collection__count">
                  {`x${nft.generatedEditions.length}`}
                  <div
                    className="generatedEditions"
                    style={{
                      gridTemplateColumns: `repeat(${Math.ceil(
                        nft.generatedEditions.length / 10
                      )}, auto)`,
                    }}
                  >
                    {nft.generatedEditions.map((edition) => (
                      <div key={edition}>{`#${edition}`}</div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="collection__count">{`#${nft.generatedEditions[0]}`}</p>
              )}
            </div>
            {nft.generatedEditions.length > 1 && (
              <>
                <div className="saved__nft__box__highlight__one" />
                <div className="saved__nft__box__highlight__two" />
              </>
            )}
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
