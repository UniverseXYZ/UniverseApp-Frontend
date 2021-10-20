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
    setEditProfileButtonClick,
  } = useAuctionContext();
  const { loggedInArtist, setLoggedInArtist } = useAuthContext();
  const { showError, setShowError, errorTitle, setErrorTitle } = useErrorContext();
  const [customizeAuctionState, setCustomizeAuctionState] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [domainAndBranding, setDomainAndBranding] = useState({
    headline: auction.headline || '',
    link:
      auction.link ||
      `universe.xyz/${loggedInArtist.universePageAddress.split(' ')[0].toLowerCase()}/`,
    promoImage: auction.promoImageUrl || null,
    backgroundImage: auction.backgroundImageUrl || null,
    hasBlur: auction.backgroundImageBlur || '',
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

  useEffect(() => {
    if (loggedInArtist) {
      setAccountName(loggedInArtist.name);
      setAbout(loggedInArtist.about);
      setAccountImage(loggedInArtist.avatar);
      setAccountPage(`universe.xyz/${loggedInArtist.universePageAddress || placeholderText}`);
      setTwitterLink(loggedInArtist.twitterLink);
      setInstagramLink(loggedInArtist.instagramLink);
    }
  }, [loggedInArtist]);

  const saveUserData = async (_loggedInArtist) => {
    try {
      // TODO: redundant data is being sent
      const result = await saveProfileInfo(_loggedInArtist);
      return result;
    } catch (error) {
      return error;
    }
  };

  const saveUserAvatar = async () => {
    try {
      const result = await saveUserImage(false);
      return result;
    } catch (error) {
      return error;
    }
  };

  const saveTierData = async (editedRewardTier) => {
    editedRewardTier.map(async (tier) => {
      try {
        const result = await editRewardTier(tier, tier.id);
        return result;
      } catch (error) {
        console.log(error);
        return error;
      }
    });
  };

  const saveTierImage = async (editedRewardTier) => {
    editedRewardTier.map(async (tier) => {
      try {
        await editRewardTierImage(tier.imageUrl, tier.id);
      } catch (error) {
        console.timeLog(error);
      }
    });
  };

  const saveAuctionData = async (editedAuction) => {
    try {
      const result = await editAuction(editedAuction);
      return result;
    } catch (error) {
      return error;
    }
  };

  const saveAuctionImages = async (promoImage, backgroundImage, id) => {
    try {
      const result = await uploadImagesForTheLandingPage(promoImage, backgroundImage, id);
      return result;
    } catch (error) {
      return error;
    }
  };

  const handleSave = async (event) => {
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

      const canEditUserInfo =
        loggedInArtist.name !== accountName ||
        loggedInArtist.about !== about ||
        loggedInArtist.instagramLink !== instagramLink ||
        loggedInArtist.twitterLink !== twitterLink;

      const canEditUserAvatar = typeof accountImage === 'object';

      const canEditAuction =
        auction.headline !== domainAndBranding.headline || auction.link !== domainAndBranding.link;
      const canEditAuctionImages =
        typeof editedAuction.promoImage === 'object' ||
        typeof editedAuction.backgroundImage === 'object';

      const apiCalls = [];
      if (canEditUserInfo) {
        apiCalls.push(saveUserData(loggedInArtistClone));
      }
      if (canEditUserAvatar) {
        apiCalls.push(saveUserAvatar());
      }
      if (canEditAuction) {
        apiCalls.push(saveAuctionData(editedAuction));
      }
      if (canEditAuctionImages) {
        apiCalls.push(
          saveAuctionImages(
            editedAuction.promoImage,
            editedAuction.backgroundImage,
            editedAuction.id
          )
        );
      }
      const rewardTiersAuctionClone = [...rewardTiersAuction];
      rewardTiersAuctionClone.forEach((tier, index) => {
        tier.nftIds = tier.nfts.map((nft) => nft.id);
        tier.minimumBid = parseFloat(tier.minimumBid, 10);

        const canEditRewardTier =
          auction.rewardTiers[index].description !== tier.description ||
          auction.rewardTiers[index].color !== tier.color;

        if (canEditRewardTier) {
          apiCalls.push(saveTierData(rewardTiersAuctionClone));
        }
      });

      // TODO: push only if rewardTier image is edited by the user
      apiCalls.push(saveTierImage(rewardTiersAuctionClone));

      const save = async () => {
        const result = await Promise.all(apiCalls);
        return result;
      };
      const responses = await save();
      responses.forEach((res) => {
        if (res?.status && res.status >= 200 && res.status <= 299) {
          // console.info(res);
          // setLoggedInArtist(loggedInArtistClone);
        } else {
          // console.info(res);
          // setErrorTitle('custom error message');
          // setShowError(true);
        }
      });
      setLoggedInArtist(loggedInArtistClone);

      if (loggedInArtist.name && loggedInArtist.avatar) {
        setTimeout(() => {
          setFutureAuctions([...futureAuctions, editedAuction]);
          setMyAuctions(
            myAuctions.map((item) => (item.id === editedAuction.id ? editedAuction : item))
          );
          document.getElementById('popup-root')?.remove();
          document.getElementById('congrats-hidden-btn').click();
        }, 1000);
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
            setAuction({ rewardTiers: [] });
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
