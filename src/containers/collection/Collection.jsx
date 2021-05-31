import React, { useContext, useEffect, useState, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Popup from 'reactjs-popup';
import uuid from 'react-uuid';
import NotFound from '../../components/notFound/NotFound.jsx';
import AppContext from '../../ContextAPI';
import './Collection.scss';
import Cover from '../../components/collection/Cover.jsx';
import Avatar from '../../components/collection/Avatar.jsx';
import Title from '../../components/collection/Title.jsx';
import Description from '../../components/collection/Description.jsx';
import Filters from '../../components/collection/Filters.jsx';
import mp3Icon from '../../assets/images/mp3-icon.png';
import videoIcon from '../../assets/images/video-icon.svg';
import editIcon from '../../assets/images/edit.svg';
import removeIcon from '../../assets/images/remove.svg';
import RemovePopup from '../../components/popups/RemoveNftPopup.jsx';
import MintModal from '../../components/mintModal/MintModal.jsx';
import NFTPopup from '../../components/popups/NFTPopup.jsx';

const Collection = () => {
  const {
    myNFTs,
    savedNfts,
    setWebsite,
    setActiveView,
    showModal,
    setShowModal,
    setSavedNFTsID,
    savedCollections,
  } = useContext(AppContext);
  const location = useLocation();
  const selectedCollection = location.state ? location.state.collection : null;
  const [collectionNFTs, setCollectionNFTs] = useState([]);
  const [filteredNFTs, setFilteredNFTs] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownID, setDropdownID] = useState(0);
  const [search, setSearch] = useState('');
  const ref = useRef(null);
  const history = useHistory();

  const handleClose = () => {
    document.body.classList.remove('no__scroll');
    setShowModal(false);
  };

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

  useEffect(() => {
    const newFilteredNFTs = [];
    collectionNFTs.forEach((nft) => {
      if (nft.name.toLowerCase().includes(search.toLowerCase())) {
        newFilteredNFTs.push(nft);
      }
    });
    setFilteredNFTs(newFilteredNFTs);
  }, [search]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setWebsite(false);
    const newNFTs = [];
    if (location.state && location.state.saved) {
      savedNfts.forEach((nft) => {
        if (nft.collectionId === selectedCollection.id) {
          newNFTs.push(nft);
        }
      });
    } else {
      myNFTs.forEach((nft) => {
        if (nft.collectionId === selectedCollection.id) {
          newNFTs.push(nft);
        }
      });
    }
    setCollectionNFTs(newNFTs);
    setFilteredNFTs(newNFTs);
  }, [savedNfts]);

  useEffect(() => {
    let check = false;
    savedCollections.forEach((col) => {
      if (
        selectedCollection.id === col.id &&
        selectedCollection.description === col.description &&
        selectedCollection.previewImage.name === col.previewImage.name
      ) {
        check = true;
      }
    });
    if (selectedCollection && !check) {
      history.push('/my-nfts');
    }
  }, [savedCollections]);

  return selectedCollection ? (
    <div className="collection__page">
      <Cover selectedCollection={selectedCollection} saved={location.state.saved} />

      <div className="collection__details__section">
        <div className="collection__details__container">
          <Avatar selectedCollection={selectedCollection} />
          <Title selectedCollection={selectedCollection} saved={location.state.saved} />
          <Description selectedCollection={selectedCollection} />
          {collectionNFTs.length ? (
            <>
              <Filters search={search} setSearch={setSearch} />
              <div className="saved__nfts__lists">
                {filteredNFTs.map((nft) => (
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
                              <source
                                src={URL.createObjectURL(nft.previewImage)}
                                type="video/mp4"
                              />
                              <track kind="captions" />
                              Your browser does not support the video tag.
                            </video>
                          }
                        >
                          {(close) => <NFTPopup onClose={close} onNFT={nft} />}
                        </Popup>
                      )}
                      {nft.previewImage.type === 'audio/mpeg' && (
                        <Popup
                          trigger={<img className="preview-image" src={mp3Icon} alt={nft.name} />}
                        >
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
                              <li
                                className="edit"
                                onClick={() => handleEdit(nft.id)}
                                aria-hidden="true"
                              >
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
                ))}
              </div>
            </>
          ) : (
            <></>
          )}
          {showModal && <MintModal open={showModal} onClose={handleClose} />}
        </div>
      </div>
    </div>
  ) : (
    <NotFound />
  );
};

export default Collection;
