import React from 'react';
import PropTypes from 'prop-types';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import WelcomeWrapper from '../ui-elements/WelcomeWrapper';
import Section2 from './planet1/Section2';
import Section3 from './planet1/Section3';
import Section4 from './planet1/Section4';
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
  } = props;
  return (
    <div className={`planet--container ${className}`}>
      <WelcomeWrapper
        title={
          <>
            <span>{planetNumberText}</span>
            {title}
          </>
        }
        hintText={hintText}
        btnText="Show characters"
      >
        {!!welcomeSectionImg.length && <img alt="img" src={welcomeSectionImg} />}
      </WelcomeWrapper>
      <AnimatedOnScroll animationIn="fadeIn" animationInDelay={300}>
        <Section2
          title={section2Title}
          legendary={legendary}
          legendaryLeftTopImg={legendaryLeftTopImg}
        />
      </AnimatedOnScroll>
      <Section3 fabled={fabled} title={section3Title} hintText={section3HintText} />
      <Section4 mythical={mythical} title={section4Title} hintText={section4HintText} />
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
