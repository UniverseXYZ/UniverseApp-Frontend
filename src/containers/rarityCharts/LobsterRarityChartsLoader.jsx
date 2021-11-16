import React from 'react';
import PropTypes from 'prop-types';
// import './RarityCharsLoader.scss';
// import './RarityCharts.scss';
import uuid from 'react-uuid';
import lobsterLoadingBg from '../../assets/images/lobby-lobsters/img_placeholder.png';

const LobsterRarityChartsLoader = React.memo(({ number }) =>
  [...Array(number)].map(() => (
    <div key={uuid()} className="card" style={{ cursor: 'default' }}>
      <div className="card--header">
        <div className="card--number">#???</div>
        <div className="card--price">Rarity Score: ???</div>
      </div>
      <div className="card--body">
        <img
          className="rarity--chart"
          style={{ cursor: 'default' }}
          src={lobsterLoadingBg}
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
  ))
);

LobsterRarityChartsLoader.propTypes = {
  number: PropTypes.number.isRequired,
};

export default LobsterRarityChartsLoader;
