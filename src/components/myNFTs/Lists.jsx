import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import Popup from 'reactjs-popup';
import AppContext from '../../ContextAPI';
import mp3Icon from '../../assets/images/mp3-icon.png';
import videoIcon from '../../assets/images/video-icon.svg';
import checkIcon from '../../assets/images/check-nft.svg';
import nonSelecting from '../../assets/images/nonSelecting.svg';
import vector from '../../assets/images/vector2.svg';
import NFTPopup from '../popups/NFTPopup';

const Lists = ({
  data,
  perPage,
  offset,
  selectedNFTIds,
  setSelectedNFTIds,
  winners,
  nftsPerWinner,
}) => {
  const sliceData = data.slice(offset, offset + perPage);

  const location = useLocation();
  const isCreatingAction = location.pathname === '/create-tiers';

  const { auction } = useContext(AppContext);

  const [openEditions, setOpenEditions] = useState(null);
  const [hideIcon, setHideIcon] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selectedNft, SetSelectedNft] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedEditions, setSelectedEditions] = useState({});

  const tierById = !!(winners && nftsPerWinner);
  const editMode = auction.tiers.find((element) => element.id === location.state);

  const activateInfo = (index) => {
    setHideIcon(true);
    setActiveIndex(index);
  };

  const handleSavedNfts = (clickedNFT) => {
    if (isCreatingAction) {
      if (tierById && winners <= clickedNFT.generatedEditions.length) {
        if (nftsPerWinner > selectedNFTIds.length || selectedNFTIds.includes(clickedNFT.id))
          setSelectedNFTIds((prevValue) => {
            const nftIndex = prevValue.findIndex((nft) => nft === clickedNFT.id);
            if (nftIndex !== -1) {
              return [...prevValue.slice(0, nftIndex), ...prevValue.slice(nftIndex + 1)];
            }
            return [...prevValue, clickedNFT.id];
          });
      }
    }
  };

  useEffect(() => {
    if (editMode) {
      const newSelectedNFTIds = [];
      editMode.nfts.forEach((nft) => {
        newSelectedNFTIds.push(nft.id);
      });
      setSelectedNFTIds(newSelectedNFTIds);
    }
  }, []);

  useEffect(() => {
    if (selectedNFTIds) {
      const selected = sliceData.filter((nft) => selectedNFTIds.includes(nft.id));
      SetSelectedNft(selected);
    }
  }, [selectedNFTIds]);

  const handleShow = (nft) => {
    if (tierById) {
      if (selectedNFTIds.includes(nft.id) && winners <= nft.generatedEditions.length) {
        setOpenEditions(openEditions ? null : nft.id);
      }
    }
  };
  const handleSelectAll = (event, nftId) => {
    if (event.target.className === 'edition-container' || event.target.className === 'checkmark') {
      if (selectAll === false) {
        const changedNFT = sliceData.find((nft) => nft.id === nftId);

        setSelectedEditions({ ...selectedEditions, [nftId]: [...changedNFT.generatedEditions] });
        setSelectAll(true);
      } else {
        setSelectedEditions({ ...selectedEditions, [nftId]: [] });
        setSelectAll(false);
      }
    }
  };
  const handleSelectEdition = (event, nftId, edition) => {
    if (event.target.className === 'edition-container' || event.target.className === 'checkmark') {
      if (!selectedEditions[nftId]?.includes(edition)) {
        const selectedEditionsByNftId = selectedEditions[nftId] ? selectedEditions[nftId] : [];

        setSelectedEditions({
          ...selectedEditions,
          [nftId]: [...selectedEditionsByNftId, edition],
        });
      } else {
        setSelectAll(false);
        setSelectedEditions({
          ...selectedEditions,
          [nftId]: selectedEditions[nftId]?.filter(
            (selectedEdition) => selectedEdition !== edition
          ),
        });
      }
    }
  };

  return (
    <div className="nfts__lists">
      {sliceData.map((nft, index) => (
        <div style={{ position: 'relative' }} key={nft.id}>
          {tierById && winners > nft.generatedEditions.length ? (
            <>
              <img
                className="nonicon__icon"
                src={nonSelecting}
                alt="Check Icon"
                onMouseOver={() => activateInfo(index)}
                onFocus={() => activateInfo(index)}
                onMouseLeave={() => setHideIcon(false)}
                onBlur={() => setHideIcon(false)}
              />
              {hideIcon && index === activeIndex && (
                <Animated animationIn="zoomIn" style={{ position: 'relative' }}>
                  <div className="warning-text">
                    <p>
                      This NFT doesn&apos;t have enough editions to be entered into this tier. You
                      must have the equal amount of winners as NFTs available.
                    </p>
                  </div>
                </Animated>
              )}
            </>
          ) : (
            <></>
          )}
          <div
            className={`nft__box ${selectedNFTIds.includes(nft.id) ? 'selected' : ''} ${
              (tierById && winners > nft.generatedEditions.length) ||
              (tierById &&
                nftsPerWinner === selectedNFTIds.length &&
                !selectedNFTIds.includes(nft.id))
                ? 'disabled'
                : ''
            }`}
            key={nft.id}
          >
            <div
              className="nft__box__image"
              onClick={() => handleSavedNfts(nft)}
              aria-hidden="true"
            >
              {isCreatingAction && (
                <>
                  {selectedNFTIds.includes(nft.id) &&
                    tierById &&
                    winners <= nft.generatedEditions?.length && (
                      <span className="selected-div">
                        <span className="selected-number">
                          {selectedEditions[nft.id]?.length}/{nft.generatedEditions.length}
                        </span>
                        <img className="check__icon" src={checkIcon} alt="Check Icon" />
                      </span>
                    )}
                </>
              )}
              {nft.previewImage.type === 'video/mp4' && !isCreatingAction && (
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
              {nft.previewImage.type === 'video/mp4' && isCreatingAction && (
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
              )}
              {nft.previewImage.type === 'audio/mpeg' && !isCreatingAction && (
                <Popup trigger={<img className="preview-image" src={mp3Icon} alt={nft.name} />}>
                  {(close) => <NFTPopup onClose={close} onNFT={nft} />}
                </Popup>
              )}
              {nft.previewImage.type === 'audio/mpeg' && isCreatingAction && (
                <img className="preview-image" src={mp3Icon} alt={nft.name} />
              )}
              {nft.previewImage.type !== 'audio/mpeg' &&
                nft.previewImage.type !== 'video/mp4' &&
                !isCreatingAction && (
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
              {nft.previewImage.type !== 'audio/mpeg' &&
                nft.previewImage.type !== 'video/mp4' &&
                isCreatingAction && (
                  <img
                    className="preview-image"
                    src={URL.createObjectURL(nft.previewImage)}
                    alt={nft.name}
                  />
                )}
              {nft.previewImage.type === 'video/mp4' && (
                <img className="video__icon" src={videoIcon} alt="Video Icon" />
              )}
            </div>
            <div className={`nft__box__name ${isCreatingAction ? 'no__hover' : ''}`}>
              <h3 title={nft.name}>{nft.name}</h3>
              {/* {nft.type === 'single' || (nft.type === 'collection' && isCreatingAction) ? (
                nft.generatedEditions.length > 1 ? (
                  <div className="collection__count">
                    {isCreatingAction && (
                      <>
                        <button
                          type="button"
                          className={
                            openEditions !== nft.id
                              ? 'editions-btn button'
                              : 'editions-btn selected button'
                          }
                          onClick={() => handleShow(nft)}
                        >
                          Edition #{' '}
                          <img
                            src={vector}
                            className={openEditions === nft.id && 'icon-up'}
                            alt="icon"
                          />
                        </button>
                        <ul className="editions-list" hidden={openEditions !== nft.id}>
                          <li disabled>Choose edition number</li>
                          <li>
                            <label
                              className="edition-container"
                              aria-hidden="true"
                              onClick={(event) => handleSelectAll(event, nft.id)}
                            >
                              Select All
                              <input type="checkbox" checked={selectAll} />
                              <span className="checkmark" />
                            </label>
                          </li>
                          {nft.generatedEditions.map((edition) => (
                            <li key={edition}>
                              <label
                                htmlFor={edition}
                                className="edition-container"
                                aria-hidden="true"
                                onClick={(event) => handleSelectEdition(event, nft.id, edition)}
                              >
                                {`#${edition}`}
                                <input
                                  type="checkbox"
                                  checked={selectedEditions[nft.id]?.includes(edition)}
                                  id={edition}
                                />
                                <span className="checkmark" />
                              </label>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                    {!(
                      selectedNFTIds.includes(nft.id) &&
                      tierById &&
                      winners <= nft.generatedEditions.length
                    ) &&
                      !isCreatingAction && (
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
                      )}
                  </div>
                ) : (
                  <p className="collection__count">{`#${nft.generatedEditions[0]}`}</p>
                )
              ) : (
                <></>
              )} */}
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
                  {selectedNFTIds && selectedNFTIds.includes(nft.id)
                    ? `x${nft.generatedEditions.length - winners}`
                    : `x${nft.generatedEditions.length}`}
                  {!isCreatingAction ? (
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
                  ) : (
                    <></>
                  )}
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
        </div>
      ))}
    </div>
  );
};

Lists.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
  perPage: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  selectedNFTIds: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setSelectedNFTIds: PropTypes.func.isRequired,
  winners: PropTypes.number,
  nftsPerWinner: PropTypes.number,
};

Lists.defaultProps = {
  winners: null,
  nftsPerWinner: null,
};

export default Lists;
