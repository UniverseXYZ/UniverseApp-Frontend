import React, { useEffect } from 'react';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import circleImg from '../../assets/images/circle.svg';

const UniverseProtocolSection = () => {
  useEffect(() => {
    const circleR = document.querySelector('#circle-r');
    const circleL = document.querySelector('#circle-l');
    const squareOneEl = document.querySelector('#squareOne');
    const squareTwoEl = document.querySelector('#squareTwo');
    const squareThreeEl = document.querySelector('#squareThree');
    const squareFourEl = document.querySelector('#squareFour');
    const squareFiveEl = document.querySelector('#squareFive');
    const squareSixEl = document.querySelector('#squareSix');
    const squareSevenEl = document.querySelector('#squareSeven');

    const scrollLoop = () => {
      if (document.querySelector('.about__section')) {
        const yScrollPosition = window.scrollY;
        const aboutOffsetTop = document.querySelector('.about__section').offsetTop;

        circleR.style.transform = `translate3d(${yScrollPosition * -0.05}px, ${
          yScrollPosition * -0.2
        }px, 0)`;
        circleL.style.transform = `translate3d(${yScrollPosition * -0.05}px, ${
          yScrollPosition * -0.2
        }px, 0) rotate(180deg)`;
        squareOneEl.style.transform = `translate3d(${
          (yScrollPosition - aboutOffsetTop) * 0.02
        }px, ${(yScrollPosition - aboutOffsetTop) * 0.02}px, 0)`;
        squareTwoEl.style.transform = `translate3d(${
          (yScrollPosition - aboutOffsetTop) * 0.02
        }px, ${(yScrollPosition - aboutOffsetTop) * 0.02}px, 0)`;
        squareThreeEl.style.transform = `translate3d(${
          (yScrollPosition - aboutOffsetTop) * 0.02
        }px, ${(yScrollPosition - aboutOffsetTop) * 0.02}px, 0)`;
        squareFourEl.style.transform = `translate3d(${
          (yScrollPosition - aboutOffsetTop) * 0.02
        }px, ${(yScrollPosition - aboutOffsetTop) * 0.02}px, 0)`;
        squareFiveEl.style.transform = `translate3d(${
          (yScrollPosition - aboutOffsetTop) * 0.02
        }px, ${(yScrollPosition - aboutOffsetTop) * 0.02}px, 0)`;
        squareSixEl.style.transform = `translate3d(${
          (yScrollPosition - aboutOffsetTop) * 0.02
        }px, ${(yScrollPosition - aboutOffsetTop) * 0.02}px, 0)`;
        squareSevenEl.style.transform = `translate3d(${
          (yScrollPosition - aboutOffsetTop) * 0.02
        }px, ${(yScrollPosition - aboutOffsetTop) * 0.02}px, 0)`;

        requestAnimationFrame(scrollLoop);
      }
    };

    if (document.querySelector('.about__section')) {
      requestAnimationFrame(scrollLoop);
    }

    return () => cancelAnimationFrame(scrollLoop);
  }, []);

  return (
    <div className="universe__protocol__section">
      <img id="circle-r" className="circle-r" src={circleImg} alt="Circle" />
      <img id="circle-l" className="circle-l" src={circleImg} alt="Circle" />
      <div className="universe__protocol__section__container">
        <AnimatedOnScroll animationIn="fadeIn">
          <div className="universe__protocol">
            <h1 className="title">Universe Protocol and the xyzDAO</h1>
            <p className="info">
              Meta: To create a system that doesn’t live off the backs of artists and creates a
              sustainable ecosystem for artists and fans alike.
            </p>
            <p className="desc">
              The Universe is forever expanding at an accelerated rate, all while the xyzDAO
              controls the future and the fate of this project. Starting with an array of tools and
              a mission to empower artists, with a DAO that will be governed by the $XYZ token and
              its community. xyzDAO will be guided by the stars and the carbon that surrounds them
              as we travel into the cosmic unknowns.
            </p>
          </div>
        </AnimatedOnScroll>
      </div>
    </div>
  );
};

export default UniverseProtocolSection;
