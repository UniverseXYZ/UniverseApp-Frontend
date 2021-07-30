import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  PLACEHOLDER_MARKETPLACE_AUCTIONS,
  PLACEHOLDER_MARKETPLACE_NFTS,
  PLACEHOLDER_MARKETPLACE_USERS,
  PLACEHOLDER_MARKETPLACE_COLLECTIONS,
  PLACEHOLDER_MARKETPLACE_COMMUNITIES,
  PLACEHOLDER_MARKETPLACE_GALLERIES,
} from '../../utils/fixtures/BrowseNFTsDummyData';
import './Header.scss';
import Button from '../button/Button';
import DesktopView from './dimensions/desktop/DesktopView.jsx';
import TabletView from './dimensions/tablet/TabletView.jsx';
import MobileView from './dimensions/mobile/MobileView.jsx';
import AppContext from '../../ContextAPI';
import appDarkLogo from '../../assets/images/dark.svg';
import appLightLogo from '../../assets/images/light.svg';
import searchIcon from '../../assets/images/search-gray.svg';
import closeIcon from '../../assets/images/close-menu.svg';
import mp3Icon from '../../assets/images/mp3-icon.png';
import audioIcon from '../../assets/images/marketplace/audio-icon.svg';
import { defaultColors } from '../../utils/helpers';

