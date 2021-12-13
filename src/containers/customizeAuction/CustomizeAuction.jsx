import React, { useState, useEffect, useMemo } from 'react';
import './CustomizeAuction.scss';
import { useHistory, useLocation } from 'react-router-dom';
import Popup from 'reactjs-popup';
import arrow from '../../assets/images/arrow.svg';
import Button from '../../components/button/Button.jsx';
import DomainAndBranding from '../../components/customizeAuction/DomainAndBranding.jsx';
import RewardTiersAuction from '../../components/customizeAuction/RewardTiersAuction.jsx';
import warningIcon from '../../assets/images/Exclamation.svg';
import errorIcon from '../../assets/images/red-msg.svg';
import CongratsLandingPagePopup from '../../components/popups/CongratsLandingPagePopup';
import { RouterPrompt } from '../../utils/routerPrompt';
import { useAuctionContext } from '../../contexts/AuctionContext';
import { useAuthContext } from '../../contexts/AuthContext';
import { useErrorContext } from '../../contexts/ErrorContext.jsx';
import ProfileForm from '../../components/myAccount/ProfileForm.jsx';
import {
  uploadImagesForTheLandingPage,
  editRewardTier,
  editAuction,
  editRewardTierImage,
} from '../../utils/api/auctions';
import ErrorPopup from '../../components/popups/ErrorPopup';
import LoadingPopup from '../../components/popups/LoadingPopup';
import { validateAuctionData, validateAuctionImages } from './validateData';
import useProfileForm from '../myAccount/useProfileForm';
import defaultImage from '../../assets/images/default-img.svg';
import '../../components/myAccount/profileForm.scss';
import { validateData } from '../myAccount/validate';

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
    editProfileButtonClick,
    setEditProfileButtonClick,
  } = useAuctionContext();
  const { loggedInArtist, setLoggedInArtist } = useAuthContext();
  const [customizeAuctionState, setCustomizeAuctionState] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [domainAndBranding, setDomainAndBranding] = useState({
    headline: auction.headline || '',
    link: auction.link,
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
  const [editButtonClick, setEditButtonClick] = useState(false);

  const [accountImage, setAccountImage] = useState(loggedInArtist.avatar);
  const [successPopup, setSuccessPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invalidPromoImage, setInvalidPromoImage] = useState(null);
  const [invalidBackgroundImage, setInvalidBackgroundImage] = useState(null);
  const [invalidTierImageIds, setInvalidTierImageIds] = useState([]);

  const { showError, setShowError, setErrorTitle, setErrorBody } = useErrorContext();
  const { values, handleChange, handleSubmit, errors, setValues } = useProfileForm(validateData);
  const { accountName, accountPage, about, twitterLink, instagramLink } = values;
  console.log(values);

  useEffect(() => {
    setValues({
      avatar: loggedInArtist.avatar,
      accountName: loggedInArtist.name,
      accountPage: loggedInArtist.universePageAddress,
      about: loggedInArtist.about,
      instagramLink: loggedInArtist.instagramLink,
      twitterLink: loggedInArtist.twitterLink,
    });
  }, []);

  const getProfileImage = useMemo(() => {
    const userUploadImageURL =
      accountImage && typeof accountImage === 'object' && URL.createObjectURL(accountImage);
    const alreadyUploadedImageURL = loggedInArtist && loggedInArtist.avatar;

    let image;
    if (userUploadImageURL) {
      image = userUploadImageURL;
    } else if (alreadyUploadedImageURL) {
      image = alreadyUploadedImageURL;
    } else {
      image = defaultImage;
    }
    return image;
  }, [accountImage]);

  let genericErrorMessage = false;
  if (Object.keys(errors).length) {
    genericErrorMessage = true;
  }

  const buttonDisabled =
    loggedInArtist.name === accountName &&
    loggedInArtist.universePageAddress === accountPage &&
    loggedInArtist.about === about &&
    loggedInArtist.twitterLink === twitterLink &&
    loggedInArtist.instagramLink === instagramLink &&
    loggedInArtist.avatar === accountImage;

  const cancelChanges = () => history.goBack();

  const disableSaveChanges = () =>
    !domainAndBranding.headline ||
    !domainAndBranding.link ||
    domainAndBranding.status === 'empty' ||
    !accountImage ||
    !accountName ||
    accountPage === 'universe.xyz/' ||
    accountPage === 'universe.xyz/your-address' ||
    !accountPage ||
    !about;

  const setContext = (_editedAuction, action) => {
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

  const handleStatus = (_errors, editedAuction, action) => {
    setLoading(false);
    if (_errors.length) {
      setErrorTitle('Unexpected error');
      const erorrMessagesMarkup = _errors.map((error) => {
        if (error) {
          return <p>{error.message}</p>;
        }
        return null;
      });
      setErrorBody(erorrMessagesMarkup);
      setShowError(true);
    } else {
      setContext(editedAuction, action);
    }
  };

  // reward tiers API calls
  const saveRewardTiers = () => {
    const rewardTiersAuctionClone = [...rewardTiersAuction];

    try {
      const tiers = rewardTiersAuctionClone.map(async (tier, index) => {
        let newTierData = null;
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
  const saveAuction = async (editedAuction) => {
    let newAuctionData = null;

    const canEditAuction = validateAuctionData(auction, domainAndBranding);

    const canEditAuctionImages = validateAuctionImages(
      editedAuction,
      invalidPromoImage,
      invalidBackgroundImage
    );

    if (canEditAuction) {
      try {
        newAuctionData = await editAuction(editedAuction);
        if (newAuctionData.error) {
          console.log(error);
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

  const saveOnServer = async (editedAuction, action) => {
    setLoading(true);
    handleSubmit(
      setErrorTitle,
      setErrorBody,
      setShowError,
      loggedInArtist,
      setLoading,
      setSuccessPopup,
      setLoggedInArtist
    );
    console.log(errors);
    const newAuctionData = await saveAuction(editedAuction);
    const rewardTierResponses = await saveRewardTiers();

    // eslint-disable-next-line no-underscore-dangle
    const _errors = [];
    if (rewardTierResponses.length) {
      rewardTierResponses.forEach((res) => res.error && _errors.push(res));
      if (!_errors.length) {
        newAuctionData.rewardTiers = rewardTierResponses;
      }
    }

    if (newAuctionData.error) {
      _errors.push(newAuctionData);
    }
    handleStatus(_errors, newAuctionData, action);
  };

  const handleSave = async (action) => {
    const editedAuction = {
      ...auction,
      ...domainAndBranding,
    };

    if (action === SAVE_PREVIEW_ACTION) {
      // saveOnServer(editedAuction, loggedInArtistClone, action);
    } else if (action === PREVIEW_ACTION) {
      // setContext(loggedInArtistClone, editedAuction, action);
    } else {
      saveOnServer(editedAuction);
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
          <Button className="light-button" onClick={handlePreview}>
            Preview
          </Button>
        </div>
        <DomainAndBranding
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
        <ProfileForm
          setShowCongrats={setSuccessPopup}
          setShowLoading={setLoading}
          accountImage={accountImage}
          setAccountImage={setAccountImage}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          errors={errors}
          cancelChanges={cancelChanges}
          editProfileButtonClick={editProfileButtonClick}
          loggedInArtist={loggedInArtist}
          showError={showError}
          setShowError={setShowError}
          setErrorTitle={setErrorTitle}
          setErrorBody={setErrorBody}
          getProfileImage={getProfileImage}
          setLoggedInArtist={setLoggedInArtist}
          buttonDisabled={buttonDisabled}
          accountName={accountName}
          accountPage={accountPage}
          about={about}
          twitterLink={twitterLink}
          instagramLink={instagramLink}
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
              Something went wrong. Please fix the _errors in the field above and try again. The
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
      {/* {showError && <ErrorPopup />} */}
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
