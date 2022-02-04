import React from 'react';
import loadingBg from '../../assets/images/mint-polymorph-loading-bg.png';
import nftLoadingBg from '../../assets/images/nft-loading-bg.png';

export const renderLoaders = (number, type = 'polymorph') =>
  [...Array(number)].map((n) => (
    <React.Fragment key={n}>
      <div className="loading">
        {type === 'nft' ? (
          <img src={nftLoadingBg} alt="nft" />
        ) : (
          <img src={loadingBg} alt="polymorph" />
        )}
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
    </React.Fragment>
  ));
