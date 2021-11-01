import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import { useHistory } from 'react-router-dom';
import WrapperCenter from './WrapperCenter';
import WrapperCenterTwoColumns from './WrapperCenterTwoColumns';
import './styles/Section4.scss';
import mobilebackground from '../../assets/images/mobilebackground.png';
import Section4LeftBackground from '../../assets/images/topmorph.png';
import Button from '../button/Button';
import leftSectionVideo from '../../assets/images/burn-to-mint/polymorph_burning.mp4';

const getWindow = (width, changeStateFunc) => {
  const TABLET_SIZE = 992;
  const MOBILE_SIZE = 575;
  if (+width > TABLET_SIZE) changeStateFunc('browser');
  else if (+width <= TABLET_SIZE && +width > MOBILE_SIZE) changeStateFunc('tablet');
  else if (+width <= MOBILE_SIZE) changeStateFunc('mobile');
};

const leftBlock = (leftVideo) => {
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
    <AnimatedOnScroll animationIn="fadeIn" animationInDelay={500}>
      <div className="section4--left--block">
        <video
          ref={ref}
          autoPlay
          loop
          muted
          playsInline
          style={{ display: loaded ? 'block' : 'none' }}
        >
          <source src={leftVideo} type="video/mp4" />
          <track kind="captions" />
          Your browser does not support the video tag.
        </video>
      </div>
    </AnimatedOnScroll>
  );
};

const rightBlock = (title, hintText, buttonText) => {
  const history = useHistory();
  return (
    <AnimatedOnScroll animationIn="fadeIn" animationInDelay={200}>
      <div className="section4--right--block">
        <h2>{title}</h2>
        {typeof hintText === 'string' ? (
          <p>{hintText}</p>
        ) : (
          hintText.map((text) => <p key={uuid()}>{text}</p>)
        )}
        <Button className="light-button" onClick={() => history.push('/choose-polymorph')}>
          {buttonText}
        </Button>
      </div>
    </AnimatedOnScroll>
  );
};

const BurnYourPolymorphSection = (props) => {
  const {
    title,
    hintText,
    buttonText,
    backgroundImage,
    leftBackground,
    leftBackgroundMobile,
    leftVideo,
  } = props;
  const [windows, setWindows] = useState('browser');
  const [width, setWidth] = useState(window.innerWidth);
  useLayoutEffect(() => {
    function handleResize() {
      getWindow(window.innerWidth, setWindows);
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  useEffect(() => {
    getWindow(window.innerWidth, setWindows);
  }, [width]);

  return (
    <div className="polymorph--section4">
      <WrapperCenter className="polymorph--wrapper--center--section4">
        <WrapperCenterTwoColumns
          leftBlock={leftBlock(leftVideo)}
          rightBlock={rightBlock(title, hintText, buttonText, backgroundImage)}
        />
      </WrapperCenter>
    </div>
  );
};

BurnYourPolymorphSection.propTypes = {
  title: PropTypes.string,
  hintText: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  buttonText: PropTypes.string,
  leftVideo: PropTypes.string,
  backgroundImage: PropTypes.node,
  leftBackground: PropTypes.node,
  leftBackgroundMobile: PropTypes.node,
};

BurnYourPolymorphSection.defaultProps = {
  title: 'Polymorph Rarity Chart',
  hintText: 'Mirror, mirror on the wall, who has the rarest Polymorph of them all?',
  buttonText: 'Rarity chart',
  backgroundImage: null,
  leftBackground: Section4LeftBackground,
  leftBackgroundMobile: mobilebackground,
  leftVideo: leftSectionVideo,
};

export default BurnYourPolymorphSection;
