import React from 'react';
import uuid from 'react-uuid';
import loadingBg from '../../assets/images/mint-polymorph-loading-bg.png';

export const renderLoaders = (number) =>
  [...Array(number)].map(() =>
    React.memo(
      <div key={uuid()} className="card" style={{ cursor: 'default' }}>
        <div className="card--header">
          <div className="card--number">#???</div>
          <div className="card--price">Rarity Score: ???</div>
        </div>
        <div className="card--body">
          <img
            className="rarity--chart"
            style={{ cursor: 'default' }}
            src={loadingBg}
            alt="loader"
          />
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
    )
  );

export const renderLoaderWithData = (item) => (
  <div className="card" style={{ cursor: 'default' }}>
    <div className="card--header">
      <div className="card--number">#{item.rank}</div>
      <div className="card--price">Rarity Score: {item.rarityscore}</div>
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
      <h2>{item.character}</h2>
      <p>{`#${item.tokenid}`}</p>
    </div>
  </div>
);
