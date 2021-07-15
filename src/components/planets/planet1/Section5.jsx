import React from 'react';
import PropTypes from 'prop-types';
import WrapperCenter from '../../polymorphs/WrapperCenter';
import Button from '../../button/Button';
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
            <div className="description--block">
              <p className="planet--number">{planet1.planet}</p>
              <h3 className="planet--title">{planet1.title}</h3>
              <p className="planet--hintText">{planet1.hintText}</p>
              <Button className="light-button" onClick={planet1.btnOnClick}>
                {planet1.btnText}
              </Button>
            </div>
          </div>
          <div className="right--planet">
            <div className="planet--image--block">
              <img src={planet2.image} alt="img" />
            </div>
            <div className="description--block">
              <p className="planet--number">{planet2.planet}</p>
              <h3 className="planet--title">{planet2.title}</h3>
              <p className="planet--hintText">{planet2.hintText}</p>
              <Button className="light-button" onClick={planet2.btnOnClick}>
                {planet2.btnText}
              </Button>
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
    btnText: PropTypes.string,
    btnOnClick: PropTypes.func,
  }).isRequired,
  planet2: PropTypes.shape({
    className: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    planet: PropTypes.string,
    hintText: PropTypes.string,
    btnText: PropTypes.string,
    btnOnClick: PropTypes.func,
  }).isRequired,
};

export default Section5;
