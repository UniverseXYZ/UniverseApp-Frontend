import React, { useState, useEffect, useRef, useContext } from 'react';
import Popup from 'reactjs-popup';
import uuid from 'react-uuid';
import '../pagination/Pagination.scss';
import { Animated } from 'react-animated-css';
import checkIcon from '../../assets/images/check.svg';
import editIcon from '../../assets/images/edit.svg';
import removeIcon from '../../assets/images/remove.svg';
import mp3Icon from '../../assets/images/mp3-icon.png';
import videoIcon from '../../assets/images/video-icon.svg';
import AppContext from '../../ContextAPI';
import RemovePopup from '../popups/RemoveNftPopup.jsx';
import main1 from '../../assets/images/team/main1.png';
import Button from '../button/Button';
import Lists from './Lists';
import Pagination from '../pagination/Pagionation';
import ItemsPerPageDropdown from '../pagination/ItemsPerPageDropdown';
import './UniverseNFTs.scss';
import cover from '../../assets/images/team/cover.png';

const UniverseNFTs = () => {
  const { universeNFTs, setUniverseNFTs, setActiveView, setShowModal, setUniverseNFTsID } =
    useContext(AppContext);
  const [selectAllIsChecked, setSelectAllIsChecked] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownID, setDropdownID] = useState(0);
  const ref = useRef(null);
  const [mobileVersion, setMobileVersion] = useState(true);
  const [isCollectionDropdownOpened, setIsCollectionDropdownOpened] = useState(false);
  // const history = useHistory();
  const handleUniverseNfts = (index) => {
    const newUniverseNfts = [...universeNFTs];
    newUniverseNfts[index].selected = !newUniverseNfts[index].selected;

    setUniverseNFTs(newUniverseNfts);
  };

  const clearFiltersMobile = () => {
    setIndexes([]);
    const temp = [];
    const newCollections = [...draftCollections];
    newCollections.forEach((collection, index) => {
      if (collection.selected) {
        temp.push(index);
        collection.selected = false;
      }
    });
    setIndexes(temp);
    setDraftCollections(newCollections);

    // setCollections(newCollections);
    setSearchByName('');
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
          {/* <Animated animationIn="fadeInUp" className="animate__filters__popup">
            <div hidden={mobileVersion} className="filter__by__collection_mobile">
              <div className="filter__by__collection_mobile__overlay" />
              <div className="filter__by__collection_mobile__popup">
                <img
                  className="close"
                  // src={closeIcon}
                  alt=""
                  onClick={() => {
                    closeCollectionMobile();
                    document.body.classList.remove('no__scroll');
                  }}
                  aria-hidden="true"
                />
                <div className="filter_by_collection_buttons">
                  <button type="button" className="clear_all" onClick={clearFiltersMobile}>
                    Clear all
                  </button>
                  <button
                    type="button"
                    className="light-button"
                    onClick={() => {
                      handleCollectionsMobile();
                      document.body.classList.remove('no__scroll');
                    }}
                  >
                    Apply Filter
                  </button>
                </div>
                <div className="filter__by__collection">
                  <div className="filter__by__collection__label">
                    <span>Filter by collection</span>
                  </div>
                  <div className="filter__by__collection__input">
                    <input
                      className={`target ${isCollectionDropdownOpened ? 'focused' : ''}`}
                      type="text"
                      placeholder="Browse collections..."
                      onFocus={() => setIsCollectionDropdownOpened(true)}
                    />
                  </div>
                </div>
                {isCollectionDropdownOpened && (
                  <div ref={refMobile} className="collections__dropdown">
                    {collections.length ? (
                      collections.map((collection, index) => (
                        <button
                          type="button"
                          key={collection.id}
                          className={collection.selected ? 'selected' : ''}
                          onClick={() => saveIndexes(index)}
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
                            <img
                              src={URL.createObjectURL(collection.avatar)}
                              alt={collection.name}
                            />
                          )}
                          <span>{collection.name}</span>
                        </button>
                      ))
                    ) : (
                      <div className="empty__collections">
                        <h3>No Collections found</h3>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Animated> */}
          {/* {myNFTs.length ? (
            <>
              <div className="filtration">
                <div className="filter__by__collection">
                  <div className="filter__by__collection__label">
                    <span>Filter by collection</span>
                    <button type="button" className="clear_all" onClick={clearFilters}>
                      Clear all
                    </button>
                  </div>
                  <div className="filter__by__collection__input">
                    <input
                      className={`target ${isCollectionDropdownOpened ? 'focused' : ''}`}
                      type="text"
                      placeholder="Browse collections..."
                      onFocus={() => setIsCollectionDropdownOpened(true)}
                    />
                  </div>
                </div>
                <div className="search__by__name">
                  <div className="search__by__name__label">
                    <span>Seach by name</span>
                  </div>
                  <div className="search__by__name__input">
                    <input
                      type="text"
                      placeholder="Start typing"
                      value={searchByName}
                      onChange={(e) => handleSearchByName(e.target.value)}
                    />
                  </div>
                </div> */}
          {/* <Button className="filter" onClick={handleFiltersClick}>{`Filters ${collections.filter(col => col.selected).length !== 0 ? '('+collections.filter(col => col.selected).length+')' : ''}`}</Button> */}
          {/* <Button className="filter" onClick={handleFiltersClick}>
                  Filter by collection <img src={filterIcon} alt="Filter" />
                </Button>
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
                            <img
                              src={URL.createObjectURL(collection.avatar)}
                              alt={collection.name}
                            />
                          )}
                          <span>{collection.name}</span>
                        </button>
                      ))
                    ) : (
                      <div className="empty__collections">
                        <h3>No Collections found</h3>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="selected__filters">
                {collections.map(
                  (collection, index) =>
                    collection.selected && (
                      <div key={collection.id}>
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
                        <button
                          type="button"
                          title="Remove"
                          onClick={() => handleCollections(index)}
                        >
                          &#10006;
                        </button>
                      </div>
                    )
                )}
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
            </>
          ) : (
            <div className="empty__nfts">
              <h3>No NFTs found in your wallet</h3>
              <p className="desc">Mint some NFTs by clicking the button below</p>
              <button
                type="button"
                className="set_up"
                // onClick={() => {
                //   history.push('/my-nfts');
                // }}
              >
                Go to Minting
              </button>
            </div>
          )}
          {isCreatingAction && tierById && (
            // <div>
            <div className="selected-ntf">
              <div className="container selected-body">
                <div className="infoSelect-div">
                  <span>Number of winners : {winners}</span>
                  <span>NFTs per winner : {nftsPerWinner}</span>
                  <div className="img-div">
                    {previewNFTs.map((nft, index) => (
                      <div key={nft.id} className="imgs">
                        {nft.previewImage.type === 'video/mp4' && (
                          <video
                            className="smallView-image"
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
                          <img className="smallView-image" src={mp3Icon} alt={nft.name} />
                        )}
                        {nft.previewImage.type !== 'audio/mpeg' &&
                          nft.previewImage.type !== 'video/mp4' && (
                            <img
                              className="smallView-image"
                              src={URL.createObjectURL(nft.previewImage)}
                              alt={nft.name}
                            />
                          )}
                        <img
                          className="del-img"
                          src={crossSmall}
                          onClick={() => handledeleteNft(nft)}
                          alt="delete"
                          aria-hidden="true"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="sel-info">
                  {nftsPerWinner > previewNFTs.length && (
                    <span className="err-select">
                      You have not selected enough NFTs for this reward tier
                    </span>
                  )}
                  <div className="continue-nft">
                    {tierById && Number(nftsPerWinner) === Number(previewNFTs.length) ? (
                      <Button onClick={() => handleContinue(previewNFTs)} className="light-button">
                        Continue
                      </Button>
                    ) : (
                      <Button className="light-button" disabled>
                        Continue
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )} */}
          <div className="universe">
            <div className="universe_filter">
              <div className="universe_filter_label">
                <span>Filter</span>
              </div>
              <div className="universe_filter_input">
                <input
                  className={`target ${isCollectionDropdownOpened ? 'focused' : ''}`}
                  type="text"
                  placeholder="Browse collections..."
                  // onFocus={() => setIsCollectionDropdownOpened(true)}
                />
              </div>
            </div>

            <div className="search__by__name universe_search_by_name">
              <div className="search__by__name__label universe_search_by_name_label">
                <span>Seach by name</span>
              </div>
              <div className="search__by__name__input search_by_name_input">
                <input
                  type="text"
                  placeholder="Start typing"
                  // value={searchByName}
                  // onChange={(e) => handleSearchByName(e.target.value)}
                />
              </div>
            </div>
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
              <div />
              <div />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniverseNFTs;
