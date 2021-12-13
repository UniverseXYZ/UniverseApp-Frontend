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
import LoadingPopup from '../../components/popups/LoadingPopup';
import { validateAuctionData, validateAuctionImages } from './validateData';
import useProfileForm from '../myAccount/useProfileForm';
import defaultImage from '../../assets/images/default-img.svg';
import '../../components/myAccount/profileForm.scss';
import { validateData } from '../myAccount/validate';
import { saveProfileInfo } from '../../utils/api/profile';

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

  const [accountImage, setAccountImage] = useState(loggedInArtist.avatar);
  const [successPopup, setSuccessPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invalidPromoImage, setInvalidPromoImage] = useState(null);
  const [invalidBackgroundImage, setInvalidBackgroundImage] = useState(null);
  const [invalidTierImageIds, setInvalidTierImageIds] = useState([]);

  const { showError, setShowError, setErrorTitle, setErrorBody } = useErrorContext();
  const { values, handleChange, handleSubmit, setValues } = useProfileForm(validateData);
  const { accountName, accountPage, about, twitterLink, instagramLink } = values;

  useEffect(() => {
    if (!auction.id) {
      history.push('/');
    }
    setValues({
      avatar: loggedInArtist.avatar,
      accountName: loggedInArtist.name,
      accountPage: loggedInArtist.universePageAddress,
      about: loggedInArtist.about,
      instagramLink: loggedInArtist.instagramLink,
      twitterLink: loggedInArtist.twitterLink,
    });
  }, []);

  useEffect(() => {
    setShowPrompt(true);
  }, [location.pathname]);

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

  const setContext = (_editedAuction, loggedInArtistClone, action) => {
    setFutureAuctions([...futureAuctions, _editedAuction]);
    setMyAuctions(
      myAuctions.map((item) => (item.id === _editedAuction.id ? _editedAuction : item))
    );
    setLoggedInArtist(loggedInArtistClone);
    if (action === SAVE_PREVIEW_ACTION) {
      history.push(`${loggedInArtist.universePageAddress}/${domainAndBranding.link}`);
    } else {
      setSuccessPopup(true);
    }
  };

  const handleStatus = (errors, editedAuction, loggedInArtistClone, action) => {
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
      setValues({
        avatar: loggedInArtist.avatar,
        accountName: loggedInArtist.name,
        accountPage: loggedInArtist.universePageAddress,
        about: loggedInArtist.about,
        instagramLink: loggedInArtist.instagramLink,
        twitterLink: loggedInArtist.twitterLink,
      });
    } else {
      setContext(editedAuction, loggedInArtistClone, action);
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

  const saveOnServer = async (editedAuction, loggedInArtistClone, action) => {
    setLoading(true);

    const errors = [];

    const profileResponse = await saveProfileInfo(loggedInArtistClone);
    const newAuctionData = await saveAuction(editedAuction);
    const rewardTierResponses = await saveRewardTiers();

    if (rewardTierResponses.length) {
      rewardTierResponses.forEach((res) => res.error && errors.push(res));
      if (!errors.length) {
        newAuctionData.rewardTiers = rewardTierResponses;
      }
    }

    if (newAuctionData.error) {
      errors.push(newAuctionData);
    }

    if (profileResponse.error) {
      errors.push(profileResponse);
    }

    handleStatus(errors, newAuctionData, loggedInArtistClone, action);
  };

  const handleSave = async (action) => {
    const editedAuction = {
      ...auction,
      ...domainAndBranding,
    };

    const loggedInArtistClone = {
      ...loggedInArtist,
      name: accountName,
      universePageAddress: accountPage,
      avatar: accountImage,
      about,
      instagramLink,
      twitterLink,
    };

    if (action === SAVE_PREVIEW_ACTION) {
      saveOnServer(editedAuction, loggedInArtistClone, action);
    } else if (action === PREVIEW_ACTION) {
      console.log('decide what to do here');
      // setContext(loggedInArtistClone, editedAuction, action);
    } else {
      saveOnServer(editedAuction, loggedInArtistClone, action);
    }
  };

  const handleSavePreview = () => handleSave(SAVE_PREVIEW_ACTION);

  const handlePreview = () => handleSave(PREVIEW_ACTION);

  const invalidAccountImage =
    (typeof accountImage === 'object' &&
      accountImage?.type !== 'image/webp' &&
      accountImage?.type !== 'image/jpeg' &&
      accountImage?.type !== 'image/png') ||
    accountImage?.size / 1048576 > 30;
  const invalidTierDescription =
    rewardTiersAuction?.length && rewardTiersAuction.find((tier) => !tier.description);

  const disableSave =
    !domainAndBranding.headline ||
    !domainAndBranding.link ||
    invalidAccountImage ||
    invalidTierDescription ||
    !accountName ||
    !accountPage ||
    !about;

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
        />
        <RewardTiersAuction
          invalidImageIds={invalidTierImageIds}
          setInvalidImageIds={setInvalidTierImageIds}
          values={rewardTiersAuction}
          onChange={setRewardTiersAuction}
        />
        <ProfileForm
          setShowCongrats={setSuccessPopup}
          setShowLoading={setLoading}
          accountImage={accountImage}
          setAccountImage={setAccountImage}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editProfileButtonClick={editProfileButtonClick}
          loggedInArtist={loggedInArtist}
          showError={showError}
          setShowError={setShowError}
          setErrorTitle={setErrorTitle}
          setErrorBody={setErrorBody}
          getProfileImage={getProfileImage}
          setLoggedInArtist={setLoggedInArtist}
          accountName={accountName}
          accountPage={accountPage}
          about={about}
          twitterLink={twitterLink}
          instagramLink={instagramLink}
          customizeAuction
          invalidAccountImage={invalidAccountImage}
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
