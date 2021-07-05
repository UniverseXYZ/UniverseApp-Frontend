import React from 'react';
import PropTypes from 'prop-types';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import WrapperCenter from '../../polymorphs/WrapperCenter';
import Section2Card from './Section2Card';
import './styles/Section3.scss';

const Section3 = (props) => {
  const { fabled, title, hintText } = props;
  return (
    <div className="planet--section3">
      <WrapperCenter>
        <div className="title--block">
          <h3>{title}</h3>
          <p>{hintText}</p>
        </div>
        <AnimatedOnScroll animationIn="fadeIn" animationInDelay={500}>
          <div className="characters--parent--block">
            {fabled.map((elem, index) => (
              <Section2Card {...elem} key={index.toString()} />
            ))}
          </div>
        </AnimatedOnScroll>
      </WrapperCenter>
    </div>
  );
};

Section3.propTypes = {
  fabled: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
    })
  ).isRequired,
  title: PropTypes.string,
  hintText: PropTypes.string,
};

Section3.defaultProps = {
  title: '',
  hintText: '',
};

export default Section3;
