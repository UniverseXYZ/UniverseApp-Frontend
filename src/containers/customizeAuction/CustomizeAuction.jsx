import './CustomizeAuction.scss';
import { useHistory } from 'react-router-dom';
import arrow from '../../assets/images/arrow.svg';
import Button from '../../components/button/Button';
import DomainAndBranding from '../../components/customizeAuction/DomainAndBranding';
import RewardTiersAuction from '../../components/customizeAuction/RewardTiersAuction';
import AboutArtistAuction from '../../components/customizeAuction/AboutArtistAuction';

const CustomizeAuction = () => {
  const history = useHistory();

  return (
    <div className="container customize__auction">
      <div
        className="back-rew"
        onClick={() => {
          history.push('/reward-tiers');
        }}
      >
        <img src={arrow} alt="back" />
        <span>Reward tiers</span>
      </div>
      <div className="customize__auction_title">
        <h2>Customize Auction Landing Page</h2>
        <Button className="light-border-button">Preview</Button>
      </div>
      <DomainAndBranding />
      <RewardTiersAuction />
      <AboutArtistAuction />
    </div>
  );
};

export default CustomizeAuction;
