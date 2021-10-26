import React, { useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useHistory } from 'react-router-dom';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import ellipses from '../../../assets/images/ellipses.svg';
import Button from '../../button/Button.jsx';
import welcomeImg from '../../../assets/images/about-page-welcome.png';

const Welcome = () => {
  const [loaded, setLoaded] = useState(false);
  const history = useHistory();

  return (
    <div className="welcome__section">
      <img className="ellipse-l" src={ellipses} alt="Ellipses" />
      <img className="ellipse-r" src={ellipses} alt="Ellipses" />
      <div className="welcome__section__container">
        <div className="left">
          <AnimatedOnScroll animationIn="fadeIn" animationInDelay={200}>
            <h1 className="title">Welcome to a Universe made for Artists by Artists</h1>
          </AnimatedOnScroll>
          <AnimatedOnScroll animationIn="fadeIn" animationInDelay={400}>
            <p className="desc">
              Mint single or multiple NFTs, create and edit NFT Collections, and run auctions with
              multiple NFTs per winner. In this Universe anything is possible.
            </p>
          </AnimatedOnScroll>
          <AnimatedOnScroll animationIn="fadeIn" animationInDelay={600}>
            <div className="links">
              <Button
                className="light-button"
                onClick={() => history.push('/setup-auction/auction-settings')}
              >
                Set up auction
              </Button>
              <Button
                className="light-border-button"
                onClick={() => history.push('/products/auction-house')}
              >
                Auction house
              </Button>
            </div>
          </AnimatedOnScroll>
        </div>
        <AnimatedOnScroll animationIn="fadeIn">
          <div className="right">
            {!loaded && (
              <SkeletonTheme color="#202020" highlightColor="#444">
                <Skeleton circle height={300} width={300} />
              </SkeletonTheme>
            )}
            <img
              src={welcomeImg}
              alt="Welcome"
              onLoad={() => setLoaded(true)}
              style={{ display: loaded ? 'block' : 'none' }}
            />
          </div>
        </AnimatedOnScroll>
      </div>
    </div>
  );
};

export default Welcome;
