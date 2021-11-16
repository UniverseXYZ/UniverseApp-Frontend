/* eslint-disable no-inner-declarations */
import React, { useState, useRef, useEffect, useContext } from 'react';
import '../marketplace/browseNFT/NFTsList.scss';
import uuid from 'react-uuid';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ReactReadMoreReadLess from 'react-read-more-read-less';
import Slider from 'react-slick';
import Draggable from 'react-draggable';
import { useDoubleTap } from 'use-double-tap';
import Blockies from 'react-blockies';
import Properties from '../marketplaceTabComponents/Properties.jsx';
import Owners from '../marketplaceTabComponents/Owners.jsx';
import Bids from '../marketplaceTabComponents/Bids.jsx';
import TradingHistory from '../marketplaceTabComponents/TradingHistory.jsx';
import SharePopup from '../popups/SharePopup.jsx';
import ReportPopup from '../popups/ReportPopup.jsx';
import LikesPopup from '../popups/LikesPopup.jsx';
import Offers from '../marketplaceTabComponents/Offers.jsx';
import BuyNFTSection from '../BuyNFTSection/BuyNFTSection.jsx';
import NFTs from '../marketplaceTabComponents/NFTs.jsx';
import Button from '../button/Button.jsx';
import NFTCard from '../nft/NFTCard.jsx';
import mp3Icon from '../../assets/images/mp3-icon.png';
import bundlesIcon from '../../assets/images/marketplace/bundles.svg';
import leftArrow from '../../assets/images/marketplace/bundles-left-arrow.svg';
import rightArrow from '../../assets/images/marketplace/bundles-right-arrow.svg';
import likerTestImage from '../../assets/images/marketplace/users/user1.png';
import universeIcon from '../../assets/images/universe-img.svg';
import checkIcon from '../../assets/images/check.svg';
import { useMyNftsContext } from '../../contexts/MyNFTsContext';
import { useAuthContext } from '../../contexts/AuthContext';
import { getCollectionBackgroundColor } from '../../utils/helpers';
import SearchTokenIdField from '../input/SearchTokenIdField.jsx';
import LoadingImage from '../general/LoadingImage';
import InlineSVG from './InlineSVG';
import dots from '../../assets/images/3dots.svg';
import transferIcon from '../../assets/images/transfericon.svg';
import TransferNFTPopup from '../popups/transferNFT/TransferNFTPopup';

