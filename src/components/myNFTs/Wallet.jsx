import { useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router';
import { Animated } from 'react-animated-css';
import uuid from 'react-uuid';
import Lists from './Lists';
import ItemsPerPageDropdown from '../pagination/ItemsPerPageDropdown';
import Pagination from '../pagination/Pagionation';
import AppContext from '../../ContextAPI';
import Button from '../button/Button';
import '../pagination/Pagination.scss';
import closeIcon from '../../assets/images/cross.svg';
import filterIcon from '../../assets/images/filters-icon.svg';
import crossSmall from '../../assets/images/crossSmall.svg';

const Wallet = ({ filteredNFTs, setFilteredNFTs }) => {
  const { myNFTs, auction, setAuction, selectedNFTIds, setSelectedNFTIds } = useContext(AppContext);
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
  const isCreatingAction = location.pathname === '/select-nfts';
  const tierId = location.state;
  const tierById = auction.tiers.find((element) => element.id === tierId);

  const handleCollectionsMobile = () => {
    setCollections(draftCollections);
    setMobileVersion(true);
    document.querySelector('.animate__filters__popup').style.display = 'none';
    setIndexes([]);
  };
  const closeCollectionMobile = () => {
    const newCollections = [...draftCollections];
    indexes.map((index) => {
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
    newCollections.map((collection, index) => {
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
    newCollections.map((collection) => (collection.selected = false));

    setCollections(newCollections);
    setSearchByName('');
  };

  const handleSearchByName = (value) => {
    setSearchByName(value);
  };

  const handledeleteNft = (nftSelected) => {
    const nftIndex = selectedNFTIds.findIndex((nft) => nft === nftSelected.id);
    setSelectedNFTIds((selectedNFTIds) => selectedNFTIds.filter((item) => item !== nftSelected.id));
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

  const handleContinue = (previewNFTs) => {
    setAuction((auction) => ({
      ...auction,
      tiers: [
        ...auction.tiers.filter((tier) => tier.id !== tierById.id),
        { ...tierById, nfts: previewNFTs },
      ],
    }));
    history.push('/review-reward', tierId);
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
    const previewNFTs = [];
    filteredNFTs.forEach((nft) => {
      if (selectedNFTIds.includes(nft.id)) {
        previewNFTs.push(nft);
      }
    });
    setPreviewNFTs(previewNFTs);
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
            />
            <div className="filter_by_collection_buttons">
              <button className="clear_all" onClick={clearFiltersMobile}>
                Clear all
              </button>
              <button
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
                <label>Filter by collection</label>
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
                  <div className="empty__nfts">
                    <h3>No Collections found</h3>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Animated>

      {myNFTs.length ? (
        <>
          <div className="filtration">
            <div className="filter__by__collection">
              <div className="filter__by__collection__label">
                <label>Filter by collection</label>
                <button className="clear_all" onClick={clearFilters}>
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
                <label>Seach by name</label>
              </div>
              <div className="search__by__name__input">
                <input
                  type="text"
                  placeholder="Start typing"
                  value={searchByName}
                  onChange={(e) => handleSearchByName(e.target.value)}
                />
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
                  <div className="empty__nfts">
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
                    <button title="Remove" onClick={() => handleCollections(index)}>
                      &#10006;
                    </button>
                  </div>
                )
            )}
          </div>
          {filteredNFTs.length ? (
            <>
              <Lists data={filteredNFTs} perPage={perPage} offset={offset} />

              <div className="pagination__container">
                <Pagination data={filteredNFTs} perPage={perPage} setOffset={setOffset} />
                <ItemsPerPageDropdown perPage={perPage} setPerPage={setPerPage} />
              </div>
            </>
          ) : (
            <div className="empty__nfts">
              <h3>No NFTs found</h3>
            </div>
          )}
        </>
      ) : (
        <div className="empty__nfts">
          <h3>No NFTs found</h3>
        </div>
      )}
      {isCreatingAction && tierById && (
        <div className="container selected-ntf">
          <div className="infoSelect-div">
            <span>Number of winners : {tierById.winners}</span>
            <span>NFTs per winner : {tierById.nftsPerWinner}</span>
            {tierById.nftsPerWinner > previewNFTs.length && (
              <span className="err-select">
                You have not selected enough NFTs for this reward tier
              </span>
            )}
          </div>
          <div className="sel-info">
            <div className="img-div">
              {previewNFTs.map((nft, index) => (
                <div className="imgs">
                  <img
                    key={nft}
                    className="smallView-image"
                    src={URL.createObjectURL(nft.previewImage)}
                    alt={nft.name}
                  />
                  <img
                    className="del-img"
                    src={crossSmall}
                    onClick={() => handledeleteNft(nft)}
                    alt="delete"
                  />
                </div>
              ))}
            </div>
            <div className="continue-nft">
              {tierById && tierById.nftsPerWinner === previewNFTs.length ? (
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
      )}
    </div>
  );
};

Wallet.propTypes = {
  filteredNFTs: PropTypes.array,
  setFilteredNFTs: PropTypes.func,
};

export default Wallet;
