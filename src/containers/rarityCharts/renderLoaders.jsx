import React from 'react';
import uuid from 'react-uuid';
import loadingBg from '../../assets/images/mint-polymorph-loading-bg.png';

export const renderLoaders = (number) =>
  [...Array(number)].map(() => (
    <div className="loading" key={uuid()}>
      <img src={loadingBg} alt="polymorph" key={uuid()} />
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
