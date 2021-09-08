import React from 'react';
import uuid from 'react-uuid';
import loadingBg from '../../assets/images/mint-polymorph-loading-bg.png';
import nftLoadingBg from '../../assets/images/nft-loading-bg.png';

export const renderLoaders = (number, type = 'polymorph') =>
  [...Array(number)].map(() => (
    <div className="loading" key={uuid()}>
      {type === 'nft' ? (
        <img src={nftLoadingBg} alt="nft" key={uuid()} />
      ) : (
        <img src={loadingBg} alt="polymorph" key={uuid()} />
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
  ));
