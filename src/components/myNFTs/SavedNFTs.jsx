import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import checkIcon from '../../assets/images/Completed.svg';
import editIcon from '../../assets/images/edit.svg';
import removeIcon from '../../assets/images/remove.svg';
import mp3Icon from '../../assets/images/mp3-icon.png';
import videoIcon from '../../assets/images/video-icon.svg';
import bubbleIcon from '../../assets/images/text-bubble.png';
import Button from '../button/Button';
import RemovePopup from '../popups/RemoveNftPopup.jsx';
import { useMyNftsContext } from '../../contexts/MyNFTsContext';
import SimplePagination from '../pagination/SimplePaginations';
import ItemsPerPageDropdown from '../pagination/ItemsPerPageDropdown';
import LoadingImage from '../general/LoadingImage';
import NoSavedNftsFound from './NoSavedNftsFound';
import { useSearchSavedNfts } from '../../utils/hooks/useSavedNftsDebouncer.js';
import ApiPagination from '../pagination/ApiPagination';
import ApiItemsPerPageDropdown from '../pagination/ApiItemsPerPageDropdown';
import NftCardSkeleton from '../skeletons/nftCardSkeleton/NftCardSkeleton';
import { getCollectionBackgroundColor } from '../../utils/helpers';
import { shortenEthereumAddress } from '../../utils/helpers/format';
import universeIcon from '../../assets/images/universe-img.svg';
import { removeSavedNft } from '../../utils/api/mintNFT';

