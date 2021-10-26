import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';
import { useHistory } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import Button from '../../button/Button';
import './styles/BurnToMintHeroSection.scss';
import animation from '../../../assets/images/burn-to-mint/B2Mcards.mp4';
import animationData from '../../../utils/animations/burn_to_mint_animation.json';

const BurnToMintHeroSection = (props) => {
  const { marquee } = props;
  const history = useHistory();
  const ref = useRef();
  const [loaded, setLoaded] = useState(false);
  const VIDEO_READY_STATE = 4;
  useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current && ref.current.readyState === VIDEO_READY_STATE) {
        setLoaded(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [loaded]);

  return (
    <div className="hero--section">
      <div className="hero--section--container">
        <div className="left--section">
          <h1>Burn to mint</h1>
          <p>Same base skin, same traits but with a brand new look.</p>
          <Button className="light-button" onClick={history.push('/choose-polymorph')}>
            Burn a Polymorph
          </Button>
        </div>
        <div className="right--section">
          <video
            ref={ref}
            autoPlay
            loop
            muted
            playsInline
            style={{ display: loaded ? 'block' : 'none' }}
          >
            <source src={animation} type="video/mp4" />
            <track kind="captions" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div className="animation--background">
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice',
            },
          }}
          isClickToPauseDisabled
        />
      </div>
      {marquee && (
        <Marquee gradient={false} className="welcome--marquee">
          <div className="border--top" />
          {marquee}
        </Marquee>
      )}
    </div>
  );
};
BurnToMintHeroSection.propTypes = {
  marquee: PropTypes.node,
};

BurnToMintHeroSection.defaultProps = {
  marquee: null,
};
export default BurnToMintHeroSection;
