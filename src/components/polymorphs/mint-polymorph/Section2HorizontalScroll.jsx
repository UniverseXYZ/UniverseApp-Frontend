import React, { useState, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import './styles/Section2HorizontalScroll.scss';
import charactersData from '../../../utils/fixtures/horizontalScrollCharactersData';

const child = (data) =>
  data.map((elem, index) => (
    <div className={`child--scroll child--scroll--${index + 1}`} key={index.toString()}>
      <img alt="img" src={elem.img} />
      <p>{elem.name}</p>
    </div>
  ));

const Section2HorizontalScroll = (props) => {
  const location = useLocation();
  const { width, height } = props;
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
      const horizontalScrollWidth = charactersData.length * scrolItem?.clientWidth;
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
        if (window.scrollY <= transitionEndLimit + 200) {
          horizontalScroll.style.transform = `translate3d(-${
            window.scrollY - sc
          }px, 0px, 0px) scale3d(1, 1, 1)`;
        } else if (window.scrollY >= transitionEndLimit + 200) {
          horizontalScroll.style.transform = `translate3d(-${transitionEndLimit}px, 0px, 0px) scale3d(1, 1, 1)`;
        }
      }
    }
    window.addEventListener('scroll', runOnScroll);

    // return () => window.removeEventListener('scroll', runOnScroll);
  });
  return (
    <div
      className="block--horizontall--scroll--transparent"
      style={{ height: `${transparentBlockHeight + 800}px` }}
    >
      <div className="section2--horizontal--scroll--parent">
        <h3>Possible base characters</h3>
        <p className="row2--unique--skins">11 unique skins</p>
        <div className="horizontall--slider">{child(charactersData)}</div>
      </div>
    </div>
  );
};

Section2HorizontalScroll.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default Section2HorizontalScroll;
