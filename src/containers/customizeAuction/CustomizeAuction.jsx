import React, { useState, useEffect } from 'react';
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
import CongratsLandingPagePopup from '../../components/popups/CongratsLandingPagePopup';
import { RouterPrompt } from '../../utils/routerPrompt';
import { useAuctionContext } from '../../contexts/AuctionContext';
import { useAuthContext } from '../../contexts/AuthContext';
import { useErrorContext } from '../../contexts/ErrorContext.jsx';
import {
  uploadImagesForTheLandingPage,
  editRewardTier,
  editAuction,
  editRewardTierImage,
} from '../../utils/api/auctions';
import { saveProfileInfo, saveUserImage } from '../../utils/api/profile';
import ErrorPopup from '../../components/popups/ErrorPopup';

const SAVE_PREVIEW_ACTION = 'save-preview';
const PREVIEW_ACTION = 'preview';

const CustomizeAuction = () => {
  const history = useHistory();
  const location = useLocation();
  const {
    auction,
    myAuctions,
    setMyAuctions,
    futureAuctions,
    setFutureAuctions,
    setEditProfileButtonClick,
  } = useAuctionContext();
  const { loggedInArtist, setLoggedInArtist } = useAuthContext();
  const { showError, setShowError, errorTitle, setErrorTitle, setErrorBody } = useErrorContext();
  const [customizeAuctionState, setCustomizeAuctionState] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [domainAndBranding, setDomainAndBranding] = useState({
    headline: auction.headline || '',
    link:
      auction.link ||
      `universe.xyz/${loggedInArtist.universePageAddress.split(' ')[0].toLowerCase()}/`,
    promoImage: auction.promoImageUrl || null,
    backgroundImage: auction.backgroundImageUrl || null,
    backgroundImageBlur: auction.backgroundImageBlur || false,
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

  const setContext = (_loggedInArtistClone, _futureAuctions, _editedAuction, action) => {
    setLoggedInArtist(_loggedInArtistClone);
    setFutureAuctions([..._futureAuctions, _editedAuction]);
    setMyAuctions(
      myAuctions.map((item) => (item.id === _editedAuction.id ? _editedAuction : item))
    );
    if (action === PREVIEW_ACTION || action === SAVE_PREVIEW_ACTION) {
      history.push(_editedAuction.link.replace('universe.xyz', ''), {
        auction: _editedAuction,
      });
    } else {
      document.getElementById('popup-root')?.remove();
      document.getElementById('congrats-hidden-btn').click();
    }
  };

  const saveOnServer = async (editedAuction, loggedInArtistClone, action) => {
    // Check if data is edited
    const canEditUserInfo =
      loggedInArtist.name !== accountName ||
      loggedInArtist.about !== about ||
      loggedInArtist.instagramLink !== instagramLink ||
      loggedInArtist.twitterLink !== twitterLink ||
      loggedInArtist.universePageAddress !== accountPage.split('universe.xyz/').pop();

    const canEditUserAvatar = typeof accountImage === 'object';

    const canEditAuction =
      auction.headline !== domainAndBranding.headline ||
      auction.link !== domainAndBranding.link ||
      auction.backgroundImageBlur !== domainAndBranding.backgroundImageBlur;

    const canEditAuctionImages =
      typeof editedAuction.promoImage === 'object' ||
      typeof editedAuction.backgroundImage === 'object';

    const rewardTiersAuctionClone = [...rewardTiersAuction];
    // reward tiers API calls
    const saveRewardTiers = () => {
      try {
        const tiers = rewardTiersAuctionClone.map(async (tier, index) => {
          const tierResponses = [];
          tier.nftIds = tier.nfts.map((nft) => nft.id);
          tier.minimumBid = parseFloat(tier.minimumBid, 10);
          // Check if data is edited
          const canEditRewardTier =
            auction.rewardTiers[index].description !== tier.description ||
            auction.rewardTiers[index].color !== tier.color;

          const canEditRewardTierImage = auction.rewardTiers[index].imageUrl !== tier.imageUrl;

          if (canEditRewardTier) {
            try {
              const response = await editRewardTier(tier, tier.id);
              tierResponses.push(response);
            } catch (error) {
              return error;
            }
          }

          if (canEditRewardTierImage) {
            try {
              const response = await editRewardTierImage(tier.imageUrl, tier.id);
              tierResponses.push(response);
            } catch (error) {
              return error;
            }
          }
          return tierResponses;
        });
        return Promise.all(tiers);
      } catch (error) {
        console.error(error);
        return error;
      }
    };
    // auction and profile API calls
    const saveAuctionAndProfile = async () => {
      const apiCalls = [];
      if (canEditUserInfo) apiCalls.push(saveProfileInfo(loggedInArtistClone));
      if (canEditUserAvatar) apiCalls.push(saveUserImage(accountImage));
      if (canEditAuction) apiCalls.push(editAuction(editedAuction));
      if (canEditAuctionImages) {
        apiCalls.push(
          uploadImagesForTheLandingPage(
            editedAuction.promoImage,
            editedAuction.backgroundImage,
            editedAuction.id
          )
        );
      }

      try {
        const result = await Promise.all(apiCalls);
        return result;
      } catch (error) {
        return error;
      }
    };

    const auctionAndProfileResponses = await saveAuctionAndProfile();
    const rewardTierResponses = await saveRewardTiers();

    const errorMessages = [];

    if (rewardTierResponses.length) {
      rewardTierResponses[0].forEach((res) => res.error && errorMessages.push(res.message));
    }

    auctionAndProfileResponses.forEach((res) => res.error && errorMessages.push(res.message));

    if (errorMessages.length) {
      setErrorTitle('Unexpected error');
      setErrorBody(errorMessages.join(', '));
      setShowError(true);
    } else {
      setContext(loggedInArtistClone, futureAuctions, editedAuction, action);
    }
  };

  const handleSave = async (action) => {
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
      const editedAuction = {
        ...auction,
        ...domainAndBranding,
      };

      let page = accountPage.substring(13);
      if (page === 'your-address') {
        page = '';
      }
      setAccountPage(page);
      const loggedInArtistClone = {
        ...loggedInArtist,
        name: accountName,
        universePageAddress: page,
        avatar: accountImage,
        about,
        instagramLink,
        twitterLink,
      };
      if (action === SAVE_PREVIEW_ACTION) {
        saveOnServer(editedAuction, loggedInArtist, action);
      } else if (action === PREVIEW_ACTION) {
        // TODO:
        // setContext(loggedInArtistClone, futureAuctions, editedAuction, action);
      } else {
        saveOnServer(editedAuction, loggedInArtistClone, action);
      }
    }
  };

  const handleSavePreview = () => handleSave(SAVE_PREVIEW_ACTION);

  const handlePreview = () => handleSave(PREVIEW_ACTION);

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
            <Button className="light-button" disabled onClick={handleSave}>
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
            <Button className="light-button" onClick={handleSave}>
              Save and close
            </Button>
          </div>
        )}
      </div>
      {showError && <ErrorPopup />}
    </div>
  );
};

export default CustomizeAuction;
