import React, { useState, useContext } from 'react';
import './CustomizeAuction.scss';
import { useHistory } from 'react-router-dom';
import arrow from '../../assets/images/arrow.svg';
import Button from '../../components/button/Button';
import DomainAndBranding from '../../components/customizeAuction/DomainAndBranding';
import RewardTiersAuction from '../../components/customizeAuction/RewardTiersAuction';
import AboutArtistAuction from '../../components/customizeAuction/AboutArtistAuction';
import AppContext from '../../ContextAPI';

const CustomizeAuction = () => {
  const history = useHistory();
  const { auction, setAuction } = useContext(AppContext);
  const [domainAndBranding, setDomainAndBranding] = useState({
    headline: '',
    link: '',
    promoImage: null,
    backgroundImage: null,
  });
  const [rewardTiersAuction, setRewardTiersAuction] = useState(
    auction.tiers.map((tier) => ({ id: tier.id }))
  );

  const handleSaveClose = () => {
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
        console.log('desc = true');
        history.push('/my-auctions');
        setAuction((prevValues) => ({
          ...prevValues,
          headline: domainAndBranding.headline,
          link: domainAndBranding.link,
          promoImage: domainAndBranding.promoImage,
          backgroundImage: domainAndBranding.backgroundImage,
          tiers: prevValues.tiers.map((tier) => {
            const rewardTier = rewardTiersAuction.find((rewTier) => rewTier.id === tier.id);
            return { ...tier, ...rewardTier };
          }),
        }));
      }
    }
  };

  const handleSavePreview = () => {
    console.log(rewardTiersAuction);
    console.log(domainAndBranding);
  };

  return (
    <div className="container customize__auction">
      <div
        className="back-rew"
        onClick={() => {
          history.push('/reward-tiers');
        }}
        aria-hidden="true"
      >
        <img src={arrow} alt="back" />
        <span>Reward tiers</span>
      </div>
      <div className="customize__auction_title">
        <h2>Customize auction landing page</h2>
        <Button className="light-border-button">Preview</Button>
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
  );
};

export default CustomizeAuction;
