import React from 'react';
import PropTypes from 'prop-types';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import WelcomeWrapper from '../ui-elements/WelcomeWrapper';
import Section2 from './planet1/Section2';
import Section3 from './planet1/Section3';
import Section4 from './planet1/Section4';
import Section5 from './planet1/Section5';
import LeftTopImg from '../../assets/images/planet1-section2-left-top.png';
import './PlanetContainer.scss';

const PlanetContainer = (props) => {
  const {
    title,
    hintText,
    planetNumberText,
    welcomeSectionImg,
    className,
    section2Title,
    section3Title,
    section3HintText,
    section4Title,
    section4HintText,
    fabled,
    mythical,
    legendary,
    legendaryLeftTopImg,
    section5Planet1,
    section5Planet2,
  } = props;

  const scrollSection = () => {
    const section = document.querySelector('.planet--section3').offsetTop;
    const header = document.querySelector('header');
    const headerPosition = header.style.position;
    const legendaryDiv = document
      .getElementsByClassName('welcome--section')[0]
      .getBoundingClientRect();
    window.scrollTo(0, legendaryDiv.height);

    // const element = document.getElementById('welcome_sec').getBoundingClientRect();

    // if (headerPosition === 'relative') {
    //   window.scrollTo(0, section - (header.clientHeight + 1) * 2);
    // } else {
    //   window.scrollTo(0, section - header.clientHeight + 1);
    // }
  };

  return (
    <div className={`planet--container ${className}`}>
      <WelcomeWrapper
        title={
          <>
            <span>{planetNumberText}</span>
            {title}
          </>
        }
        btnOnClick={scrollSection}
        hintText={hintText}
        btnText="Show characters"
      >
        {!!welcomeSectionImg.length && <img alt="img" src={welcomeSectionImg} />}
      </WelcomeWrapper>
      <AnimatedOnScroll animationIn="fadeIn" className="legendary" animationInDelay={300}>
        <Section2
          title={section2Title}
          legendary={legendary}
          legendaryLeftTopImg={legendaryLeftTopImg}
        />
      </AnimatedOnScroll>
      <Section3 fabled={fabled} title={section3Title} hintText={section3HintText} />
      <Section4 mythical={mythical} title={section4Title} hintText={section4HintText} />
      <AnimatedOnScroll animationIn="fadeIn" animationInDelay={300}>
        <Section5 planet1={section5Planet1} planet2={section5Planet2} />
      </AnimatedOnScroll>
    </div>
  );
};

PlanetContainer.propTypes = {
  title: PropTypes.string.isRequired,
  hintText: PropTypes.node.isRequired,
  welcomeSectionImg: PropTypes.string,
  planetNumberText: PropTypes.string,
  className: PropTypes.string,
  section2Title: PropTypes.string,
  section3Title: PropTypes.string,
  section3HintText: PropTypes.string,
  section4Title: PropTypes.string,
  section4HintText: PropTypes.string,
  fabled: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
    })
  ).isRequired,
  mythical: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
    })
  ).isRequired,
  legendary: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
    })
  ).isRequired,
  legendaryLeftTopImg: PropTypes.string,
  section5Planet1: PropTypes.shape({
    className: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    planet: PropTypes.string,
    hintText: PropTypes.string,
  }).isRequired,
  section5Planet2: PropTypes.shape({
    className: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    planet: PropTypes.string,
    hintText: PropTypes.string,
  }).isRequired,
};

PlanetContainer.defaultProps = {
  planetNumberText: '',
  className: '',
  section2Title: '',
  section3Title: '',
  section3HintText: '',
  welcomeSectionImg: '',
  section4Title: '',
  section4HintText: '',
  legendaryLeftTopImg: LeftTopImg,
};

export default PlanetContainer;
