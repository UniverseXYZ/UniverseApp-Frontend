/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-prop-types */
import React, { useState, useEffect, useRef, useContext } from 'react';
import Popup from 'reactjs-popup';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import '../pagination/Pagination.scss';
import checkIcon from '../../assets/images/check.svg';
import editIcon from '../../assets/images/edit.svg';
import removeIcon from '../../assets/images/remove.svg';
import mp3Icon from '../../assets/images/mp3-icon.png';
import videoIcon from '../../assets/images/video-icon.svg';
import AppContext from '../../ContextAPI';
import RemovePopup from '../popups/RemoveNftPopup.jsx';
import main1 from '../../assets/images/main1.png';
import './UniverseNFTs.scss';
import cover from '../../assets/images/cover.png';
import Pagination from '../pagination/Pagionation';
import ItemsPerPageDropdown from '../pagination/ItemsPerPageDropdown';
import Lists from './Lists';

const UniverseNFTs = (
  filteredNFTs,
  setFilteredNFTs,
  selectedNFTIds,
  setSelectedNFTIds,
  tierName,
  winners,
  nftsPerWinner,
  minBidValue
) => {
  const { universeNFTs, setUniverseNFTs, setActiveView, setShowModal, setUniverseNFTsID } =
    useContext(AppContext);
  const [selectAllIsChecked, setSelectAllIsChecked] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownID, setDropdownID] = useState(0);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(12);
  const ref = useRef(null);
  const [indexes, setIndexes] = useState([]);
  const [collections, setCollections] = useState([]);
  const [mobileVersion, setMobileVersion] = useState(true);
  const [draftCollections, setDraftCollections] = useState([]);
  const [isCollectionDropdownOpened, setIsCollectionDropdownOpened] = useState(false);

  const handleUniverseNfts = (index) => {
    const newUniverseNfts = [...universeNFTs];
    newUniverseNfts[index].selected = !newUniverseNfts[index].selected;

    setUniverseNFTs(newUniverseNfts);
  };

  const handleCollections = (index) => {
    const newCollections = [...collections];
    newCollections[index].selected = !newCollections[index].selected;
    setCollections(newCollections);
  };

  const handleClickOutside = (event) => {
    if (!event.target.classList.contains('target')) {
      if (
        ref.current &&
        !ref.current.contains(event.target)
        // refMobile.current &&
        // !refMobile.current.contains(event.target)
      ) {
        setIsCollectionDropdownOpened(false);
      }
    }
  };

  const clearFilters = () => {
    const newCollections = [...collections];
    newCollections.forEach((collection) => {
      collection.selected = false;
    });

    setCollections(newCollections);
    setSearchByName('');
  };

  const handleSearchByName = (value) => {
    setSearchByName(value);
  };

  const saveIndexes = (index) => {
    const temp = [...indexes];
    temp.push(index);
    setIndexes(temp);
    const newCollections = [...collections];
    newCollections[index].selected = !newCollections[index].selected;
    setDraftCollections(newCollections);
  };
  const handleFiltersClick = () => {
    setMobileVersion(false);
    document.body.classList.add('no__scroll');
    document.querySelector('.filter__by__collection_mobile').style.top = `${window.scrollY}px`;
    document.querySelector('.animate__filters__popup').style.display = 'block';
  };

  const toggleSelection = () => {
    if (localStorage.localChecked) {
      localStorage.localChecked = localStorage.localChecked === 'true' ? 'false' : 'true';
    } else {
      localStorage.localChecked = 'true';
    }
    setSelectAllIsChecked(!selectAllIsChecked);

    const newUniverseNfts = [...universeNFTs];
    if (localStorage.localChecked === 'true') {
      newUniverseNfts.forEach((nft) => {
        nft.selected = true;
      });
    } else {
      newUniverseNfts.forEach((nft) => {
        nft.selected = false;
      });
    }
    setUniverseNFTs(newUniverseNfts);
  };

  useEffect(() => {
    const res = universeNFTs.filter((nft) => !nft.selected);
    if (res.length) {
      setSelectAllIsChecked(false);
      localStorage.localChecked = 'false';
    } else {
      setSelectAllIsChecked(true);
      localStorage.localChecked = 'true';
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  useEffect(() => {
    setUniverseNFTs({
      id: uuid(),
      name: tierName,
      winners,
      nftsPerWinner,
      minBidValue,
    });
  }, [filteredNFTs, selectedNFTIds]);

  useEffect(() => {
    const prevNFTs = [];
    filteredNFTs.forEach((nft) => {
      if (selectedNFTIds.includes(nft.id)) {
        prevNFTs.push(nft);
      }
    });
    setPreviewNFTs(prevNFTs);
  }, [filteredNFTs, selectedNFTIds]);

  useEffect(() => {
    const prevNFTs = [];
    filteredNFTs.forEach((nft) => {
      if (selectedNFTIds.includes(nft.id)) {
        prevNFTs.push(nft);
      }
    });
    setPreviewNFTs(prevNFTs);
    // setAuction(data => ({ ...data, tier: { ...data.tier,nfts{...data.tier.nfts, previewNFTs}} }));
  }, [filteredNFTs, selectedNFTIds]);
  const handleEdit = (id) => {
    document.body.classList.add('no__scroll');
    setUniverseNFTsID(id);
    setActiveView('single');
    setShowModal(true);
  };

  return (
    <div className="tab__saved__nfts">
      {universeNFTs.length ? (
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
            {universeNFTs.map((nft, index) => (
              <div className={`saved__nft__box ${nft.selected ? 'selected' : ''}`} key={uuid()}>
                <div
                  className="saved__nft__box__image"
                  onClick={() => handleUniverseNfts(index)}
                  aria-hidden="true"
                >
                  {nft.previewImage.type === 'video/mp4' && (
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
                              nftID={Number(nft.id)}
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
        <div className="tab__wallet">
          <div className="univers_NFTs">
            <div className="universe_filter">
              <div className="universe_filter_label">
                <span>Filter</span>
              </div>
              <div className="universe_filter_input">
                <input
                  className={`target ${isCollectionDropdownOpened ? 'focused' : ''}`}
                  type="text"
                  placeholder="Browse collections..."
                  onFocus={() => setIsCollectionDropdownOpened(true)}
                />
              </div>
            </div>

            <div className="universe_search_by_name">
              <div className="universe_search_by_name_label">
                <span>Seach by name</span>
              </div>
              <div className="search_by_name_input">
                <input
                  type="text"
                  placeholder="Start typing"
                  // value={searchByName}
                  // onChange={(e) => handleSearchByName(e.target.value)}
                />
              </div>
            </div>
            {isCollectionDropdownOpened && (
              <div ref={ref} className="collections__dropdown">
                {collections.length ? (
                  collections.map((collection, index) => (
                    <button
                      type="button"
                      key={collection.id}
                      className={collection.selected ? 'selected' : ''}
                      onClick={() => handleCollections(index)}
                    >
                      {typeof collection.avatar === 'string' &&
                      collection.avatar.startsWith('#') ? (
                        <div
                          className="random__bg__color"
                          style={{ backgroundColor: collection.avatar }}
                        >
                          {collection.name.charAt(0)}
                        </div>
                      ) : (
                        <img src={URL.createObjectURL(collection.avatar)} alt={collection.name} />
                      )}
                      <span>{collection.name}</span>
                    </button>
                  ))
                ) : (
                  <div className="dropdown_search">
                    <ul>
                      <div>
                        <li>All characters</li>
                      </div>
                      <div>
                        <li>OG characters</li>
                      </div>
                      <div>
                        <li>My polymorphs</li>
                      </div>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="nfts__lists">
            <div className="nft__box">
              <div>
                <img src={main1} alt="dlk" />
              </div>
              <div className="polymorph">
                <p>Polymorph #22</p>
              </div>
              <div className="nft_box_footer">
                <img src={cover} alt="nsdn" />
                <p>Universe Polymorphs</p>
              </div>
            </div>
          </div>
          {filteredNFTs.length ? (
            <>
              <Lists
                data={filteredNFTs}
                perPage={perPage}
                offset={offset}
                selectedNFTIds={selectedNFTIds}
                setSelectedNFTIds={setSelectedNFTIds}
                winners={Number(winners)}
                nftsPerWinner={Number(nftsPerWinner)}
              />

              <div className="pagination__container">
                <Pagination data={filteredNFTs} perPage={perPage} setOffset={setOffset} />
                <ItemsPerPageDropdown perPage={perPage} setPerPage={setPerPage} />
              </div>
            </>
          ) : (
            <div className="empty__filter__nfts">
              <h3>No NFTs found</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

UniverseNFTs.propTypes = {
  filteredNFTs: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setFilteredNFTs: PropTypes.func.isRequired,
  selectedNFTIds: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setSelectedNFTIds: PropTypes.func.isRequired,
  tierName: PropTypes.string,
  winners: PropTypes.number,
  nftsPerWinner: PropTypes.number,
  minBidValue: PropTypes.string,
};

UniverseNFTs.defaultProps = {
  tierName: '',
  winners: null,
  nftsPerWinner: null,
  minBidValue: '',
};

export default UniverseNFTs;
