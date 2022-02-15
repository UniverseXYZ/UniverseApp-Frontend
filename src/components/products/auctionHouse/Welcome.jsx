import React from 'react';
import './Welcome.scss';
import { useHistory } from 'react-router-dom';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import Button from '../../button/Button';
import { useAuctionContext } from '../../../contexts/AuctionContext';
import { useAuthContext } from '../../../contexts/AuthContext';
import { ReactComponent as PlusIcon } from '../../../assets/images/plus.svg';

const Welcome = () => {
  const history = useHistory();
  const { setAuction } = useAuctionContext();
  const { address, setshowWalletPopup, loggedInArtist } = useAuthContext();

  return (
    <div className="auction__house__welcome__section">
      <div className="auction__house__welcome__section__container">
        <AnimatedOnScroll animationIn="fadeIn" animationInDelay={200}>
          <h2 className="subtitle">Welcome to the</h2>
          <h1 className="title">Auction House</h1>
        </AnimatedOnScroll>
        <AnimatedOnScroll animationIn="fadeIn" animationInDelay={1000}>
          <p className="desc">
            Check out on creative releases from artists that partnered with us or set up your own
            auction.
          </p>
          <div className="setup--auction--btn">
            {!address ? (
              <Button
                className="light-border-button"
                onClick={() => {
                  setshowWalletPopup(true);
                }}
              >
                Sign in
              </Button>
            ) : !loggedInArtist.universePageAddress ? (
              <Button
                className="light-border-button"
                onClick={() => {
                  history.push('/my-account', {
                    redirect: 'setup-auction',
                  });
                }}
              >
                Set up profile
              </Button>
            ) : (
              <Button
                className="light-border-button"
                onClick={() => {
                  setAuction({ rewardTiers: [] });
                  history.push('/setup-auction');
                }}
              >
                Set up auction
                <PlusIcon />
              </Button>
            )}
          </div>
        </AnimatedOnScroll>
      </div>
    </div>
  );
};

export default Welcome;
