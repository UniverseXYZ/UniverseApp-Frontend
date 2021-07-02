import React from 'react';
import PropTypes from 'prop-types';
import WrapperCenter from '../polymorphs/WrapperCenter';
import './styles/SellNFTContainer.scss';

const SellNFTContainer = (props) => {
  const { title, contentClassName, children } = props;
  return (
    <div className="sell--nft--container">
      <WrapperCenter className="sell--nft--wrapper--center">
        <h3 className="sell--nft--container--title">{title}</h3>
        <div className={`content ${contentClassName}`}>{children}</div>
      </WrapperCenter>
    </div>
  );
};

SellNFTContainer.propTypes = {
  title: PropTypes.string,
  contentClassName: PropTypes.string,
  children: PropTypes.node,
};

SellNFTContainer.defaultProps = {
  title: '',
  contentClassName: '',
  children: null,
};

export default SellNFTContainer;
