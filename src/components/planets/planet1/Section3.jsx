import React from 'react';
import PropTypes from 'prop-types';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import WrapperCenter from '../../polymorphs/WrapperCenter';
import Section2Card from './Section2Card';
import './styles/Section3.scss';

const Section3 = (props) => {
  const { abakaFabled } = props;
  return (
    <div className="planet--one--section3">
      <WrapperCenter>
        <div className="title--block">
          <h3>Adaka Fabled</h3>
          <p>3 evolutions</p>
        </div>
        <AnimatedOnScroll animationIn="fadeIn" animationInDelay={500}>
          <div className="characters--parent--block">
            {abakaFabled.map((elem, index) => (
              <Section2Card {...elem} key={index.toString()} />
            ))}
          </div>
        </AnimatedOnScroll>
      </WrapperCenter>
    </div>
  );
};

Section3.propTypes = {
  abakaFabled: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
    })
  ).isRequired,
};

export default Section3;
