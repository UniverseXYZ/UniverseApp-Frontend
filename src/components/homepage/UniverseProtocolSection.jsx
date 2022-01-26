import React, { useEffect, useRef } from 'react';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import circleImg from '../../assets/images/circle.svg';

const UniverseProtocolSection = () => {
  const mainSectionRef = useRef(null);
  const rightCircleRef = useRef(null);
  const leftCircleRef = useRef(null);

  useEffect(() => {
    const circleR = rightCircleRef.current;
    const circleL = leftCircleRef.current;

    const scrollLoop = () => {
      if (mainSectionRef.current) {
        const yScrollPosition = window.scrollY;

        circleR.style.transform = `translate3d(${yScrollPosition * -0.05}px, ${
          yScrollPosition * -0.2
        }px, 0)`;
        circleL.style.transform = `translate3d(${yScrollPosition * -0.05}px, ${
          yScrollPosition * -0.2
        }px, 0) rotate(180deg)`;

        requestAnimationFrame(scrollLoop);
      }
    };

    if (mainSectionRef.current) {
      requestAnimationFrame(scrollLoop);
    }

    return () => cancelAnimationFrame(scrollLoop);
  }, []);

  return (
    <div ref={mainSectionRef} className="universe__protocol__section">
      <img ref={rightCircleRef} className="circle-r" src={circleImg} alt="Circle" />
      <img ref={leftCircleRef} className="circle-l" src={circleImg} alt="Circle" />
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
