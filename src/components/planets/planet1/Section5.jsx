import React from 'react';
import PropTypes from 'prop-types';
import WrapperCenter from '../../polymorphs/WrapperCenter';
import './styles/Section5.scss';

const Section5 = (props) => {
  const { planet1, planet2 } = props;
  return (
    <div className="planet--section5">
      <WrapperCenter className="section5--wrapper">
        <h1 className="section--title">Choose your planet</h1>
        <div className="two--planet--cards--block">
          <div className="left--planet">
            <div className="planet--image--block">
              <img src={planet1.image} alt="img" />
            </div>
          </div>
          <div className="right--planet">
            <div className="planet--image--block">
              <img src={planet2.image} alt="img" />
            </div>
          </div>
        </div>
      </WrapperCenter>
    </div>
  );
};

Section5.propTypes = {
  planet1: PropTypes.shape({
    className: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    planet: PropTypes.string,
    hintText: PropTypes.string,
  }).isRequired,
  planet2: PropTypes.shape({
    className: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    planet: PropTypes.string,
    hintText: PropTypes.string,
  }).isRequired,
};

export default Section5;
