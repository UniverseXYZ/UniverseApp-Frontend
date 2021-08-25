import React, { useState, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import './styles/Section2HorizontalScroll.scss';

const child = (data) =>
  data.map((elem, index) => (
    <div className={`child--scroll child--scroll--${index + 1}`} key={index.toString()}>
      <img alt="img" src={elem.img} />
      <p>{elem.name}</p>
    </div>
  ));

const Section2HorizontalScroll = (props) => {
  const location = useLocation();
  const { width, height, title, desktopHeightValue, mobileHeightValue, data } = props;
  // const [scrollWidth, setScrollWidth] = useState(width);
  const [transparentBlockHeight, setTransparentBlockHeight] = useState(width);
  const [scrollSticky, setScrollSicky] = useState(0);
  // useEffect(() => {
  //   setScrollWidth(width);
  // }, [width]);
  useLayoutEffect(() => {
    let bool = false;
    let sc = 0;
    function runOnScroll() {
      const header = document.querySelector('header');
      const parent = document.querySelector('.section2--horizontal--scroll--parent');
      const horizontalScroll = document.querySelector('.horizontall--slider');
      const scrolItem = document.querySelector('.child--scroll');
      const horizontalScrollWidth = data.length * scrolItem?.clientWidth;
      const transitionEndLimit = horizontalScrollWidth - window.innerWidth;
      setScrollSicky(parent?.offsetTop - window.scrollY);
      // setTransparentBlockHeight(transitionEndLimit);
      if (
        scrollSticky === header?.clientHeight + 1 &&
        scrollSticky === parent?.offsetTop - window.scrollY
      ) {
        if (!bool) {
          bool = true;
          sc = window.scrollY;
        }
        horizontalScroll.style.willChange = 'transform';
        horizontalScroll.style.transformStyle = 'preserve-3d';
        horizontalScroll.style.webkitTransformStyle = 'preserve-3d';
        horizontalScroll.style.msTransformStyle = 'preserve-3d';
        if (window.scrollY <= transitionEndLimit + 200) {
          horizontalScroll.style.transform = `translate3d(-${
            window.scrollY - sc
          }px, 0px, 0px) scale3d(1, 1, 1)`;
          horizontalScroll.style.webkitTransform = `translate3d(-${
            window.scrollY - sc
          }px, 0px, 0px) scale3d(1, 1, 1)`;
          horizontalScroll.style.msTransform = `translate3d(-${
            window.scrollY - sc
          }px, 0px, 0px) scale3d(1, 1, 1)`;
        } else if (window.scrollY >= transitionEndLimit + 200) {
          horizontalScroll.style.transform = `translate3d(-${transitionEndLimit}px, 0px, 0px) scale3d(1, 1, 1)`;
          horizontalScroll.style.webkitTransform = `translate3d(-${transitionEndLimit}px, 0px, 0px) scale3d(1, 1, 1)`;
          horizontalScroll.style.msTransform = `translate3d(-${transitionEndLimit}px, 0px, 0px) scale3d(1, 1, 1)`;
        }
      }
    }
    window.addEventListener('scroll', runOnScroll);

    // return () => window.removeEventListener('scroll', runOnScroll);
  });
  return (
    <div
      className="block--horizontall--scroll--transparent"
      style={{
        height: `${
          width > 576
            ? transparentBlockHeight + desktopHeightValue
            : transparentBlockHeight + mobileHeightValue
        }px`,
      }}
    >
      <div className="section2--horizontal--scroll--parent">
        <h3>{title}</h3>
        <p className="row2--unique--skins">11 unique skins</p>
        <div className="horizontall--slider">{child(data)}</div>
      </div>
    </div>
  );
};

Section2HorizontalScroll.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  title: PropTypes.string,
  desktopHeightValue: PropTypes.number,
  mobileHeightValue: PropTypes.number,
};

Section2HorizontalScroll.defaultProps = {
  title: 'Possible base characters',
  desktopHeightValue: 1100,
  mobileHeightValue: 1600,
};

export default Section2HorizontalScroll;
