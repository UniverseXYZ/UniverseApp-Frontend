import React, { useState, useContext, useEffect } from 'react';
import './CustomizeAuction.scss';
import { useHistory, useLocation } from 'react-router-dom';
import Popup from 'reactjs-popup';
import arrow from '../../assets/images/arrow.svg';
import Button from '../../components/button/Button.jsx';
import DomainAndBranding from '../../components/customizeAuction/DomainAndBranding.jsx';
import RewardTiersAuction from '../../components/customizeAuction/RewardTiersAuction.jsx';
import AboutArtistAuction from '../../components/customizeAuction/AboutArtistAuction.jsx';
import warningIcon from '../../assets/images/Exclamation.svg';
import errorIcon from '../../assets/images/red-msg.svg';
import AppContext from '../../ContextAPI';
import CongratsLandingPagePopup from '../../components/popups/CongratsLandingPagePopup';
import { RouterPrompt } from '../../utils/routerPrompt';
import { useAuctionContext } from '../../contexts/AuctionContext';
import { useAuthContext } from '../../contexts/AuthContext';

const CustomizeAuction = () => {
  const history = useHistory();
  const location = useLocation();
  const {
    auction,
    setAuction,
    myAuctions,
    setMyAuctions,
    activeAuctions,
    setActiveAuctions,
    futureAuctions,
    setFutureAuctions,
    editProfileButtonClick,
    setEditProfileButtonClick,
  } = useAuctionContext();
  const { loggedInArtist, setLoggedInArtist } = useAuthContext();
  const [customizeAuctionState, setCustomizeAuctionState] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [domainAndBranding, setDomainAndBranding] = useState({
    headline: auction.headline || '',
    link:
      auction.link ||
      `universe.xyz/${loggedInArtist.universePageAddress.split(' ')[0].toLowerCase()}/`,
    promoImage: auction.promoImage || null,
    backgroundImage: auction.backgroundImage || null,
    hasBlur: auction.hasBlur || '',
    status:
      auction.link &&
      auction.link.toLowerCase() !==
        `universe.xyz/${loggedInArtist.name.split(' ')[0].toLowerCase()}/`
        ? 'filled'
        : 'empty',
  });
  const [rewardTiersAuction, setRewardTiersAuction] = useState(auction.rewardTiers);
  const [saveAndPreview, setSaveAndPreview] = useState(false);
  const [editButtonClick, setEditButtonClick] = useState(false);

  const [about, setAbout] = useState(loggedInArtist.about);
  const [twitterLink, setTwitterLink] = useState(loggedInArtist.twitterLink);
  const [instagramLink, setInstagramLink] = useState(loggedInArtist.instagramLink);

  const placeholderText = 'your-address';
  const [accountName, setAccountName] = useState(loggedInArtist.name);
  const [accountPage, setAccountPage] = useState(
    `universe.xyz/${loggedInArtist.universePageAddress || placeholderText}`
  );
  const [accountImage, setAccountImage] = useState(loggedInArtist.avatar);
  const [userTempData, setUserTempData] = useState({});

  useEffect(() => {
    if (userTempData.accountName) {
      const isTierEdited = rewardTiersAuction.filter((i) => i.description || i.tierImg);
      if (
        domainAndBranding.backgroundImage ||
        domainAndBranding.hasBlur ||
        domainAndBranding.headline ||
        domainAndBranding.promoImage ||
        domainAndBranding.link.split('/')[2] ||
        userTempData.accountName !== accountName ||
        userTempData.about !== about ||
        userTempData.twitterLink !== twitterLink ||
        userTempData.instagramLink !== instagramLink ||
        isTierEdited.length
      ) {
        setCustomizeAuctionState(true);
      }
    }
  }, [
    userTempData,
    domainAndBranding,
    accountName,
    accountPage,
    accountImage,
    about,
    twitterLink,
    instagramLink,
    rewardTiersAuction,
  ]);

  useEffect(() => {
    setUserTempData({
      accountName,
      accountPage,
      accountImage,
      about,
      twitterLink,
      instagramLink,
    });
  }, []);

  const handleSaveClose = () => {
    setEditButtonClick(true);
    setEditProfileButtonClick(true);
    if (
      domainAndBranding.headline &&
      domainAndBranding.link &&
      domainAndBranding.status === 'filled' &&
      accountImage &&
      accountName &&
      (accountPage !== 'universe.xyz/' || accountPage === 'universe.xyz/your-address') &&
      about
    ) {
      const newAuction = { ...auction };
      newAuction.headline = domainAndBranding.headline;
      newAuction.link = domainAndBranding.link.replaceAll(' ', '-').toLowerCase();
      newAuction.copied = false;
      newAuction.promoImage = domainAndBranding.promoImage;
      newAuction.backgroundImage = domainAndBranding.backgroundImage;
      newAuction.hasBlur = domainAndBranding.hasBlur;
      newAuction.rewardTiers = auction.rewardTiers.map((tier) => {
        const rewardTier = rewardTiersAuction.find((rewTier) => rewTier.id === tier.id);
        return { ...tier, ...rewardTier };
      });
      let page = accountPage.substring(13);
      if (page === 'your-address') {
        page = '';
      }
      setAccountPage(page);
      setLoggedInArtist({
        ...loggedInArtist,
        name: accountName,
        universePageAddress: page,
        avatar: accountImage,
        about,
        instagramLink,
        twitterLink,
      });
      if (loggedInArtist.name && loggedInArtist.avatar) {
        newAuction.artist = loggedInArtist;
        // history.push('/my-auctions');
        setTimeout(() => {
          if (
            new Date() < new Date(newAuction.endDate) &&
            new Date() >= new Date(newAuction.startDate)
          ) {
            setActiveAuctions([...activeAuctions, newAuction]);
          } else if (new Date() < new Date(newAuction.startDate)) {
            setFutureAuctions([...futureAuctions, newAuction]);
          }
          setMyAuctions(myAuctions.map((item) => (item.id === newAuction.id ? newAuction : item)));
          setAuction({ tiers: [] });
          setCustomizeAuctionState(false);
          document.getElementById('popup-root')?.remove();
          document.getElementById('congrats-hidden-btn').click();
        }, 1000);
        setTimeout(() => {
          history.push('/my-auctions');
        }, 6000);
      }
    }
  };

  const handleSavePreview = () => {
    setEditButtonClick(true);
    let descriptionCount = 0;
    let desc = false;
    if (
      domainAndBranding.headline &&
      domainAndBranding.link &&
      domainAndBranding.status === 'filled'
    ) {
      if (rewardTiersAuction) {
        for (let i = 0; i < rewardTiersAuction.length; i += 1) {
          if (rewardTiersAuction[i].description !== '') {
            descriptionCount += 1;
          }
        }
        if (descriptionCount === rewardTiersAuction.length) desc = true;
      }
      if (desc) {
        const newAuction = { ...auction };
        newAuction.headline = domainAndBranding.headline;
        newAuction.link = domainAndBranding.link.replaceAll(' ', '-').toLowerCase();
        newAuction.copied = false;
        newAuction.promoImage = domainAndBranding.promoImage;
        newAuction.backgroundImage = domainAndBranding.backgroundImage;
        newAuction.hasBlur = domainAndBranding.hasBlur;
        newAuction.rewardTiers = auction.rewardTiers.map((tier) => {
          const rewardTier = rewardTiersAuction.find((rewTier) => rewTier.id === tier.id);
          return { ...tier, ...rewardTier };
        });
        if (loggedInArtist.name && loggedInArtist.avatar) {
          newAuction.artist = loggedInArtist;
          setSaveAndPreview(true);
          setMyAuctions(myAuctions.map((item) => (item.id === newAuction.id ? newAuction : item)));
          setTimeout(() => {
            if (
              new Date() < new Date(newAuction.endDate) &&
              new Date() >= new Date(newAuction.startDate)
            ) {
              setActiveAuctions([...activeAuctions, newAuction]);
            } else if (new Date() < new Date(newAuction.startDate)) {
              setFutureAuctions([...futureAuctions, newAuction]);
            }
            setAuction({ tiers: [] });
            setCustomizeAuctionState(false);
            history.push(newAuction.link.replace('universe.xyz', ''), {
              auction: newAuction,
            });
          }, 500);
        }
      }
    }
  };

  const handlePreview = () => {
    if (domainAndBranding.headline && domainAndBranding.link) {
      let descriptionCount = 0;
      let desc = false;
      if (rewardTiersAuction) {
        for (let i = 0; i < rewardTiersAuction.length; i += 1) {
          if (rewardTiersAuction[i].description !== '') {
            descriptionCount += 1;
          }
        }
        if (descriptionCount === rewardTiersAuction.length) desc = true;
      }
      if (desc) {
        const newAuction = { ...auction };
        newAuction.headline = domainAndBranding.headline;
        newAuction.link = domainAndBranding.link.replaceAll(' ', '-').toLowerCase();
        newAuction.copied = false;
        newAuction.promoImage = domainAndBranding.promoImage;
        newAuction.backgroundImage = domainAndBranding.backgroundImage;
        newAuction.hasBlur = domainAndBranding.hasBlur;
        newAuction.rewardTiers = auction.rewardTiers.map((tier) => {
          const rewardTier = rewardTiersAuction.find((rewTier) => rewTier.id === tier.id);
          return { ...tier, ...rewardTier };
        });
        if (loggedInArtist.name && loggedInArtist.avatar) {
          newAuction.artist = loggedInArtist;
          setMyAuctions(myAuctions.map((item) => (item.id === newAuction.id ? newAuction : item)));
          setTimeout(() => {
            if (
              new Date() < new Date(newAuction.endDate) &&
              new Date() >= new Date(newAuction.startDate)
            ) {
              setActiveAuctions([...activeAuctions, newAuction]);
            } else if (new Date() < new Date(newAuction.startDate)) {
              setFutureAuctions([...futureAuctions, newAuction]);
            }
            setAuction({ tiers: [] });
            setCustomizeAuctionState(false);
            history.push(newAuction.link.replace('universe.xyz', ''), {
              auction: newAuction,
            });
          }, 500);
        }
      }
    }
  };

  useEffect(() => {
    setShowPrompt(true);
  }, [location.pathname]);

  return (
    <div className="customize__auction">
      <RouterPrompt when={showPrompt} onOK={() => true} editing={customizeAuctionState} />
      <Popup
        trigger={
          <button
            type="button"
            id="congrats-hidden-btn"
            aria-label="hidden"
            style={{ display: 'none' }}
          />
        }
      >
        {(close) => <CongratsLandingPagePopup onClose={close} />}
      </Popup>

      <div className="container">
        <div
          className="back-rew"
          onClick={() => {
            history.push('/my-auctions');
          }}
          aria-hidden="true"
        >
          <img src={arrow} alt="back" />
          <span>My auctions</span>
        </div>
        <div className="customize__auction_title">
          <h2>Customize auction landing page</h2>
          <Button className="light-button" onClick={handlePreview}>
            Preview
          </Button>
        </div>
        <DomainAndBranding
          values={domainAndBranding}
          onChange={setDomainAndBranding}
          editButtonClick={editButtonClick}
          setEditButtonClick={setEditButtonClick}
        />
        <RewardTiersAuction
          values={rewardTiersAuction}
          onChange={setRewardTiersAuction}
          editButtonClick={editButtonClick}
          setEditButtonClick={setEditButtonClick}
        />
        <AboutArtistAuction
          accountName={accountName}
          setAccountName={setAccountName}
          accountPage={accountPage}
          setAccountPage={setAccountPage}
          accountImage={accountImage}
          setAccountImage={setAccountImage}
          about={about}
          setAbout={setAbout}
          twitterLink={twitterLink}
          setTwitterLink={setTwitterLink}
          instagramLink={instagramLink}
          setInstagramLink={setInstagramLink}
        />
        <div className="customize__auction__warning">
          <img src={warningIcon} alt="Warning" />
          <p>
            Your landing page will be automatically published after you successfully complete all
            transactions on the Finalize auction step.
          </p>
        </div>
        {editButtonClick &&
          (!domainAndBranding.headline ||
            !domainAndBranding.link ||
            domainAndBranding.status === 'empty' ||
            !accountImage ||
            !accountName ||
            accountPage === 'universe.xyz/' ||
            accountPage === 'universe.xyz/your-address' ||
            !about) && (
            <div className="customize__auction__error">
              <img alt="Error" src={errorIcon} />
              <p>
                Something went wrong. Please fix the errors in the field above and try again. The
                buttons will be enabled after information has been entered into the fields.
              </p>
            </div>
          )}
        {editButtonClick &&
        (!domainAndBranding.headline ||
          !domainAndBranding.link ||
          domainAndBranding.status === 'empty' ||
          !accountImage ||
          !accountName ||
          accountPage === 'universe.xyz/' ||
          accountPage === 'universe.xyz/your-address' ||
          !about) ? (
          <div className="customize-buttons">
            <Button
              className="light-border-button"
              onClick={handleSavePreview}
              disabled={saveAndPreview}
            >
              Save and preview
            </Button>
            <Button className="light-button" disabled onClick={handleSaveClose}>
              Save and close
            </Button>
          </div>
        ) : (
          <div className="customize-buttons">
            <Button
              className="light-border-button"
              onClick={handleSavePreview}
              disabled={saveAndPreview}
            >
              Save and preview
            </Button>
            <Button className="light-button" onClick={handleSaveClose}>
              Save and close
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomizeAuction;
