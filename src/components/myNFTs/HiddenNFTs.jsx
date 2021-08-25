import React, { useEffect, useState, useContext, useRef } from 'react';
import Popup from 'reactjs-popup';
import NFTPopup from '../popups/NFTPopup';
import AppContext from '../../ContextAPI';
import unhideNFTIcon from '../../assets/images/unhide.svg';
import mp3Icon from '../../assets/images/mp3-icon.png';
import videoIcon from '../../assets/images/video-icon.svg';

const HiddenNFTs = () => {
  const { myNFTs, setMyNFTs, setMyNFTsSelectedTabIndex } = useContext(AppContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownID, setDropdownID] = useState(0);
  const ref = useRef(null);

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

  useEffect(() => {
    if (!myNFTs.filter((nft) => nft.hidden).length) {
      setMyNFTsSelectedTabIndex(0);
    }
  }, [myNFTs]);

  return (
    <div className="tab__wallet">
      <div className="nfts__lists">
        {myNFTs
          .filter((nft) => nft.hidden)
          .map((nft, index) => (
            <div className="nft__box" key={nft.id}>
              <div className="nft__box__image" aria-hidden="true">
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
                {nft.previewImage.type !== 'audio/mpeg' &&
                  nft.previewImage.type !== 'video/mp4' && (
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
              <div className="nft__box__name">
                <h3 title={nft.name}>{nft.name}</h3>
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
                      <li className="edit" aria-hidden="true" onClick={() => unhideNFT(nft.id)}>
                        <img src={unhideNFTIcon} alt="Hide" />
                        <p>Unhide</p>
                      </li>
                    </ul>
                  )}
                </button>
              </div>
              <div className="nft__box__footer">
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
                  <></>
                  // <p className="collection__count">{`#${nft.generatedEditions[0]}`}</p>
                )}
              </div>
              {nft.generatedEditions.length > 1 && (
                <>
                  <div className="nft__box__highlight__one" />
                  <div className="nft__box__highlight__two" />
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default HiddenNFTs;