const MarketplaceNFTDetails = ({ data, onNFT }) => {
  const { myNFTs, setMyNFTs } = useMyNftsContext();
  const { loggedInArtist, deployedCollections, universeERC721CoreContract } = useAuthContext();
  const history = useHistory();
  const ref = useRef(null);
  const sharePopupRef = useRef(null);
  const reportPopupRef = useRef(null);
  const customPlayerRef = useRef(null);

  const [selectedNFT, setSelectedNFT] = useState(onNFT.nft);
  const { moreFromCollection, collection, owner, creator, tokenIds } = onNFT;
  const tabs = selectedNFT?.properties ? ['Properties'] : [''];
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [showTransferNFTPopup, setShowTransferNFTPopup] = useState(false);

  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [selectedNFTIndex, setSelectedNFTIndex] = useState(
    selectedNFT?.type === 'bundles' ? 0 : null
  );
  const [tablet, setTablet] = useState(false);
  const [count, setCount] = useState(4);
  const mediaRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  function SampleNextArrow(props) {
    // eslint-disable-next-line react/prop-types
    const { className, style, onClick } = props;
    const handleClick = () => {
      onClick();
      if (selectedNFTIndex < selectedNFT?.tokenIds?.length - 1) {
        setSelectedNFTIndex(selectedNFTIndex + 1);
      } else {
        setSelectedNFTIndex(0);
      }
    };
    return (
      <button
        type="button"
        className={className}
        style={{ ...style }}
        onClick={handleClick}
        aria-hidden="true"
      >
        <img src={rightArrow} alt="arrow right" />
      </button>
    );
  }

  function SamplePrevArrow(props) {
    // eslint-disable-next-line react/prop-types
    const { className, style, onClick } = props;
    const handleClick = () => {
      onClick();
      if (selectedNFTIndex > 0) {
        setSelectedNFTIndex(selectedNFTIndex - 1);
      } else {
        setSelectedNFTIndex(selectedNFT.tokenIds?.length - 1);
      }
    };
    return (
      <button
        type="button"
        className={className}
        style={{ ...style }}
        onClick={handleClick}
        aria-hidden="true"
      >
        <img src={leftArrow} alt="arrow left" />
      </button>
    );
  }

  const sliderSettings = {
    dots: false,
    infinite: selectedNFT.tokenIds?.length > 6,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const handleClickOutside = (event) => {
    if (
      ref.current &&
      !ref.current.contains(event.target) &&
      !sharePopupRef.current &&
      !reportPopupRef.current
    ) {
      setIsDropdownOpened(false);
    }
    if (ref.current && !ref.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  useEffect(() => {
    if (Number(window.innerWidth) <= 1230) {
      setTablet(true);
      setCount(3);
    } else {
      setTablet(false);
      setCount(4);
    }
  }, []);

  useEffect(() => {
    if (onNFT.id !== selectedNFT.id) {
      setSelectedNFT(onNFT.nft);
    }
  }, [onNFT]);

  const handleSelectedNFTLikeClick = (id) => {
    const newNFTs = [...myNFTs];
    newNFTs.forEach((item) => {
      if (item.id === id) {
        if (!item.likers?.length) {
          item.likers.push({
            id: loggedInArtist.id,
            name: loggedInArtist.name || 'John Doe',
            avatar: loggedInArtist.avatar || likerTestImage,
          });
        } else {
          const alreadyLiked = item.likers.some((i) => i.id === loggedInArtist.id);
          if (!alreadyLiked) {
            item.likers.push({
              id: loggedInArtist.id,
              name: loggedInArtist.name || 'John Doe',
              avatar: loggedInArtist.avatar || likerTestImage,
            });
          } else {
            item.likers = item.likers.filter((i) => i.id !== loggedInArtist.id);
          }
        }
      }
    });
    setMyNFTs(newNFTs);
    // setSelectedNFT({
    //   ...selectedNFT,
    //   likesCount: selectedNFT.liked ? selectedNFT.likesCount - 1 : selectedNFT.likesCount + 1,
    //   liked: !selectedNFT.liked,
    // });
    // setNFTs((prevState) =>
    //   prevState.map((el) =>
    //     el.id === id
    //       ? {
    //           ...el,
    //           likesCount: el.liked ? el.likesCount - 1 : el.likesCount + 1,
    //           liked: !el.liked,
    //         }
    //       : el
    //   )
    // );
  };

  const handleLikeClick = (id) => {
    setNFTs((prevState) =>
      prevState.map((el) =>
        el.id === id
          ? {
              ...el,
              likesCount: el.liked ? el.likesCount - 1 : el.likesCount + 1,
              liked: !el.liked,
            }
          : el
      )
    );
  };

  const handleLikeDivClick = (e) => {
    if (e.target.nodeName !== 'svg' && e.target.nodeName !== 'path') {
      document.getElementById('likes-hidden-btn').click();
    }
  };

  const generateImage = () => {
    if (selectedNFT.original_url) {
      if (selectedNFT.original_url.startsWith('ipfs://')) {
        return selectedNFT.original_url.replace('ipfs://', 'https://ipfs.io/');
      }
      return selectedNFT.original_url;
    }

    return selectedNFT.optimized_url || selectedNFT.thumbnail_url;
  };

  const showNftImage = () => {
    if (!selectedNFT.optimized_url.endsWith('.svg')) {
      return <LoadingImage showSpinner src={generateImage()} alt={selectedNFT.name} />;
    }

    return <InlineSVG svgUrl={selectedNFT.optimized_url || selectedNFT.thumbnail_url} />;
  };

  return (
    <>
      <div className="marketplace--nft--page">
        <Popup
          trigger={
            <button
              type="button"
              id="likes-hidden-btn"
              aria-label="hidden"
              style={{ display: 'none' }}
            />
          }
        >
          {(close) => <LikesPopup onClose={close} />}
        </Popup>
        <div className="Marketplace--img">
          <div
            className={`image--wrapper ${selectedNFT.type === 'bundles' ? 'with--bundles' : ''}`}
            aria-hidden="true"
          >
            {selectedNFT.type !== 'bundles' ? (
              <>
                {!selectedNFT.artworkType.endsWith('mpeg') &&
                  !selectedNFT.artworkType.endsWith('mp4') &&
                  showNftImage()}

                {selectedNFT.artworkType && selectedNFT.artworkType.endsWith('mp4') && (
                  <video muted playsInline autoPlay controls>
                    <source
                      src={
                        selectedNFT.original_url.startsWith('ipfs://')
                          ? selectedNFT.original_url.replace('ipfs://', 'https://ipfs.io/')
                          : selectedNFT.original_url
                      }
                      type="video/mp4"
                    />
                    <track kind="captions" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </>
            ) : (
              <>
                {/* // TODO:: there is no such format in the current BE */}
                {selectedNFT.tokenIds[selectedNFTIndex].type !== 'audio/mpeg' &&
                  selectedNFT.tokenIds[selectedNFTIndex].type !== 'video/mp4' && (
                    <img
                      src={selectedNFT.tokenIds[selectedNFTIndex].original_url}
                      alt={selectedNFT.name}
                    />
                  )}
                {selectedNFT.tokenIds[selectedNFTIndex].type === 'video/mp4' && (
                  <video ref={mediaRef} muted playsInline autoPlay controls>
                    <source src={selectedNFT.tokenIds[selectedNFTIndex].url} type="video/mp4" />
                    <track kind="captions" />
                    Your browser does not support the video tag.
                  </video>
                )}
                <div className="nft--count">
                  <img src={bundlesIcon} alt="Bundles" />
                  <span>{`${selectedNFTIndex + 1} of ${selectedNFT.tokenIds?.length}`}</span>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="Marketplace--settings">
          <div className="Marketplace--name">
            <h1>{selectedNFT.name}</h1>
            <div className="nft--sorting">
              <div
                className={`dropdown ${showDropdown ? 'open' : ''}`}
                aria-hidden="true"
                onClick={() => setShowDropdown(!showDropdown)}
                ref={ref}
              >
                <img src={dots} alt="dot" />
                {showDropdown ? (
                  <div className="dropdown--items">
                    <div className="transfer--section">
                      <button type="button" onClick={() => setShowTransferNFTPopup(true)}>
                        <img src={transferIcon} alt="transfer" />
                        Transfer
                      </button>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <Popup closeOnDocumentClick={false} open={showTransferNFTPopup}>
                  <TransferNFTPopup close={() => setShowTransferNFTPopup(false)} nft={onNFT} />
                </Popup>
              </div>
            </div>
          </div>
          <div className="Marketplace--number">
            <p>
              Edition&nbsp;
              {`${selectedNFT.tokenIds ? selectedNFT.tokenIds.length : 1}/${
                selectedNFT.numberOfEditions
                  ? selectedNFT.numberOfEditions
                  : selectedNFT.tokenIds
                  ? selectedNFT.tokenIds.length
                  : 1
              }`}
            </p>
            <div className="tokenIds-dropdown">
              <SearchTokenIdField searchValue={searchValue} setSearchValue={setSearchValue} />
              <ul className="tokenIds">
                {tokenIds.filter((tokenId) => tokenId.toString().includes(searchValue)).length ? (
                  <>
                    {tokenIds
                      .filter((tokenId) => tokenId.toString().includes(searchValue))
                      .map((tokenId) => (
                        <li
                          key={uuid()}
                          aria-hidden="true"
                          onClick={() => {
                            history.push(`/nft/${collection.address}/${tokenId}`);
                          }}
                        >
                          <span>{`#${tokenId}`}</span>
                          {tokenId === selectedNFT.tokenId ? (
                            <img src={checkIcon} alt="check" />
                          ) : (
                            <></>
                          )}
                        </li>
                      ))}
                  </>
                ) : (
                  <p>No results</p>
                )}
              </ul>
              <div className="inset--bottom--shadow" />
            </div>
          </div>
          <div className="Marketplace--collections">
            {!creator ? (
              <></>
            ) : creator &&
              (creator.avatar ||
                (creator.profileImageUrl && creator.profileImageUrl.length > 48)) ? (
              <div
                className="Marketplace--creators"
                onClick={() => history.push(`/${creator.universePageUrl}`)}
                aria-hidden
              >
                <img src={creator.profileImageUrl} alt="icon" />
                <div className="creator--name">
                  <p>Creator</p>
                  <h6>{creator.displayName}</h6>
                </div>
              </div>
            ) : (
              <div
                className="Marketplace--creators"
                onClick={() => history.push(`/${creator.address}`)}
                aria-hidden
              >
                <Blockies className="blockie--details" seed={creator.address} size={9} scale={4} />
                <div className="creator--name">
                  <p>Creator</p>
                  <h6
                    // TODO: Vik to fix this or someone else
                    style={{
                      maxWidth: '100px',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {creator.address}
                  </h6>
                  <span className="tooltiptext tooltiptext--left">{creator.address}</span>
                </div>
              </div>
            )}

            {collection && collection.coverUrl && (
              <div
                className="Marketplace--creators"
                onClick={() => history.push(`/collection/${collection.address}`)}
                aria-hidden
              >
                {!collection.coverUrl ? (
                  <div
                    className="random--bg--color"
                    style={{ backgroundColor: getCollectionBackgroundColor(collection) }}
                  >
                    {collection.name.charAt(0)}
                  </div>
                ) : (
                  <img src={collection.coverUrl} alt={collection.name} />
                )}
                <div className="creator--name">
                  <p>Collection</p>
                  <h6
                    style={{
                      maxWidth: '100px',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {collection.name}
                  </h6>
                  <span className="tooltiptext tooltiptext--center">{collection.name}</span>
                </div>
              </div>
            )}

            {collection && (
              <div
                className="Marketplace--creators"
                onClick={() => history.push(`/collection/${collection.address}`)}
                aria-hidden
              >
                {collection.address ===
                process.env.REACT_APP_UNIVERSE_ERC_721_ADDRESS.toLowerCase() ? (
                  <img src={universeIcon} alt={collection.name} />
                ) : !collection.coverUrl ? (
                  <div
                    className="random--bg--color"
                    style={{ backgroundColor: getCollectionBackgroundColor(collection) }}
                  >
                    {collection.name.charAt(0)}
                  </div>
                ) : (
                  <img src={collection.coverUrl} alt={collection.name} />
                )}
                <div className="creator--name">
                  <p>Collection</p>
                  <h6>{collection.name}</h6>
                </div>
              </div>
            )}

            {!owner ? (
              <></>
            ) : owner.avatar || (owner.profileImageUrl && owner.profileImageUrl.length > 48) ? (
              <div
                className="Marketplace--creators"
                onClick={() => history.push(`/${owner.universePageUrl}`)}
                aria-hidden
              >
                <img src={owner.avatar || owner.profileImageUrl} alt="icon2" />
                <div className="creator--name">
                  <p>Owner</p>
                  <h6>{owner.displayName}</h6>
                </div>
              </div>
            ) : (
              <div
                className="Marketplace--creators"
                onClick={() => history.push(`/${owner.address}`)}
                aria-hidden
              >
                <Blockies className="blockie--details" seed={owner.address} size={9} scale={4} />
                <div className="creator--name">
                  <p>Owner</p>
                  <h6
                    // TODO: Vik to fix this or someone else
                    style={{
                      maxWidth: '100px',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {owner.address}
                  </h6>
                  <span className="tooltiptext tooltiptext--right">{owner.address}</span>
                </div>
              </div>
            )}
          </div>

          <div className="Marketplace--text">
            <p>
              <ReactReadMoreReadLess
                charLimit={150}
                readMoreText="Read more"
                readLessText="Read less"
              >
                {selectedNFT.description || ''}
              </ReactReadMoreReadLess>
            </p>
          </div>
          <div className="tabs">
            <ul className="tab_items">
              {tabs.map((tab, index) => (
                <li
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className={selectedTabIndex === index ? 'active' : ''}
                  aria-hidden="true"
                  onClick={() => setSelectedTabIndex(index)}
                >
                  {tab}
                </li>
              ))}
            </ul>
          </div>
          <div>
            {selectedNFT.type !== 'bundles' ? (
              <>
                {selectedTabIndex === 0 && selectedNFT.properties !== null && (
                  <Properties properties={selectedNFT.properties || []} />
                )}
                {selectedTabIndex === 1 && <Owners />}
                {selectedTabIndex === 2 && <Bids />}
                {selectedTabIndex === 3 && <Offers view={selectedNFT.view} />}
                {selectedTabIndex === 4 && <TradingHistory />}
              </>
            ) : (
              <>
                {selectedTabIndex === 0 && <NFTs data={selectedNFT.tokenIds} />}
                {selectedTabIndex === 1 && <Bids />}
                {selectedTabIndex === 2 && <Offers view={selectedNFT.view} />}
                {selectedTabIndex === 3 && <TradingHistory />}
              </>
            )}
          </div>
          {/* {selectedNFT.view === 'user' ? (
            <BuyNFTSection
              highestBid={highestBid}
              firstButtonText="Place a bid"
              secondButtonText="Make offer"
              auctionLeftTime="1d : 4h : 20m : 30s"
              infotext="(10% of sales will go to creator)"
            />
          ) : selectedNFT.viewAction === 'Change price' ? (
            <BuyNFTSection
              highestBid={highestBid}
              firstButtonText="Change price"
              secondButtonText="Cancel listing"
              auctionLeftTime="1d : 4h : 20m : 30s"
              infotext="(This NFT is on your wallet)"
            />
          ) : selectedNFT.viewAction === 'Lower price' ? (
            <BuyNFTSection
              highestBid={highestBid}
              firstButtonText="Lower price"
              secondButtonText="Cancel listing"
              auctionLeftTime="1d : 4h : 20m : 30s"
              infotext="(This NFT is on your wallet)"
            />
          ) : (
            <div className="theunveiling" style={{ paddingBottom: '0px' }}>
              <img className="border--gradient" src={bordergradient} alt="border" />
              <div className="saler__content">
                <Button className="light-button">Put on sale</Button>
                <p>This NFT is on your wallet</p>
              </div>
            </div>
          )} */}
        </div>
      </div>
      {collection && moreFromCollection?.length ? (
        <div className="collection">
          <div className="collection--container">
            <div className="collection--title">
              <h1>More from this collection</h1>
            </div>
            <div className="nfts__lists">
              {moreFromCollection.map((nft) => (
                <NFTCard
                  key={nft.id}
                  nft={{
                    ...nft,
                    collection,
                  }}
                />
              ))}
            </div>
            <div className="view--button">
              <button
                type="button"
                className="light-button"
                onClick={() =>
                  history.push(`/collection/${collection.address}`, {
                    collection,
                    saved: false,
                  })
                }
              >
                View Collection
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

MarketplaceNFTDetails.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]),
  onNFT: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

MarketplaceNFTDetails.defaultProps = {
  data: [],
};
export default MarketplaceNFTDetails;
