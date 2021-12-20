import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';
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
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const SavedNFTs = () => {
  const { savedNfts, setSavedNfts, setActiveView, setSavedNFTsID } = useMyNftsContext();
  const [selectAllIsChecked, setSelectAllIsChecked] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownID, setDropdownID] = useState(0);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(8);
  const [page, setPage] = useState(8);

  const ref = useRef(null);
  const history = useRouter();

  const handleSavedNfts = (index) => {
    const newSavedNfts = [...savedNfts];
    newSavedNfts[index].selected = !newSavedNfts[index].selected;

    setSavedNfts(newSavedNfts);
  };

  const toggleSelection = () => {
    if (Cookies.get('localChecked')) {
      Cookies.set('localChecked', Cookies.get('localChecked') === 'true' ? 'false' : 'true');
    } else {
      Cookies.set('localChecked', 'true');
    }
    setSelectAllIsChecked(!selectAllIsChecked);

    const newSavedNfts = [...savedNfts];
    if (localStorage.localChecked === 'true') {
      newSavedNfts.forEach((nft) => {
        nft.selected = true;
      });
    } else {
      newSavedNfts.forEach((nft) => {
        nft.selected = false;
      });
    }
    setSavedNfts(newSavedNfts);
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
    const res = savedNfts.filter((nft) => !nft.selected);
    if (res.length) {
      setSelectAllIsChecked(false);
      Cookies.set('localChecked', 'false');
    } else {
      setSelectAllIsChecked(true);
      Cookies.set('localChecked', 'true');
    }
  }, [savedNfts]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  const handleEdit = (id) => {
    // document.body.classList.add('no__scroll');
    setSavedNFTsID(id);
    setActiveView('single');
    history.push('/my-nfts/create?tabIndex=1&nftType=single');
  };

  return (
    <div className="tab__saved__nfts">
      {savedNfts.length ? (
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
            {savedNfts.slice(offset, offset + perPage).map((nft, index) => (
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
                              removeFrom="saved"
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
                        {typeof nft.collection.avatar === 'string' &&
                        nft.collection.avatar.startsWith('#') ? (
                          <div
                            className="random__bg__color"
                            style={{ backgroundColor: nft.collection.avatar }}
                          >
                            {nft.collection.name.charAt(0)}
                          </div>
                        ) : (
                          <img
                            src={URL.createObjectURL(nft.collection.avatar)}
                            alt={nft.collection.name}
                          />
                        )}
                        <span>{nft.collection.name}</span>
                      </>
                    )}
                  </div>
                  {nft.tokenIds && nft.tokenIds.length > 1 ? (
                    <div className="collection__count">
                      {`x${nft.tokenIds.length}`}
                      <div
                        className="generatedEditions"
                        style={{
                          gridTemplateColumns: `repeat(${Math.ceil(
                            nft.tokenIds.length / 10
                          )}, auto)`,
                        }}
                      >
                        {nft.tokenIds.map((edition) => (
                          <div key={edition.id.split('-')[0]}>{`#${edition.id.split('-')[0]}`}</div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="collection__count">{`#${0}`}</p>
                  )}
                </div>
                {nft.tokenIds && nft.tokenIds.length > 1 && (
                  <>
                    <div className="saved__nft__box__highlight__one" />
                    <div className="saved__nft__box__highlight__two" />
                  </>
                )}
                <span className="tooltiptext">Complete editing this NFT</span>
              </div>
            ))}
          </div>
          <div className="pagination__container">
            <SimplePagination
              data={savedNfts}
              perPage={perPage}
              setOffset={setOffset}
              setPage={setPage}
              page={page}
            />
            <ItemsPerPageDropdown
              perPage={perPage}
              setPerPage={setPerPage}
              itemsPerPage={[8, 16, 32]}
              offset={offset}
              page={page}
              setPage={setPage}
            />
          </div>
        </>
      ) : (
        <div className="empty__nfts">
          <div className="tabs-empty">
            <div className="image-bubble">
              <img src={bubbleIcon} alt="bubble-icon" />
            </div>
            <h3>No saved NFTs found</h3>
            <p>Create NFTs or NFT collections with our platform by clicking the button below</p>
            <Button
              disabled
              className="light-button disabled"
              onClick={() => history.push('/my-nfts/create?tabIndex=1&nftType=single')}
            >
              Create NFT
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedNFTs;
