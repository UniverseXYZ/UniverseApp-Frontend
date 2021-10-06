import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { Animated } from 'react-animated-css';
import uuid from 'react-uuid';
import Lists from './Lists';
import ItemsPerPageDropdown from '../pagination/ItemsPerPageDropdown.jsx';
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
import NFTCard from '../nft/NFTCard';
import SearchFilters from '../nft/SearchFilters';
import { isImage, isAudio, isVideo, getNftImage } from '../../utils/helpers/pureFunctions/nfts';
import { useAuctionContext } from '../../contexts/AuctionContext';
import { useMyNftsContext } from '../../contexts/MyNFTsContext';
import { useAuthContext } from '../../contexts/AuthContext';
import SimplePagination from '../pagination/SimplePaginations';
import { PLACEHOLDER_MARKETPLACE_NFTS } from '../../utils/fixtures/BrowseNFTsDummyData';
import PendingNFTs from './pendingDropdown/pendingNFTs/PendingNFTs';

const Wallet = React.memo(
  ({
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

    const { auction, setAuction } = useAuctionContext();
    const { myNFTs, myMintingNFTs } = useMyNftsContext();
    const { deployedCollections } = useAuthContext();

    const [shownNFTs, setShownNFTs] = useState(myNFTs);
    const [isCollectionDropdownOpened, setIsCollectionDropdownOpened] = useState(false);
    const [searchByName, setSearchByName] = useState('');
    const [offset, setOffset] = useState(0);
    const [perPage, setPerPage] = useState(8);
    const [page, setPage] = useState(8);
    const [collections, setCollections] = useState([]);
    const [mobileVersion, setMobileVersion] = useState(true);
    const [draftCollections, setDraftCollections] = useState([]);
    const [indexes, setIndexes] = useState([]);
    const [previewNFTs, setPreviewNFTs] = useState([]);

    const ref = useRef(null);
    const ref2 = useRef(null);
    const refMobile = useRef(null);

    const history = useHistory();
    const location = useLocation();

    const isCreatingAction = location.pathname === '/create-tiers';
    const tierById = !!(winners && nftsPerWinner);
    const editMode = auction?.rewardTiers?.find((element) => element.id === location.state);

    useEffect(() => {
      setOffset(0);
    }, [perPage]);

    // We need this otherwise after updating my nfts with
    // the newly minted ones from the polling mechanism
    // the component won't rerender and show the new ones
    useEffect(() => {
      setShownNFTs(myNFTs);
    }, [myNFTs]);

    const saveIndexes = (index) => {
      const temp = [...indexes];
      temp.push(index);
      setIndexes(temp);
      const newCollections = [...collections];
      newCollections[index].selected = !newCollections[index].selected;
      setDraftCollections(newCollections);
    };

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

      if (ref2.current && !ref2.current.contains(event.target)) {
        setIsDropdownOpened(false);
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
          rewardTiers: [
            ...auction?.rewardTiers,
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
        auction?.rewardTiers?.forEach((tier) => {
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
      const newCollections = [];
      deployedCollections.forEach((collection) => {
        newCollections.push({
          id: uuid(),
          name: collection.name,
          avatar: collection.previewImage,
          selected: false,
        });
      });
      setCollections(newCollections);
    }, []);

    useEffect(() => {
      document.addEventListener('click', handleClickOutside, true);
      return () => {
        document.removeEventListener('click', handleClickOutside, true);
      };
    });
    useEffect(() => {
      const prevNFTs = [];
      shownNFTs.forEach((nft) => {
        if (selectedNFTIds.includes(nft.id)) {
          prevNFTs.push(nft);
        }
      });
      setPreviewNFTs(prevNFTs);
    }, [shownNFTs, selectedNFTIds]);
    return (
      <div className="tab__wallet">
        {isCreatingAction ? (
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
                    Apply filter
                  </button>
                </div>
                <div className="filter__by__collection">
                  <div className="filter__by__collection__label">
                    <span>Filter by collection</span>
                  </div>
                  <div className="filter__by__collection__input">
                    <Input
                      className={`target ${isCollectionDropdownOpened ? 'focused' : ''}`}
                      type="text"
                      placeholder="Browse collections..."
                      onFocus={() => setIsCollectionDropdownOpened(true)}
                      hoverBoxShadowGradient
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
                          {typeof collection.coverUrl === 'string' &&
                          collection.coverUrl.startsWith('#') ? (
                            <div
                              className="random__bg__color"
                              style={{ backgroundColor: collection.coverUrl }}
                            >
                              {collection.name.charAt(0)}
                            </div>
                          ) : (
                            <img src={collection.coverUrl} alt={collection.name} />
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
        ) : (
          <></>
        )}

        {myMintingNFTs.length || (myNFTs.length && myNFTs.filter((nft) => !nft.hidden).length) ? (
          <>
            {isCreatingAction ? (
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
                            {typeof collection.coverUrl === 'string' &&
                            collection.coverUrl.startsWith('#') ? (
                              <div
                                className="random__bg__color"
                                style={{ backgroundColor: collection.coverUrl }}
                              >
                                {collection.name.charAt(0)}
                              </div>
                            ) : (
                              <img src={collection.coverUrl} alt={collection.name} />
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
                          {typeof collection.coverUrl === 'string' &&
                          collection.coverUrl.startsWith('#') ? (
                            <div
                              className="random__bg__color"
                              style={{ backgroundColor: collection.coverUrl }}
                            >
                              {collection.name.charAt(0)}
                            </div>
                          ) : (
                            <img src={collection.coverUrl} alt={collection.name} />
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
              </>
            ) : (
              <>
                <SearchFilters data={myNFTs} setData={setShownNFTs} setOffset={setOffset} />
              </>
            )}
            <PendingNFTs />
            {shownNFTs.length ? (
              <>
                {isCreatingAction ? (
                  <Lists
                    data={shownNFTs}
                    perPage={perPage}
                    offset={offset}
                    selectedNFTIds={selectedNFTIds}
                    setSelectedNFTIds={setSelectedNFTIds}
                    winners={Number(winners)}
                    nftsPerWinner={Number(nftsPerWinner)}
                  />
                ) : (
                  <div className="nfts__lists">
                    {shownNFTs
                      .slice(offset, offset + perPage)
                      .filter((nft) => !nft.hidden)
                      .map((nft) => (
                        <NFTCard key={nft.id} nft={nft} />
                      ))}
                  </div>
                )}

                <div className="pagination__container">
                  <SimplePagination
                    data={shownNFTs}
                    perPage={perPage}
                    setOffset={setOffset}
                    setPage={setPage}
                    page={page}
                  />
                  <ItemsPerPageDropdown
                    perPage={perPage}
                    setPerPage={setPerPage}
                    itemsPerPage={[8, 16, 32]}
                  />
                </div>
              </>
            ) : (
              <></>
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
                <button
                  type="button"
                  ref={ref2}
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
                </button>
              </div>
            )}
          </div>
        )}
        {isCreatingAction && (
          <div className="selected-ntf">
            <div className="container selected-body">
              <div className="infoSelect-div">
                <span>Number of winners : {winners}</span>
                <span>NFTs per winner : {nftsPerWinner}</span>
                <div className="img-div">
                  {previewNFTs.map((nft) => (
                    <div key={nft.id} className="imgs">
                      {nft.artworkType && nft.artworkType.endsWith('mp4') && (
                        <video
                          className="smallView-image"
                          onMouseOver={(event) => event.target.play()}
                          onFocus={(event) => event.target.play()}
                          onMouseOut={(event) => event.target.pause()}
                          onBlur={(event) => event.target.pause()}
                        >
                          <source src={nft.optimized_url} type="video/mp4" />
                          <track kind="captions" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                      {nft.artworkType && nft.artworkType.endsWith('mpeg') && (
                        <img className="smallView-image" src={mp3Icon} alt={nft.name} />
                      )}
                      {nft.artworkType &&
                        !nft.artworkType.endsWith('mpeg') &&
                        !nft.artworkType.endsWith('mp4') && (
                          <img className="smallView-image" src={nft.optimized_url} alt={nft.name} />
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
  }
);

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
