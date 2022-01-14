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
  removeImage,
} from '../../utils/api/auctions';
import { saveProfileInfo, saveUserImage } from '../../utils/api/profile';
import ErrorPopup from '../../components/popups/ErrorPopup';
import LoadingPopup from '../../components/popups/LoadingPopup';
import {
  validateUserProfile,
  validateUserAvatar,
  validateAuctionData,
  validateAuctionImages,
} from './validateData';

const SAVE_PREVIEW_ACTION = 'save-preview';
const PREVIEW_ACTION = 'preview';

const CustomizeAuction = () => {
  const history = useHistory();
  const location = useLocation();
  const {
    auction,
    setAuction,
    myAuctions,
    setMyAuctions,
    futureAuctions,
    setFutureAuctions,
    setEditProfileButtonClick,
  } = useAuctionContext();
  const { loggedInArtist, setLoggedInArtist } = useAuthContext();
  const { showError, setShowError, setErrorTitle, setErrorBody } = useErrorContext();
  const [customizeAuctionState, setCustomizeAuctionState] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [domainAndBranding, setDomainAndBranding] = useState({
    headline: auction.headline || '',
    link: auction.link,
    promoImageFile:
      auction.promoImage && typeof auction.promoImage !== 'string' ? auction.promoImage : null,
    backgroundImageFile:
      auction.backgroundImage && typeof auction.backgroundImage !== 'string'
        ? auction.backgroundImage
        : null,
    promoImage: auction.promoImageUrl
      ? auction.promoImageUrl
      : auction.promoImage && typeof auction.promoImage !== 'string'
      ? URL.createObjectURL(auction.promoImage)
      : auction.promoImage,
    backgroundImage: auction.backgroundImageUrl
      ? auction.backgroundImageUrl
      : auction.backgroundImage && typeof auction.backgroundImage !== 'string'
      ? URL.createObjectURL(auction.backgroundImage)
      : auction.backgroundImage,
    backgroundImageBlur: auction.backgroundImageBlur || false,
    status:
      auction.link &&
      auction.link.toLowerCase() !==
        `universe.xyz/${loggedInArtist.name.split(' ')[0].toLowerCase()}/`
        ? 'filled'
        : 'empty',
  });
  const [rewardTiersAuction, setRewardTiersAuction] = useState(auction.rewardTiers);
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
  const [successPopup, setSuccessPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invalidPromoImage, setInvalidPromoImage] = useState(null);
  const [invalidBackgroundImage, setInvalidBackgroundImage] = useState(null);
  const [invalidTierImageIds, setInvalidTierImageIds] = useState([]);
  const [auctionLinkError, setAuctionLinkError] = useState(false);

  const disableSaveChanges = () =>
    !domainAndBranding.headline ||
    !domainAndBranding.link ||
    domainAndBranding.status === 'empty' ||
    !accountImage ||
    !accountName ||
    accountPage === 'universe.xyz/' ||
    accountPage === 'universe.xyz/your-address' ||
    !accountPage ||
    auctionLinkError ||
    invalidBackgroundImage ||
    invalidPromoImage ||
    invalidTierImageIds.length ||
    rewardTiersAuction.find((tier) => !tier.description) ||
    !about;

  const setContext = (_loggedInArtistClone, _editedAuction, action) => {
    setLoggedInArtist(_loggedInArtistClone);
    setFutureAuctions([...futureAuctions, _editedAuction]);
    setMyAuctions(
      myAuctions.map((item) => (item.id === _editedAuction.id ? _editedAuction : item))
    );
    if (action === PREVIEW_ACTION || action === SAVE_PREVIEW_ACTION) {
      history.push(`${loggedInArtist.universePageAddress}/${domainAndBranding.link}`);
    } else {
      setSuccessPopup(true);
    }
  };

  const handleStatus = (errors, loggedInArtistClone, editedAuction, action) => {
    setLoading(false);
    if (errors.length) {
      setErrorTitle('Unexpected error');
      const erorrMessagesMarkup = errors.map((error) => {
        if (error) {
          return <p>{error.message}</p>;
        }
        return null;
      });
      setErrorBody(erorrMessagesMarkup);
      setShowError(true);
    } else {
      setContext(loggedInArtistClone, editedAuction, action);
    }
  };

  // reward tiers API calls
  const saveRewardTiers = (editedAuction) => {
    const rewardTiersAuctionClone = [...rewardTiersAuction];

    try {
      const tiers = rewardTiersAuctionClone.map(async (tier, index) => {
        let newTierData = null;
        const { state } = location;
        const tierResponses = [];
        tier.nftIds = tier.nfts.map((nft) => nft.id);
        tier.minimumBid = parseFloat(tier.minimumBid, 10);
        // Check if data is edited
        const canEditRewardTier =
          state && state === 'edit'
            ? auction.rewardTiers[index].description !== tier.description ||
              auction.rewardTiers[index].color !== tier.color
            : true;

        const canEditRewardTierImage =
          state && state === 'edit' ? auction.rewardTiers[index].imageUrl !== tier.imageUrl : true;

        if (canEditRewardTier) {
          try {
            newTierData = await editRewardTier(tier, tier.id);
            tierResponses.push(newTierData);
          } catch (error) {
            return error;
          }
        }
        const updatedTier = { ...tier, newTierData };
        if (canEditRewardTierImage) {
          try {
            newTierData = await editRewardTierImage(tier.imageUrl, tier.id);
            tierResponses.push(newTierData);
          } catch (error) {
            return error;
          }
        }
        return { ...updatedTier, ...newTierData };
      });
      return Promise.all(tiers);
    } catch (error) {
      return error;
    }
  };

  // auction API calls
  const saveAuction = async (editedAuction, state) => {
    let newAuctionData = null;

    const canEditAuction =
      state && state === 'edit' ? validateAuctionData(auction, domainAndBranding) : true;

    const canEditAuctionImages = validateAuctionImages(
      editedAuction,
      invalidPromoImage,
      invalidBackgroundImage
    );

    if (canEditAuction) {
      try {
        newAuctionData = await editAuction(editedAuction);
        if (newAuctionData.error) {
          return newAuctionData;
        }
      } catch (error) {
        console.error(error);
      }
    }

    let updatedAuction = { ...editedAuction, ...newAuctionData };

    if (canEditAuctionImages) {
      try {
        newAuctionData = await uploadImagesForTheLandingPage(
          editedAuction.promoImage,
          editedAuction.backgroundImage,
          editedAuction.id
        );
        if (newAuctionData.error) {
          return newAuctionData;
        }
      } catch (error) {
        console.info(error);
      }
    }

    updatedAuction = { ...updatedAuction, ...newAuctionData };

    return updatedAuction;
  };

  // profile API calls
  const saveProfile = async (loggedInArtistClone) => {
    // Check if data is edited
    const canEditUserInfo = validateUserProfile(
      loggedInArtist,
      accountName,
      about,
      instagramLink,
      twitterLink,
      accountPage
    );

    const canEditUserAvatar = validateUserAvatar(accountImage);

    try {
      return await Promise.all([
        canEditUserInfo && saveProfileInfo(loggedInArtistClone),
        canEditUserAvatar && saveUserImage(accountImage),
      ]);
    } catch (error) {
      return error;
    }
  };

  // delete image api calls
  const deleteImages = async (editedAuction) => {
    const { promoImage, backgroundImage } = domainAndBranding;
    const responses = [];

    if (!promoImage) {
      try {
        const response = await removeImage({ id: editedAuction.id, type: 'auctionPromo' });
        responses.push(response);
      } catch (error) {
        console.error(error);
      }
    }

    if (!backgroundImage) {
      try {
        const response = await removeImage({ id: editedAuction.id, type: 'auctionBackground' });
        responses.push(response);
      } catch (error) {
        console.error(error);
      }
    }
    const deleteTierImageReponses = await Promise.all(
      // eslint-disable-next-line consistent-return
      editedAuction.rewardTiers.map(async (tier, index) => {
        if (!tier.imageUrl && tier.imageUrl !== editedAuction.rewardTiers[index].imageUrl) {
          try {
            const response = await removeImage({ id: tier.id, type: 'tier' });
            return response;
          } catch (error) {
            console.error(error);
          }
        }
      })
    );
    responses.push(...deleteTierImageReponses);
    return Promise.all(responses);
  };

  const saveOnServer = async (editedAuction, loggedInArtistClone, action, state) => {
    setLoading(true);
    const newAuctionData = await saveAuction(editedAuction, state);
    const profileResponses = await saveProfile(loggedInArtistClone);
    const rewardTierResponses = await saveRewardTiers(editedAuction);
    const removeImagesResponses = await deleteImages(editedAuction);

    const errors = [];

    if (removeImagesResponses.length) {
      removeImagesResponses.forEach((res) => res?.error && errors.push(res));
    }
    if (rewardTierResponses.length) {
      rewardTierResponses.forEach((res) => res.error && errors.push(res));
      if (!errors.length) {
        newAuctionData.rewardTiers = rewardTierResponses;
      }
    }
    if (profileResponses?.length) {
      profileResponses.forEach((res) => {
        if (res) {
          if (res.error) {
            errors.push(res);
          }
        }
      });
    }
    if (newAuctionData.error) {
      errors.push(newAuctionData);
    }
    handleStatus(errors, loggedInArtistClone, newAuctionData, action);
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
        rewardTiers: rewardTiersAuction,
      };

      const page = accountPage.substring(13);
      // setAccountPage(page);
      const loggedInArtistClone = {
        ...loggedInArtist,
        name: accountName,
        universePageAddress: page,
        avatar: accountImage,
        about,
        instagramLink,
        twitterLink,
      };
      if (typeof editedAuction.promoImage === 'string') {
        editedAuction.promoImage = editedAuction.promoImageFile;
      }
      if (typeof editedAuction.backgroundImage === 'string') {
        editedAuction.backgroundImage = editedAuction.backgroundImageFile;
      }
      if (action === SAVE_PREVIEW_ACTION) {
        saveOnServer(editedAuction, loggedInArtistClone, action, location.state);
      } else if (action === PREVIEW_ACTION) {
        setContext(loggedInArtistClone, editedAuction, action);
        setAuction(editedAuction);
      } else {
        saveOnServer(editedAuction, loggedInArtistClone, action, location.state);
      }
    }
  };

  const handleSavePreview = () => handleSave(SAVE_PREVIEW_ACTION);

  const handlePreview = () => handleSave(PREVIEW_ACTION);

  useEffect(() => {
    setShowPrompt(true);
  }, [location.pathname]);

  const disableSave = disableSaveChanges();
  const blurToggleButtonDisabled = !domainAndBranding.backgroundImage;

  return (
    <div className="customize__auction">
      <RouterPrompt when={showPrompt} onOK={() => true} editing={customizeAuctionState} />
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
          <Button className="light-button" onClick={handlePreview} disabled={disableSave}>
            Preview
          </Button>
        </div>
        <DomainAndBranding
          auctionLinkError={auctionLinkError}
          setAuctionLinkError={setAuctionLinkError}
          blurToggleButtonDisabled={blurToggleButtonDisabled}
          invalidPromoImage={invalidPromoImage}
          setInvalidPromoImage={setInvalidPromoImage}
          invalidBackgroundImage={invalidBackgroundImage}
          setInvalidBackgroundImage={setInvalidBackgroundImage}
          values={domainAndBranding}
          onChange={setDomainAndBranding}
          editButtonClick={editButtonClick}
          setEditButtonClick={setEditButtonClick}
        />
        <RewardTiersAuction
          invalidImageIds={invalidTierImageIds}
          setInvalidImageIds={setInvalidTierImageIds}
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
        {disableSave ? (
          <div className="customize__auction__error">
            <img alt="Error" src={errorIcon} />
            <p>
              Something went wrong. Please fix the errors in the field above and try again. The
              buttons will be enabled after information has been entered into the fields.
            </p>
          </div>
        ) : null}
        <div className="customize-buttons">
          <Button
            className="light-border-button"
            onClick={handleSavePreview}
            disabled={disableSave}
          >
            Save and preview
          </Button>
          <Button className="light-button" disabled={disableSave} onClick={handleSave}>
            Save and close
          </Button>
        </div>
      </div>
      {showError && <ErrorPopup />}
      <Popup open={successPopup} closeOnDocumentClick={false}>
        <CongratsLandingPagePopup onClose={() => setSuccessPopup(false)} />
      </Popup>
      <Popup closeOnDocumentClick={false} open={loading}>
        <LoadingPopup text="Saving your changes" onClose={() => setLoading(false)} />
      </Popup>
    </div>
  );
};

export default CustomizeAuction;
