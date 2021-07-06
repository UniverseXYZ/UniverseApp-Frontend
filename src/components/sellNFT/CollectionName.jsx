import React from 'react';
import PropTypes from 'prop-types';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import WrapperCenter from '../polymorphs/WrapperCenter';
import leftIcon from '../../assets/images/browse-nft-arrow-down.svg';
import ethIcon from '../../assets/images/eth-marketplace-icon.svg';
import './styles/CollectionName.scss';

const CollectionName = (props) => {
  const { image, name, price } = props;
  return (
    <div className="collection--name--parent">
      <AnimatedOnScroll animationIn="fadeIn" animationInDelay={300}>
        <WrapperCenter className="collection--name--container">
          <div className="left--block">
            <img alt="img" src={leftIcon} />
          </div>
          <div className="img--block">
            <img src={image} alt="img" />
          </div>
          <div className="description--block">
            <p className="collection--name">Collection name</p>
            <h6>
              {name}
              <span className="last--purchased">– last purchased at</span>
              <span className="eth--icon">
                <img alt="img" src={ethIcon} />
              </span>
              {price}
            </h6>
          </div>
        </WrapperCenter>
      </AnimatedOnScroll>
    </div>
  );
};

CollectionName.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
};

CollectionName.defaultProps = {
  image: '',
  name: '',
  price: '',
};

export default CollectionName;
