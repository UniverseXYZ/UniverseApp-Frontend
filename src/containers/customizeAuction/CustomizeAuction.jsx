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
import {
  uploadImagesForTheLandingPage,
  editRewardTier,
  editAuction,
  editRewardTierImage,
} from '../../utils/api/auctions';
import { saveProfileInfo, saveUserImage } from '../../utils/api/profile';

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
  const [customizeAuctionState, setCustomizeAuctionState] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [domainAndBranding, setDomainAndBranding] = useState({
    headline: auction.headline || '',
    link:
      auction.link ||
      `universe.xyz/${loggedInArtist.universePageAddress.split(' ')[0].toLowerCase()}/`,
    promoImage: auction.promoImage || null,
    backgroundImage: auction.backgroundImage || null,
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

  // Prepopulate profile data (use data from context instead of setting local state?)
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
    if (
      loggedInArtist.name !== accountName ||
      loggedInArtist.about !== about ||
      loggedInArtist.instagramLink !== instagramLink ||
      loggedInArtist.twitterLink !== twitterLink
    ) {
      try {
        // TODO: redundant data is being sent
        await saveProfileInfo(_loggedInArtist);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      // TODO: make this call only if the user changed his/her avatar
      await saveUserImage(accountImage);
    } catch (error) {
      console.log(error);
    }
  };

  const saveTierData = async (editedRewardTier) => {
    console.info(editedRewardTier);
    try {
      // await editRewardTier(editedRewardTier, editedRewardTier.id);
    } catch (error) {
      console.log(error);
    }
    try {
      console.info(rewardTiersAuction);
      await editRewardTierImage(rewardTiersAuction[0].imageUrl, rewardTiersAuction[0].id);
    } catch (error) {
      console.timeLog(error);
    }
  };

  const saveAuctionData = async (editedAuction) => {
    if (
      auction.headline !== domainAndBranding.headline ||
      auction.link !== domainAndBranding.link
    ) {
      try {
        await editAuction(editedAuction);
      } catch (error) {
        console.log(error);
      }
    }
    // TODO: make this call only if the user changed his/her auction images
    const { id, promoImage, backgroundImage } = editedAuction;
    try {
      await uploadImagesForTheLandingPage(promoImage, backgroundImage, id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveClose = async () => {
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
      const rewardTiersAuctionClone = {
        // TODO: hardcoded as the first element for now
        ...rewardTiersAuction[0],
      };

      rewardTiersAuctionClone.color = rewardTiersAuctionClone.color?.hex;
      rewardTiersAuctionClone.nftIds = rewardTiersAuctionClone.nfts.map((nft) => nft.id.toString());
      if (
        // eslint-disable-next-line no-restricted-globals
        !isNaN(rewardTiersAuctionClone.minimumBid) &&
        rewardTiersAuctionClone.minimumBid.toString().indexOf('.') !== -1
      ) {
        rewardTiersAuctionClone.minimumBid = parseFloat(rewardTiersAuctionClone.minimumBid, 10);
      } else {
        rewardTiersAuctionClone.minimumBid = parseInt(rewardTiersAuctionClone.minimumBid, 10);
      }

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

      setLoggedInArtist(loggedInArtistClone);
      saveUserData(loggedInArtistClone);
      saveAuctionData(editedAuction);
      // saveTierData(rewardTiersAuctionClone);

      if (loggedInArtist.name && loggedInArtist.avatar) {
        // newAuction.artist = loggedInArtist;
        // history.push('/my-auctions');
        // TODO:: consider removing this logic
        setTimeout(() => {
          if (
            new Date() < new Date(editedAuction.endDate) &&
            new Date() >= new Date(editedAuction.startDate)
          ) {
            setActiveAuctions([...activeAuctions, editedAuction]);
          } else if (new Date() < new Date(editedAuction.startDate)) {
            setFutureAuctions([...futureAuctions, editedAuction]);
          }
          setMyAuctions(
            myAuctions.map((item) => (item.id === editedAuction.id ? editedAuction : item))
          );
          setAuction({ rewardTiers: [] });
          document.getElementById('popup-root')?.remove();
          document.getElementById('congrats-hidden-btn').click();
        }, 1000);
        setTimeout(() => {
          // setAuction({ tiers: [] });
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
            // setAuction({ tiers: [] });
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
        {/* <RewardTiersAuction
          values={rewardTiersAuction}
          onChange={setRewardTiersAuction}
          editButtonClick={editButtonClick}
          setEditButtonClick={setEditButtonClick}
        /> */}
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
