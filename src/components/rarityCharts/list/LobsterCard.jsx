import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoadingImage from '../../general/LoadingImage';
import lobsterLoadingBg from '../../../assets/images/lobby-lobsters/img_placeholder.png';

const LobsterCard = ({ item }) => (
  <div
    className="card"
    onClick={() => window.open(`${window.location.origin}/lobsters/${item.id}`, '_blank').focus()}
    aria-hidden="true"
  >
    <div className="card--header">
      <div className="card--number">#???</div>
      <div className="card--price">Rarity Score: ????</div>
    </div>
    <div className="card--body">
      <LoadingImage
        className="rarity--chart"
        src={item.previewImage.url}
        alt={item.name}
        placeholderImage={lobsterLoadingBg}
      />
      {/* <img className="rarity--chart" src={item.previewImage.url} alt={item.name} /> */}
    </div>
    <div className="card--footer">
      <h2>Lobby Lobster</h2>
      <p>{`ID: #${item.id}`}</p>
    </div>
  </div>
);

LobsterCard.propTypes = {
  item: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default LobsterCard;
