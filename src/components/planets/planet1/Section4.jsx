import React from 'react';
import PropTypes from 'prop-types';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import WrapperCenter from '../../polymorphs/WrapperCenter';
import Section2Card from './Section2Card';
import './styles/Section4.scss';

const Section4 = (props) => {
  const { abakaMythical } = props;
  return (
    <div className="planet--one--section4">
      <WrapperCenter>
        <div className="title--block">
          <h3>Adaka Mythical</h3>
          <p>2 evolutions</p>
        </div>
        <AnimatedOnScroll animationIn="fadeIn" animationInDelay={500}>
          <div className="characters--parent--block">
            {abakaMythical.map((elem, index) => (
              <Section2Card {...elem} key={index.toString()} />
            ))}
          </div>
        </AnimatedOnScroll>
      </WrapperCenter>
    </div>
  );
};

Section4.propTypes = {
  abakaMythical: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
    })
  ).isRequired,
};

export default Section4;
