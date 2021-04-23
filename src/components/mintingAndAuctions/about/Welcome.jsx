import { useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useHistory } from 'react-router';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import ellipses from '../../../assets/images/ellipses.svg';
import Button from '../../button/Button';
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
          <AnimatedOnScroll animationIn="fadeInUp" animationInDelay={200}>
            <h1 className="title">Welcome to a Universe made for Artists by Artists</h1>
          </AnimatedOnScroll>
          <AnimatedOnScroll animationIn="fadeInUp" animationInDelay={400}>
            <p className="desc">
              Mint single or multiple NFTs, create and edit NFT Collections, and run auctions with
              multiple NFTs per winner. In this Universe anything is possible.
            </p>
          </AnimatedOnScroll>
          <AnimatedOnScroll animationIn="fadeInUp" animationInDelay={600}>
            <div className="links">
              <Button className="light-button">Set up auction</Button>
              <Button
                className="light-border-button"
                onClick={() => history.push('/minting-and-auctions/marketplace/active-auctions')}
              >
                Open marketplace
              </Button>
            </div>
          </AnimatedOnScroll>
        </div>
        <AnimatedOnScroll animationIn="fadeInUp">
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
