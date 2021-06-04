import React, { useState, useContext, useEffect } from 'react';
import './CustomizeAuction.scss';
import { useHistory } from 'react-router-dom';
import uuid from 'react-uuid';
import arrow from '../../assets/images/arrow.svg';
import Button from '../../components/button/Button.jsx';
import DomainAndBranding from '../../components/customizeAuction/DomainAndBranding.jsx';
import RewardTiersAuction from '../../components/customizeAuction/RewardTiersAuction.jsx';
import AboutArtistAuction from '../../components/customizeAuction/AboutArtistAuction.jsx';
import AppContext from '../../ContextAPI';

const CustomizeAuction = () => {
  const history = useHistory();
  const {
    auction,
    setAuction,
    loggedInArtist,
    myAuctions,
    setMyAuctions,
    activeAuctions,
    setActiveAuctions,
    futureAuctions,
    setFutureAuctions,
  } = useContext(AppContext);
  const [domainAndBranding, setDomainAndBranding] = useState({
    headline: '',
    link: '',
    promoImage: null,
    backgroundImage: null,
    hasBlur: '',
  });
  const [rewardTiersAuction, setRewardTiersAuction] = useState(
    auction.tiers.map((tier) => ({ id: tier.id }))
  );

  const handleSaveClose = () => {
    if (domainAndBranding.headline && domainAndBranding.link) {
      const newAuction = { ...auction };
      newAuction.id = uuid();
      newAuction.headline = domainAndBranding.headline;
      newAuction.link = domainAndBranding.link.replace(/\s+/g, '-').toLowerCase();
      newAuction.copied = false;
      newAuction.promoImage = domainAndBranding.promoImage;
      newAuction.backgroundImage = domainAndBranding.backgroundImage;
      newAuction.hasBlur = domainAndBranding.hasBlur;
      newAuction.tiers = auction.tiers.map((tier) => {
        const rewardTier = rewardTiersAuction.find((rewTier) => rewTier.id === tier.id);
        return { ...tier, ...rewardTier };
      });
      if (loggedInArtist.name && loggedInArtist.avatar) {
        newAuction.artist = loggedInArtist;
        history.push('/my-auctions');
        setTimeout(() => {
          if (
            new Date() < new Date(newAuction.endDate) &&
            new Date() >= new Date(newAuction.startDate)
          ) {
            setActiveAuctions([...activeAuctions, newAuction]);
          } else if (new Date() < new Date(newAuction.startDate)) {
            setFutureAuctions([...futureAuctions, newAuction]);
          }
          setMyAuctions([...myAuctions, newAuction]);
          setAuction({ tiers: [] });
        }, 1000);
      }
    }
  };

  const handleSavePreview = () => {
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
      newAuction.id = uuid();
      newAuction.headline = domainAndBranding.headline;
      newAuction.link = domainAndBranding.link.replace(/\s+/g, '-').toLowerCase();
      newAuction.copied = false;
      newAuction.promoImage = domainAndBranding.promoImage;
      newAuction.backgroundImage = domainAndBranding.backgroundImage;
      newAuction.hasBlur = domainAndBranding.hasBlur;
      newAuction.tiers = auction.tiers.map((tier) => {
        const rewardTier = rewardTiersAuction.find((rewTier) => rewTier.id === tier.id);
        return { ...tier, ...rewardTier };
      });
      if (loggedInArtist.name && loggedInArtist.avatar) {
        newAuction.artist = loggedInArtist;
        history.push(`/${loggedInArtist.name.split(' ')[0]}/${newAuction.link}`, {
          auction: newAuction,
        });
        setTimeout(() => {
          if (
            new Date() < new Date(newAuction.endDate) &&
            new Date() >= new Date(newAuction.startDate)
          ) {
            setActiveAuctions([...activeAuctions, newAuction]);
          }
          setMyAuctions([...myAuctions, newAuction]);
          setAuction({ tiers: [] });
        }, 1000);
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
        newAuction.id = uuid();
        newAuction.headline = domainAndBranding.headline;
        newAuction.link = domainAndBranding.link.replace(/\s+/g, '-').toLowerCase();
        newAuction.copied = false;
        newAuction.promoImage = domainAndBranding.promoImage;
        newAuction.backgroundImage = domainAndBranding.backgroundImage;
        newAuction.hasBlur = domainAndBranding.hasBlur;
        newAuction.tiers = auction.tiers.map((tier) => {
          const rewardTier = rewardTiersAuction.find((rewTier) => rewTier.id === tier.id);
          return { ...tier, ...rewardTier };
        });
        if (loggedInArtist.name && loggedInArtist.avatar) {
          newAuction.artist = loggedInArtist;
          history.push(`/${loggedInArtist.name.split(' ')[0]}/${newAuction.link}`, {
            auction: newAuction,
          });
          setTimeout(() => {
            if (
              new Date() < new Date(newAuction.endDate) &&
              new Date() >= new Date(newAuction.startDate)
            ) {
              setActiveAuctions([...activeAuctions, newAuction]);
            }
            setMyAuctions([...myAuctions, newAuction]);
            setAuction({ tiers: [] });
          }, 1000);
        }
      }
    }
  };

  return (
    <div className="customize__auction">
      <div className="container ">
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
          <Button className="light-border-button" onClick={handlePreview}>
            Preview
          </Button>
        </div>
        <DomainAndBranding values={domainAndBranding} onChange={setDomainAndBranding} />
        <RewardTiersAuction values={rewardTiersAuction} onChange={setRewardTiersAuction} />
        <AboutArtistAuction />
        <div className="customize-buttons">
          <Button className="light-button" onClick={handleSaveClose}>
            Save and close
          </Button>
          <Button className="light-border-button" onClick={handleSavePreview}>
            Save and preview
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomizeAuction;
