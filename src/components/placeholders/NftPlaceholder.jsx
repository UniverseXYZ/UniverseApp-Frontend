import React from 'react';
import loadingBg from '../../assets/images/mint-polymorph-loading-bg.png';

function NftPlaceholder() {
  return (
    <div className="loading">
      <img src={loadingBg} alt="polymorph" />
      <div className="lds-roller">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}

export default NftPlaceholder;
