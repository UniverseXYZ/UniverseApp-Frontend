import React from 'react';
import PropTypes from 'prop-types';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import WrapperCenter from '../../polymorphs/WrapperCenter';
import Section2Card from './Section2Card';
import './styles/Section4.scss';

const Section4 = (props) => {
  const { mythical, title, hintText } = props;
  return (
    <div className="planet--section4">
      <WrapperCenter>
        <div className="title--block">
          <h3>{title}</h3>
          <p>{hintText}</p>
        </div>
        <AnimatedOnScroll animationIn="fadeIn" animationInDelay={500}>
          <div className="characters--parent--block">
            {mythical.map((elem, index) => (
              <Section2Card {...elem} key={index.toString()} />
            ))}
          </div>
        </AnimatedOnScroll>
      </WrapperCenter>
    </div>
  );
};

Section4.propTypes = {
  mythical: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
    })
  ).isRequired,
  title: PropTypes.string,
  hintText: PropTypes.string,
};

Section4.defaultProps = {
  title: '',
  hintText: '',
};

export default Section4;
