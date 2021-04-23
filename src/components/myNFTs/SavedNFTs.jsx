import { useState, useEffect, useRef, useContext } from 'react';
import Popup from 'reactjs-popup';
import uuid from 'react-uuid';
import checkIcon from '../../assets/images/check.svg';
import editIcon from '../../assets/images/edit.svg';
import removeIcon from '../../assets/images/remove.svg';
import mp3Icon from '../../assets/images/mp3-icon.png';
import videoIcon from '../../assets/images/video-icon.svg';
import AppContext from '../../ContextAPI';
import RemovePopup from '../popups/RemoveNftPopup';

const SavedNFTs = () => {
  const {
    savedNfts,
    setSavedNfts,
    setActiveView,
    setShowModal,
    setSavedNFTsID,
    selectAllIsChecked,
    setSelectAllIsChecked,
  } = useContext(AppContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownID, setDropdownID] = useState(0);
  const ref = useRef(null);

  const handleSavedNfts = (index) => {
    const newSavedNfts = [...savedNfts];
    newSavedNfts[index].selected = !newSavedNfts[index].selected;

    setSavedNfts(newSavedNfts);
  };

  const toggleSelection = () => {
    if (localStorage.localChecked) {
      localStorage.localChecked = localStorage.localChecked === 'true' ? 'false' : 'true';
    } else {
      localStorage.localChecked = 'true';
    }
    setSelectAllIsChecked(!selectAllIsChecked);

    const newSavedNfts = [...savedNfts];
    localStorage.localChecked === 'true'
      ? newSavedNfts.map((nft) => (nft.selected = true))
      : newSavedNfts.map((nft) => (nft.selected = false));
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
      localStorage.localChecked = 'false';
    } else {
      setSelectAllIsChecked(true);
      localStorage.localChecked = 'true';
    }
  }, [savedNfts]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  const handleEdit = (id) => {
    document.body.classList.add('no__scroll');
    setSavedNFTsID(id);
    setActiveView('single');
    setShowModal(true);
  };

  return (
    <div className="tab__saved__nfts">
      {savedNfts.length ? (
        <>
          <div className="custom__checkbox">
            <label>
              <input type="checkbox" onChange={toggleSelection} checked={selectAllIsChecked} />
              <i />
              {selectAllIsChecked ? 'Clear all' : 'Select all'}
            </label>
          </div>

          <div className="saved__nfts__lists">
            {savedNfts.map((nft, index) => (
              <div className={`saved__nft__box ${nft.selected ? 'selected' : ''}`} key={uuid()}>
                <div className="saved__nft__box__image" onClick={() => handleSavedNfts(index)}>
                  {nft.previewImage.type === 'video/mp4' && (
                    <video
                      onMouseOver={(event) => event.target.play()}
                      onMouseOut={(event) => event.target.pause()}
                    >
                      <source src={URL.createObjectURL(nft.previewImage)} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {nft.previewImage.type === 'audio/mpeg' && (
                    <img className="preview-image" src={mp3Icon} alt={nft.name} />
                  )}
                  {nft.previewImage.type !== 'audio/mpeg' &&
                    nft.previewImage.type !== 'video/mp4' && (
                      <img
                        className="preview-image"
                        src={URL.createObjectURL(nft.previewImage)}
                        alt={nft.name}
                      />
                    )}
                  {nft.previewImage.type === 'video/mp4' && (
                    <img className="video__icon" src={videoIcon} alt="Video Icon" />
                  )}
                  {nft.selected && <img className="check__icon" src={checkIcon} alt="Check Icon" />}
                </div>
                <div className="saved__nft__box__name">
                  <h3>{nft.name}</h3>
                  <button
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
                        <li className="edit" onClick={() => handleEdit(nft.id)}>
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
        <div className="empty__nfts">
          <h3>No Saved NFTs found</h3>
        </div>
      )}
    </div>
  );
};

export default SavedNFTs;
