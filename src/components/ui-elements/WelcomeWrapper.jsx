import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Marquee from 'react-fast-marquee';
// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import Popup from 'reactjs-popup';
import ellipses from '../../assets/images/ellipses.svg';
import Button from '../button/Button.jsx';
import SubscribePopup from '../popups/SubscribePopup.jsx';
import './styles/WelcomeWrapper.scss';

const WelcomeWrapper = (props) => {
  const { ellipsesLeft, ellipsesRight, title, hintText, btnText, popupBtnText, children, marquee } =
    props;

  return (
    <div className="welcome__section">
      {ellipsesLeft && <img className="ellipse-l" src={ellipses} alt="Ellipses" />}
      {ellipsesRight && <img className="ellipse-r" src={ellipses} alt="Ellipses" />}
      <div className="welcome__section__container">
        <div className="left">
          <AnimatedOnScroll animationIn="fadeIn" animationInDelay={200}>
            <h1 className="title">{title}</h1>
          </AnimatedOnScroll>
          <AnimatedOnScroll animationIn="fadeIn" animationInDelay={400}>
            <p className="desc">{hintText}</p>
          </AnimatedOnScroll>
          <AnimatedOnScroll animationIn="fadeIn" animationInDelay={600}>
            <div className="links">
              <Button
                className="light-button"
                onClick={() => window.open('https://github.com/UniverseXYZ/UniverseXYZ-Whitepaper')}
              >
                {btnText}
              </Button>
              <Popup
                trigger={
                  <button type="button" className="light-border-button">
                    {popupBtnText}
                  </button>
                }
              >
                {(close) => <SubscribePopup close={close} />}
              </Popup>
            </div>
          </AnimatedOnScroll>
        </div>
        <AnimatedOnScroll animationIn="fadeIn">
          <div className="right">{children && <div>{children}</div>}</div>
        </AnimatedOnScroll>
      </div>
      {marquee && (
        <Marquee gradient={false} className="welcome--marquee">
          {marquee}
        </Marquee>
      )}
    </div>
  );
};

WelcomeWrapper.propTypes = {
  ellipsesLeft: PropTypes.bool,
  ellipsesRight: PropTypes.bool,
  title: PropTypes.string.isRequired,
  hintText: PropTypes.string,
  btnText: PropTypes.string.isRequired,
  popupBtnText: PropTypes.string.isRequired,
  children: PropTypes.node,
  marquee: PropTypes.node,
};

WelcomeWrapper.defaultProps = {
  ellipsesLeft: true,
  ellipsesRight: true,
  hintText: '',
  children: null,
  marquee: null,
};

export default WelcomeWrapper;
