import React from 'react';
import uuid from 'react-uuid';
import loadingBg from '../../assets/images/mint-polymorph-loading-bg.png';

export const renderLoaders = (number) =>
  [...Array(number)].map(() => (
    <div className="card" style={{ cursor: 'default' }}>
      <div className="card--header">
        <div className="card--number">#???</div>
        <div className="card--price">Rarity Score: ???</div>
      </div>
      <div className="card--body">
        <img className="rarity--chart" style={{ cursor: 'default' }} src={loadingBg} alt="loader" />
        <div className="card-lds-roller">
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
      <div className="card--footer">
        <h2>?????</h2>
        <p>#?????</p>
      </div>
    </div>
  ));