const SavedNFTs = ({
  setSelectedSavedNfts,
  selectedSavedNfts,
  triggerRefetch,
  setTriggerRefetch,
  scrollContainer,
}) => {
  const { setSavedNfts, fetchNftSummary } = useMyNftsContext();

  const [selectAllIsChecked, setSelectAllIsChecked] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownID, setDropdownID] = useState(0);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(8);
  const [page, setPage] = useState(8);

  const ref = useRef(null);
  const history = useHistory();

  const [savedNftData, setSavedNftData] = useState(null);
  const [isSearching, setIsSearching] = useState(true);

  const {
    apiPage,
    setApiPage,
    search: { loading },
    results,
    isLastPage,
    setIsLastPage,
    loadedPages,
    setLoadedPages,
  } = useSearchSavedNfts(triggerRefetch, setTriggerRefetch);

  useEffect(() => {
    if (results.nfts) {
      setSavedNftData(results);
      setIsSearching(false);
    }
  }, [results]);

  const handleSavedNfts = (index) => {
    const newSavedNfts = [...savedNftData?.nfts] || [];
    newSavedNfts[index].selected = !newSavedNfts[index].selected;
    if (newSavedNfts[index].selected) {
      // Add to selected nfts
      setSelectedSavedNfts((savedNfts) => [...savedNfts, newSavedNfts[index]]);
    } else {
      // Remove from selected nfts
      const newSelected = [...selectedSavedNfts];
      newSelected.splice(newSelected.map((nft) => nft.id).indexOf(newSavedNfts[index].id), 1);
      setSelectedSavedNfts(newSelected);
    }

    setSavedNfts((old) => ({
      ...old,
      nfts: newSavedNfts,
    }));
  };

  const toggleSelection = () => {
    if (localStorage.localChecked) {
      localStorage.localChecked = localStorage.localChecked === 'true' ? 'false' : 'true';
    } else {
      localStorage.localChecked = 'true';
    }
    setSelectAllIsChecked(!selectAllIsChecked);

    const newSavedNfts = [...savedNftData?.nfts];
    if (localStorage.localChecked === 'true') {
      newSavedNfts.forEach((nft) => {
        nft.selected = true;
      });
      setSelectedSavedNfts(newSavedNfts);
    } else {
      newSavedNfts.forEach((nft) => {
        nft.selected = false;
      });
      setSelectedSavedNfts([]);
    }
    setSavedNfts((old) => ({
      ...old,
      nfts: newSavedNfts,
    }));
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
    const res = (savedNftData?.nfts || []).filter((nft) => !nft.selected);
    if (res.length) {
      setSelectAllIsChecked(false);
      localStorage.localChecked = 'false';
    } else {
      setSelectAllIsChecked(true);
      localStorage.localChecked = 'true';
    }
  }, [savedNftData]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  const handleEdit = (id) => {
    // document.body.classList.add('no__scroll');
    history.push('/my-nfts/create', {
      tabIndex: 1,
      nftType: 'single',
      savedNft: savedNftData.nfts.find((nft) => nft.id === id),
    });
  };

  const changePerPage = (newPerPage) => {
    if (newPerPage < savedNftData?.nfts.length) {
      setPage(0);
      setOffset(0);
    } else {
      const newPage = Math.ceil(offset / newPerPage);
      setPage(newPage);
    }
    setPerPage(newPerPage);
  };

  const scrollToNftContainer = () => {
    if (scrollContainer && scrollContainer.current) {
      scrollContainer.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleRemove = async (id) => {
    const result = await removeSavedNft(id);

    if (!result.ok || result.status !== 200) {
      console.error(`Cannot delete NFT with id: ${id}`);
      return;
    }

    const newSavedNfts = [...savedNftData?.nfts] || [];
    const nftIndex = newSavedNfts.map((nft) => nft.id).indexOf(id);

    if (newSavedNfts[nftIndex].selected) {
      // Remove from selected nfts
      const newSelected = [...selectedSavedNfts];
      newSelected.splice(newSelected.map((nft) => nft.id).indexOf(newSavedNfts[nftIndex].id), 1);
      setSelectedSavedNfts(newSelected);
    }
    fetchNftSummary();
    setTriggerRefetch(true);
  };

  useEffect(() => {
    scrollToNftContainer();
  }, [page, perPage]);

  return (
    <div className="tab__saved__nfts">
      {isSearching ? (
        <div className="saved__nfts__lists">
          <NftCardSkeleton />
          <NftCardSkeleton />
          <NftCardSkeleton />
          <NftCardSkeleton />
        </div>
      ) : savedNftData?.nfts && savedNftData?.nfts.length ? (
        <>
          <div className="custom__checkbox">
            <label htmlFor="toggleSelection">
              <input
                id="toggleSelection"
                type="checkbox"
                onChange={toggleSelection}
                checked={selectAllIsChecked}
              />
              <i />
              {selectAllIsChecked ? 'Clear all' : 'Select all'}
            </label>
          </div>

          <div className="saved__nfts__lists">
            {savedNftData?.nfts?.slice(offset, offset + perPage).map((nft, index) => (
              <div className={`saved__nft__box ${nft.selected ? 'selected' : ''}`} key={nft.id}>
                <div
                  className="saved__nft__box__image"
                  onClick={() => handleSavedNfts(index)}
                  aria-hidden="true"
                >
                  {nft.artworkType && nft.artworkType.endsWith('mp4') && (
                    <video
                      onMouseOver={(event) => event.target.play()}
                      onFocus={(event) => event.target.play()}
                      onMouseOut={(event) => event.target.pause()}
                      onBlur={(event) => event.target.pause()}
                    >
                      <source src={nft.thumbnailUrl} type="video/mp4" />
                      <track kind="captions" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {nft.artworkType && nft.artworkType.endsWith('mpeg') && (
                    <img className="preview-image" src={mp3Icon} alt={nft.name} />
                  )}
                  {nft.artworkType &&
                    !nft.artworkType.endsWith('mpeg') &&
                    nft.artworkType &&
                    !nft.artworkType.endsWith('mp4') && (
                      <LoadingImage
                        className="preview-image"
                        src={nft.thumbnailUrl}
                        alt={nft.name}
                      />
                      // <img className="preview-image" src={nft.thumbnailUrl}  />
                    )}
                  {nft.artworkType && nft.artworkType.endsWith('mp4') && (
                    <img className="video__icon" src={videoIcon} alt="Video Icon" />
                  )}
                  {nft.selected && <img className="check__icon" src={checkIcon} alt="Check Icon" />}
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
                        <li className="edit" onClick={() => handleEdit(nft.id)} aria-hidden="true">
                          <img src={editIcon} alt="Edit Icon" />
                          <p>Edit</p>
                        </li>
                        <Popup
                          trigger={
                            <li className="remove">
                              <img src={removeIcon} alt="Remove Icon" />
                              <p>Remove</p>
                            </li>
                          }
                        >
                          {(close) => (
                            <RemovePopup
                              close={close}
                              nftID={nft.id}
                              removedItemName={nft.name}
                              handleRemove={handleRemove}
                            />
                          )}
                        </Popup>
                      </ul>
                    )}
                  </button>
                </div>
                <div className="saved__nft__box__footer">
                  <div className="collection__details">
                    {nft.collection && (
                      <>
                        {nft.collection.address ===
                        process.env.REACT_APP_UNIVERSE_ERC_721_ADDRESS.toLowerCase() ? (
                          <img src={universeIcon} alt={nft.collection.name} />
                        ) : !nft.collection.coverUrl ? (
                          <div
                            className="random--bg--color"
                            style={{
                              backgroundColor: getCollectionBackgroundColor(nft.collection),
                            }}
                          >
                            {nft.collection.name.charAt(0)}
                          </div>
                        ) : (
                          <img src={nft.collection.coverUrl} alt={nft.collection.name} />
                        )}
                        <span>
                          {nft.collection.name || shortenEthereumAddress(nft.collection.address)}
                        </span>
                      </>
                    )}
                  </div>
                  {nft.numberOfEditions >= 1 && (
                    <div className="collection__count">{`x${nft.numberOfEditions}`}</div>
                  )}
                </div>
                {nft.numberOfEditions === 2 ? (
                  <>
                    <div className="saved__nft__box__highlight__one" />
                  </>
                ) : nft.numberOfEditions > 2 ? (
                  <>
                    <div className="saved__nft__box__highlight__one" />
                    <div className="saved__nft__box__highlight__two" />
                  </>
                ) : (
                  <></>
                )}
                <span className="tooltiptext">Complete editing this NFT</span>
              </div>
            ))}
          </div>
          <div className="pagination__container">
            <ApiPagination
              data={savedNftData?.nfts}
              perPage={perPage}
              setOffset={setOffset}
              setApiPage={setApiPage}
              apiPage={apiPage}
              setIsLastPage={setIsLastPage}
              page={page}
              setPage={setPage}
              loadedPages={loadedPages}
              setLoadedPages={setLoadedPages}
              pagination={savedNftData?.pagination}
            />
            <ApiItemsPerPageDropdown
              perPage={perPage}
              itemsPerPage={[8, 16, 32]}
              offset={offset}
              page={page}
              changePerPage={changePerPage}
            />
          </div>
        </>
      ) : (
        <NoSavedNftsFound />
      )}
    </div>
  );
};
SavedNFTs.propTypes = {
  setSelectedSavedNfts: PropTypes.func.isRequired,
  selectedSavedNfts: PropTypes.oneOfType([PropTypes.array]).isRequired,
  triggerRefetch: PropTypes.bool.isRequired,
  setTriggerRefetch: PropTypes.func.isRequired,
  scrollContainer: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
export default SavedNFTs;
