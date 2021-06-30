import React from 'react';
import PropTypes from 'prop-types';
import Legendary from '../../../assets/images/planet-section2-legendary.png';
import Button from '../../button/Button';
import './styles/Section2Card.scss';

const Section2Card = (props) => {
  const { name, description, image, legendary } = props;
  return (
    <div className="section2--card--parent">
      {legendary && <img src={Legendary} alt="img" className="planet--card--legendary--image" />}
      <div className="image--block">{!!image.length && <img src={image} alt="img" />}</div>
      <div className="text--block">
        <h6>{name}</h6>
        <p>{description}</p>
      </div>
      <div className="buttons--group">
        <Button className="light-button" type="button">
          Mint Reprint
        </Button>
        <Button className="light-border-button" type="button">
          1/1 auction
        </Button>
      </div>
    </div>
  );
};

Section2Card.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  legendary: PropTypes.bool,
};

Section2Card.defaultProps = {
  name: '',
  description: '',
  image: '',
  legendary: false,
};

export default Section2Card;
