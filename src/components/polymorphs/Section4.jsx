import React, { useLayoutEffect, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import { useHistory } from 'react-router-dom';
import WrapperCenter from './WrapperCenter';
import WrapperCenterTwoColumns from './WrapperCenterTwoColumns';
import './styles/Section4.scss';
import mobilebackground from '../../assets/images/mobilebackground.png';
import Button from '../button/Button';
import Section4LeftBackground from '../../assets/images/topmorph.png';

const getWindow = (width, changeStateFunc) => {
  if (+width > 834) changeStateFunc('browser');
  else if (+width <= 834 && +width > 575) changeStateFunc('table');
  else if (+width <= 575) changeStateFunc('mobile');
};

const leftBlock = (windows, leftBackground, leftBackgroundMobile) => (
  <AnimatedOnScroll animationIn="fadeIn" animationInDelay={500}>
    <div
      className="section4--left--block"
      style={
        windows === 'mobile'
          ? { height: window.innerWidth }
          : windows === 'tablet'
          ? {}
          : { backgroundImage: `url(${leftBackground})`, height: '542px' }
      }
    >
      <img alt="mobile" src={leftBackgroundMobile} className="show--on--mobile" />
      <img alt="tablet" src={leftBackground} className="show--on--tablet" />
    </div>
  </AnimatedOnScroll>
);

const rightBlock = (title, hintText, buttonText) => {
  const history = useHistory();
  return (
    <AnimatedOnScroll animationIn="fadeIn" animationInDelay={200}>
      <div className="section4--right--block">
        {/* <div className="coming--soon">COMING SOON</div> */}
        <h2>{title}</h2>
        <p>{hintText}</p>
        <Button className="light-button" onClick={() => history.push('/polymorph-rarity')}>
          {buttonText}
        </Button>
      </div>
    </AnimatedOnScroll>
  );
};

const Section4 = (props) => {
  const { title, hintText, buttonText, backgroundImage, leftBackground, leftBackgroundMobile } =
    props;
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
    <div
      className="polymorph--section4"
      style={
        backgroundImage
          ? {
              backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }
          : {}
      }
    >
      <WrapperCenter className="polymorph--wrapper--center--section4">
        <WrapperCenterTwoColumns
          leftBlock={leftBlock(windows, leftBackground, leftBackgroundMobile)}
          rightBlock={rightBlock(title, hintText, buttonText, backgroundImage)}
        />
      </WrapperCenter>
    </div>
  );
};

Section4.propTypes = {
  title: PropTypes.string,
  hintText: PropTypes.string,
  buttonText: PropTypes.string,
  backgroundImage: PropTypes.node,
  leftBackground: PropTypes.node,
  leftBackgroundMobile: PropTypes.node,
};

Section4.defaultProps = {
  title: 'Polymorph Rarity Chart',
  hintText: 'Mirror, mirror on the wall, who has the rarest Polymorph of them all?',
  buttonText: 'Rarity chart',
  backgroundImage: null,
  leftBackground: Section4LeftBackground,
  leftBackgroundMobile: mobilebackground,
};

export default Section4;