const Header = ({ location }) => {
  const { isWalletConnected, setIsWalletConnected, darkMode } = useContext(AppContext);
  const PLACEHOLDER_ETHEREUM_ADDRESS = '0x5493a5a6f...ef8b';
  const history = useHistory();
  const [selectedWallet, setSelectedWallet] = useState('');
  const [installed, setInstalled] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [showSelectWallet, setShowSelectWallet] = useState(false);
  const [showInstallWalletPopup, setShowInstallWalletPopup] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const searchRef = useRef();
  const ref = useRef();

  const handleSearchKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (searchValue) {
        history.push(`/search`, { query: searchValue });
        setSearchValue('');
        searchRef.current.blur();
      }
    }
  };
  const handleAllResults = () => {
    history.push(`/search`, { query: searchValue });
    setSearchValue('');
    searchRef.current.blur();
  };

  const handleConnectWallet = (wallet) => {
    // Here need to check if selected wallet is installed in browser
    setSelectedWallet(wallet);
    if (installed) {
      setIsWalletConnected(true);
      setShowMenu(false);
      setShowSelectWallet(false);
    } else {
      setShowInstallWalletPopup(true);
    }
  };
  const handleClickOutside = (event) => {
    if (
      ref.current &&
      !ref.current.contains(event.target) &&
      searchRef.current &&
      !searchRef.current.contains(event.target)
    ) {
      setSearchValue('');
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  useEffect(() => {
    setShowMenu(false);
    if (
      location.pathname === '/' ||
      location.pathname === '/about' ||
      location.pathname === '/minting-and-auctions/marketplace/active-auctions' ||
      location.pathname === '/minting-and-auctions/marketplace/future-auctions' ||
      location.pathname === '/polymorphs' ||
      location.pathname === '/mint-polymorph' ||
      location.pathname === '/team'
    ) {
      document.querySelector('header').classList.add('dark');
    } else {
      document.querySelector('header').classList.remove('dark');
    }
  }, [location.pathname]);

  useEffect(() => {
    if (darkMode && showMenu) {
      document.querySelector('header').classList.remove('dark');
    } else if (darkMode && !showMenu) {
      document.querySelector('header').classList.add('dark');
    }
  }, [showMenu, darkMode]);

  return (
    <header>
      <div className="app__logo">
        <Link className="dark" to="/">
          <img src={appDarkLogo} alt="App Logo" />
        </Link>
        <Link className="light" to="/">
          <img src={appLightLogo} alt="App Logo" />
        </Link>
        <div className="search--field">
          <img className="search" src={searchIcon} alt="Search" />
          <input
            type="text"
            className="inp"
            placeholder="Search"
            ref={searchRef}
            onChange={(e) => e.target.value.length < 16 && setSearchValue(e.target.value)}
            value={searchValue}
            onKeyDown={handleSearchKeyDown}
          />
          {searchValue.length > 0 && (
            <>
              <img
                className="close"
                src={closeIcon}
                alt="Close"
                onClick={() => setSearchValue('')}
                aria-hidden="true"
              />
              <div className="search__results" ref={ref}>
                {PLACEHOLDER_MARKETPLACE_NFTS.filter((item) =>
                  item.name.toLowerCase().includes(searchValue.toLowerCase())
                ).length > 0 ||
                PLACEHOLDER_MARKETPLACE_USERS.filter((item) =>
                  item.name.toLowerCase().includes(searchValue.toLowerCase())
                ).length > 0 ||
                PLACEHOLDER_MARKETPLACE_AUCTIONS.filter((item) =>
                  item.name.toLowerCase().includes(searchValue.toLowerCase())
                ).length > 0 ||
                PLACEHOLDER_MARKETPLACE_COLLECTIONS.filter((item) =>
                  item.name.toLowerCase().includes(searchValue.toLowerCase())
                ).length > 0 ||
                PLACEHOLDER_MARKETPLACE_COMMUNITIES.filter((item) =>
                  item.name.toLowerCase().includes(searchValue.toLowerCase())
                ).length > 0 ||
                PLACEHOLDER_MARKETPLACE_GALLERIES.filter((item) =>
                  item.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
                ).length ? (
                  <div className="search__nfts">
                    {PLACEHOLDER_MARKETPLACE_NFTS.filter((item) =>
                      item.name.toLowerCase().includes(searchValue.toLowerCase())
                    ).length > 0 && <h4>NFTs</h4>}
                    {PLACEHOLDER_MARKETPLACE_NFTS.filter((item) =>
                      item.name.toLowerCase().includes(searchValue.toLowerCase())
                    ).map((nft) => (
                      <div className="nft__div">
                        <div className="nft--image">
                          {nft.media.type !== 'audio/mpeg' && nft.media.type !== 'video/mp4' && (
                            <img src={nft.media.url} alt="NFT" />
                          )}
                          {nft.media.type === 'video/mp4' && (
                            <video
                              onMouseOver={(event) => event.target.play()}
                              onFocus={(event) => event.target.play()}
                              onMouseOut={(event) => event.target.pause()}
                              onBlur={(event) => event.target.pause()}
                            >
                              <source src={nft.media.url} type="video/mp4" />
                              <track kind="captions" />
                              Your browser does not support the video tag.
                            </video>
                          )}
                          {nft.media.type === 'audio/mpeg' && (
                            <img className="nft--image" src={mp3Icon} alt={nft.name} />
                          )}
                          {nft.media.type === 'audio/mpeg' && (
                            <div className="video__icon">
                              <img src={audioIcon} alt="Video Icon" />
                            </div>
                          )}
                        </div>
                        <div className="nft--desc">
                          <h5 className="nft--name">{nft.name}</h5>
                          <p className="nft--price">
                            {nft.price} ETH / {nft.editions.split('/')[0]} of{' '}
                            {nft.editions.split('/')[1]}
                          </p>
                        </div>
                      </div>
                    ))}
                    {PLACEHOLDER_MARKETPLACE_USERS.filter((item) =>
                      item.name.toLowerCase().includes(searchValue.toLowerCase())
                    ).length > 0 && <h4>Users</h4>}
                    {PLACEHOLDER_MARKETPLACE_USERS.filter((item) =>
                      item.name.toLowerCase().includes(searchValue.toLowerCase())
                    ).map((user) => (
                      <div className="users__div">
                        <div className="user--avatar">
                          <img src={user.avatar} alt="User" />
                        </div>
                        <div className="user--desc">
                          <h5 className="user--name">{user.name}</h5>
                          <p className="user--followers">{user.followers} Followers</p>
                        </div>
                      </div>
                    ))}
                    {PLACEHOLDER_MARKETPLACE_AUCTIONS.filter((item) =>
                      item.name.toLowerCase().includes(searchValue.toLowerCase())
                    ).length > 0 && <h4>Auctions</h4>}
                    {PLACEHOLDER_MARKETPLACE_AUCTIONS.filter((item) =>
                      item.name.toLowerCase().includes(searchValue.toLowerCase())
                    ).map((auction) => (
                      <div className="auction__div">
                        <div className="auction--image">
                          <img src={auction.photo} alt="Auction" />
                        </div>
                        <div className="auction--desc">
                          <h5 className="auction--title">{auction.name}</h5>
                          <p className="auction--artist">by {auction.creator.name}</p>
                        </div>
                      </div>
                    ))}
                    {PLACEHOLDER_MARKETPLACE_COLLECTIONS.filter((item) =>
                      item.name.toLowerCase().includes(searchValue.toLowerCase())
                    ).length > 0 && <h4>Collections</h4>}
                    {PLACEHOLDER_MARKETPLACE_COLLECTIONS.filter((item) =>
                      item.name.toLowerCase().includes(searchValue.toLowerCase())
                    ).map((collection) => (
                      <div className="collection__div">
                        {!collection.photo ? (
                          <div
                            className="random--avatar--color"
                            style={{
                              backgroundColor:
                                defaultColors[Math.floor(Math.random() * defaultColors.length)],
                            }}
                          >
                            {collection.name.charAt(0)}
                          </div>
                        ) : (
                          <div className="collection--image">
                            <img src={collection.photo} alt="Coll" />
                          </div>
                        )}
                        <div className="collection--desc">
                          <h5 className="collection--name">{collection.name}</h5>
                          <p className="collection--owner">by {collection.owner.name}</p>
                        </div>
                      </div>
                    ))}
                    {PLACEHOLDER_MARKETPLACE_COMMUNITIES.filter((item) =>
                      item.name.toLowerCase().includes(searchValue.toLowerCase())
                    ).length > 0 && <h4>Communities</h4>}
                    {PLACEHOLDER_MARKETPLACE_COMMUNITIES.filter((item) =>
                      item.name.toLowerCase().includes(searchValue.toLowerCase())
                    ).map((communities) => (
                      <div className="communities__div">
                        <div className="communities--photo">
                          <img src={communities.photo} alt="Comm" />
                        </div>
                        <div className="communities--desc">
                          <h5 className="communities--name">{communities.name}</h5>
                          <p className="communities--members">{communities.members} Members</p>
                        </div>
                      </div>
                    ))}
                    {PLACEHOLDER_MARKETPLACE_GALLERIES.filter((item) =>
                      item.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
                    ).length > 0 && <h4>Galleries</h4>}
                    {PLACEHOLDER_MARKETPLACE_GALLERIES.filter((item) =>
                      item.name.toLowerCase().includes(searchValue.toLowerCase())
                    ).map((galleries) => (
                      <div className="galleries__div">
                        <div className="galleries--photo">
                          <img src={galleries.photos[0]} alt="Gall" />
                        </div>
                        <div className="galleries--desc">
                          <h5 className="galleries--name">{galleries.name}</h5>
                          <p className="galleries--likes">{galleries.likesCount} Likes</p>
                        </div>
                      </div>
                    ))}
                    <Button
                      type="button"
                      className="light-border-button"
                      onClick={() => handleAllResults()}
                    >
                      All results
                    </Button>
                  </div>
                ) : (
                  <div className="no__result">
                    <p>No items found</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <DesktopView
        isWalletConnected={isWalletConnected}
        setIsWalletConnected={setIsWalletConnected}
        ethereumAddress={PLACEHOLDER_ETHEREUM_ADDRESS}
        handleConnectWallet={handleConnectWallet}
        showInstallWalletPopup={showInstallWalletPopup}
        setShowInstallWalletPopup={setShowInstallWalletPopup}
        selectedWallet={selectedWallet}
        setSelectedWallet={setSelectedWallet}
      />
      <TabletView
        isWalletConnected={isWalletConnected}
        setIsWalletConnected={setIsWalletConnected}
        ethereumAddress={PLACEHOLDER_ETHEREUM_ADDRESS}
        handleConnectWallet={handleConnectWallet}
        showInstallWalletPopup={showInstallWalletPopup}
        setShowInstallWalletPopup={setShowInstallWalletPopup}
        selectedWallet={selectedWallet}
        setSelectedWallet={setSelectedWallet}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        setShowSearch={setShowSearch}
        showSearch={showSearch}
      />
      <MobileView
        isWalletConnected={isWalletConnected}
        setIsWalletConnected={setIsWalletConnected}
        ethereumAddress={PLACEHOLDER_ETHEREUM_ADDRESS}
        handleConnectWallet={handleConnectWallet}
        setShowMenu={setShowMenu}
        setShowSelectWallet={setShowSelectWallet}
        showMenu={showMenu}
        showSelectWallet={showSelectWallet}
        showInstallWalletPopup={showInstallWalletPopup}
        setSelectedWallet={setSelectedWallet}
        setShowInstallWalletPopup={setShowInstallWalletPopup}
        selectedWallet={selectedWallet}
        setShowMobileSearch={setShowMobileSearch}
        showMobileSearch={showMobileSearch}
      />
    </header>
  );
};

Header.propTypes = {
  location: PropTypes.oneOfType([PropTypes.any]).isRequired,
};

export default withRouter(Header);
