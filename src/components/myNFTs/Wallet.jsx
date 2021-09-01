import React, { useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { Animated } from 'react-animated-css';
import uuid from 'react-uuid';
import Lists from './Lists';
import ItemsPerPageDropdown from '../pagination/ItemsPerPageDropdown.jsx';
import Pagination from '../pagination/Pagionation.jsx';
import AppContext from '../../ContextAPI';
import Button from '../button/Button.jsx';
import '../pagination/Pagination.scss';
import bubbleIcon from '../../assets/images/text-bubble.png';
import closeIcon from '../../assets/images/cross.svg';
import filterIcon from '../../assets/images/filters-icon.svg';
import crossSmall from '../../assets/images/crossSmall.svg';
import mp3Icon from '../../assets/images/mp3-icon.png';
import '../marketplace/browseNFT/NFTsList.scss';
import plusIcon from '../../assets/images/PlusIcon.png';
import Input from '../input/Input';
import searchIcon from '../../assets/images/search-gray.svg';

const Wallet = ({
  filteredNFTs,
  setFilteredNFTs,
  selectedNFTIds,
  setSelectedNFTIds,
  tierName,
  winners,
  nftsPerWinner,
  minBidValue,
}) => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const { myNFTs, auction, setAuction } = useContext(AppContext);
  const [isCollectionDropdownOpened, setIsCollectionDropdownOpened] = useState(false);
  const [searchByName, setSearchByName] = useState('');
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(12);
  const ref = useRef(null);
  const refMobile = useRef(null);
  const [collections, setCollections] = useState([]);
  const [mobileVersion, setMobileVersion] = useState(true);
  const [draftCollections, setDraftCollections] = useState([]);
  const [indexes, setIndexes] = useState([]);
  const [previewNFTs, setPreviewNFTs] = useState([]);
  const history = useHistory();

  const saveIndexes = (index) => {
    const temp = [...indexes];
    temp.push(index);
    setIndexes(temp);
    const newCollections = [...collections];
    newCollections[index].selected = !newCollections[index].selected;
    setDraftCollections(newCollections);
  };

  const location = useLocation();
  const isCreatingAction = location.pathname === '/create-tiers';
  const tierById = !!(winners && nftsPerWinner);
  const editMode = auction.tiers.find((element) => element.id === location.state);
  const handleCollectionsMobile = () => {
    setCollections(draftCollections);
    setMobileVersion(true);
    document.querySelector('.animate__filters__popup').style.display = 'none';
    setIndexes([]);
  };
  const closeCollectionMobile = () => {
    const newCollections = [...draftCollections];
    indexes.forEach((index) => {
      newCollections[index].selected = !newCollections[index].selected;
    });
    setCollections(newCollections);
    setIndexes([]);
    setMobileVersion(true);
    document.querySelector('.animate__filters__popup').style.display = 'none';
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

  const handleCollections = (index) => {
    const newCollections = [...collections];
    newCollections[index].selected = !newCollections[index].selected;
    setCollections(newCollections);
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

  const handledeleteNft = (nftSelected) => {
    const nftIndex = selectedNFTIds.findIndex((nft) => nft === nftSelected.id);
    setSelectedNFTIds(selectedNFTIds.filter((item) => item !== nftSelected.id));
  };

  const handleClickOutside = (event) => {
    if (!event.target.classList.contains('target')) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        refMobile.current &&
        !refMobile.current.contains(event.target)
      ) {
        setIsCollectionDropdownOpened(false);
      }
    }
  };

  const handleFiltersClick = () => {
    setMobileVersion(false);
    document.body.classList.add('no__scroll');
    document.querySelector('.filter__by__collection_mobile').style.top = `${window.scrollY}px`;
    document.querySelector('.animate__filters__popup').style.display = 'block';
  };

  const handleContinue = (prevNFTs) => {
    if (!editMode) {
      setAuction({
        ...auction,
        tiers: [
          ...auction.tiers,
          {
            id: uuid(),
            name: tierName,
            winners,
            nftsPerWinner,
            minBidValue,
            nfts: prevNFTs,
          },
        ],
      });
    } else {
      const newTiers = [];
      auction.tiers.forEach((tier) => {
        if (tier.id === editMode.id) {
          tier.name = tierName;
          tier.winners = winners;
          tier.nftsPerWinner = nftsPerWinner;
          tier.minBidValue = minBidValue;
          tier.nfts = prevNFTs;
          newTiers.push(tier);
        } else {
          newTiers.push(tier);
        }
      });
      setAuction({
        ...auction,
        tiers: newTiers,
      });
    }
    setSelectedNFTIds([]);
    history.push('/setup-auction/reward-tiers');
  };

  useEffect(() => {
    const getCollections = myNFTs.filter((nft) => nft.collectionName);
    const uniqueCollections = getCollections.filter(
      (v, i, a) => a.findIndex((t) => t.collectionName === v.collectionName) === i
    );
    const newCollections = [];
    uniqueCollections.forEach((collection) => {
      newCollections.push({
        id: uuid(),
        name: collection.collectionName,
        avatar: collection.collectionAvatar,
        selected: false,
      });
    });
    setCollections(newCollections);
  }, []);

  useEffect(() => {
    const res = collections.filter((col) => col.selected);
    if (res.length || searchByName) {
      const newFilteredNFTs = [];
      myNFTs.forEach((nft) => {
        if (!searchByName && res.length) {
          if (nft.type === 'collection') {
            res.forEach((item) => {
              if (nft.collectionName === item.name) {
                newFilteredNFTs.push(nft);
              }
            });
          }
        } else if (!res.length && searchByName) {
          if (nft.name.toLowerCase().includes(searchByName.toLowerCase())) {
            newFilteredNFTs.push(nft);
          }
        } else if (res.length && searchByName) {
          res.forEach((item) => {
            if (
              nft.collectionName === item.name &&
              nft.name.toLowerCase().includes(searchByName.toLowerCase())
            ) {
              newFilteredNFTs.push(nft);
            }
          });
        }
      });
      setFilteredNFTs(newFilteredNFTs);
    } else {
      setFilteredNFTs(myNFTs);
    }
  }, [collections, searchByName]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

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

  return (
    <div className="tab__wallet">
      <Animated animationIn="fadeInUp" className="animate__filters__popup">
        <div hidden={mobileVersion} className="filter__by__collection_mobile">
          <div className="filter__by__collection_mobile__overlay" />
          <div className="filter__by__collection_mobile__popup">
            <img
              className="close"
              src={closeIcon}
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
                        <img src={URL.createObjectURL(collection.avatar)} alt={collection.name} />
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
      </Animated>

      {myNFTs.length && myNFTs.filter((nft) => !nft.hidden).length ? (
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
                <Input
                  className={`target ${isCollectionDropdownOpened ? 'focused' : ''}`}
                  type="text"
                  placeholder="Browse collections..."
                  onFocus={() => setIsCollectionDropdownOpened(true)}
                  hoverBoxShadowGradient
                />
                <img src={searchIcon} alt="icon" className="searchIcon" />
              </div>
            </div>

            <div className="search__by__name">
              <div className="search__by__name__label">
                <span>Search by name</span>
              </div>
              <div className="search__by__name__input">
                <Input
                  type="text"
                  placeholder="Start typing"
                  value={searchByName}
                  onChange={(e) => handleSearchByName(e.target.value)}
                  hoverBoxShadowGradient
                />
                <img src={searchIcon} alt="icon" className="searchIcon" />
              </div>
            </div>

            {/* <Button className="filter" onClick={handleFiltersClick}>{`Filters ${collections.filter(col => col.selected).length !== 0 ? '('+collections.filter(col => col.selected).length+')' : ''}`}</Button> */}
            <Button className="filter" onClick={handleFiltersClick}>
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
                        <img src={URL.createObjectURL(collection.avatar)} alt={collection.name} />
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
                    {typeof collection.avatar === 'string' && collection.avatar.startsWith('#') ? (
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
                    <button type="button" title="Remove" onClick={() => handleCollections(index)}>
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
          {location.pathname === '/create-tiers' ? (
            <>
              <h3>No NFTs found in your wallet</h3>
              <p className="desc">Mint some NFTs by clicking the button below</p>
              <button
                type="button"
                className="set_up"
                onClick={() => {
                  history.push('/my-nfts');
                }}
              >
                Go to Minting
              </button>
            </>
          ) : (
            <div className="tabs-empty">
              <div className="image-bubble">
                <img src={bubbleIcon} alt="bubble-icon" />
              </div>
              <h3>No NFTs found</h3>
              <p>Create NFTs or NFT collections with our platform by clicking the button below</p>
              <Button
                // className="light-button"
                // onClick={() => history.push('/my-nfts/create', { tabIndex: 1, nftType: 'single' })}
                ref={ref}
                className={`create--nft--dropdown  ${
                  isDropdownOpened ? 'opened' : ''
                } light-button`}
                onClick={() => setIsDropdownOpened(!isDropdownOpened)}
                aria-hidden="true"
              >
                Create
                <img src={plusIcon} alt="icon" />
                {isDropdownOpened && (
                  <div className="sort__share__dropdown">
                    <ul>
                      <li
                        aria-hidden="true"
                        onClick={() =>
                          history.push('/my-nfts/create', { tabIndex: 1, nftType: 'single' })
                        }
                      >
                        NFT
                      </li>
                      <li
                        aria-hidden="true"
                        onClick={() =>
                          history.push('/my-nfts/create', { tabIndex: 1, nftType: 'collection' })
                        }
                      >
                        Collection
                      </li>
                    </ul>
                  </div>
                )}
              </Button>
            </div>
          )}
        </div>
      )}
      {isCreatingAction && (
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
                {Array(nftsPerWinner - previewNFTs.length)
                  .fill(0)
                  .map((el, i) => (
                    <div className="placeholder" key={uuid()} />
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
      )}
    </div>
  );
};

Wallet.propTypes = {
  filteredNFTs: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setFilteredNFTs: PropTypes.func.isRequired,
  selectedNFTIds: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setSelectedNFTIds: PropTypes.func.isRequired,
  tierName: PropTypes.string,
  winners: PropTypes.number,
  nftsPerWinner: PropTypes.number,
  minBidValue: PropTypes.string,
};

Wallet.defaultProps = {
  tierName: '',
  winners: null,
  nftsPerWinner: null,
  minBidValue: '',
};

export default Wallet;
