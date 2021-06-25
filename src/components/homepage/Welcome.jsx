import React, { useState, useEffect, useRef } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import Popup from 'reactjs-popup';
import ellipses from '../../assets/images/ellipses.svg';
import heroVideo from '../../assets/images/hero_video.mp4';
import Button from '../button/Button.jsx';
import SubscribePopup from '../popups/SubscribePopup.jsx';

const Welcome = () => {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current && ref.current.readyState === 4) {
        setLoaded(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [loaded]);

  return (
    <div className="welcome__section">
      <img className="ellipse-l" src={ellipses} alt="Ellipses" />
      <img className="ellipse-r" src={ellipses} alt="Ellipses" />
      <div className="welcome__section__container">
        <div className="left">
          <AnimatedOnScroll animationIn="fadeIn" animationInDelay={200}>
            <h1 className="title">Welcome to the NFT Universe built on Ethereum</h1>
          </AnimatedOnScroll>
          <AnimatedOnScroll animationIn="fadeIn" animationInDelay={400}>
            <p className="desc">
              Launch your own community-driven NFT universe baked with social tools, media services,
              and distribution - underpinned by the native $XYZ token.
            </p>
          </AnimatedOnScroll>
          <AnimatedOnScroll animationIn="fadeIn" animationInDelay={600}>
            <div className="links">
              <Button
                className="light-button"
                onClick={() => window.open('https://github.com/UniverseXYZ/UniverseXYZ-Whitepaper')}
              >
                Whitepaper
              </Button>
              <Popup
                trigger={
                  <button type="button" className="light-border-button">
                    Join newsletter
                  </button>
                }
              >
                {(close) => <SubscribePopup close={close} />}
              </Popup>
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
            <video
              ref={ref}
              autoPlay
              loop
              muted
              playsInline
              style={{ display: loaded ? 'block' : 'none' }}
            >
              <source src={heroVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </AnimatedOnScroll>
      </div>
    </div>
  );
};

export default Welcome;
