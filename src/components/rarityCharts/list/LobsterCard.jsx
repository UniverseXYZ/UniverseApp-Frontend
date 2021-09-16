import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import RarityRankPopup from '../../popups/RarityRankPopup.jsx';
import priceIcon from '../../../assets/images/eth-icon-new.svg';
import neverScrambledIcon from '../../../assets/images/never-scrambled-badge.svg';
import singleTraitScrambledIcon from '../../../assets/images/single-trait-scrambled-badge.svg';
import { getPolymorphMeta } from '../../../utils/api/polymorphs.js';
import { renderLoaderWithData } from '../../../containers/rarityCharts/renderLoaders.js';
import loadingBg from '../../../assets/images/mint-polymorph-loading-bg.png';

const LobsterCard = ({ item }) => {
  const [loading, setLoading] = useState(false);
  const fetchMetadata = async () => {
    setLoading(true);
    const data = await getPolymorphMeta(item.tokenid);

    setLoading(false);
  };

  return loading ? (
    renderLoaderWithData(item)
  ) : (
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
        <img
          onError={fetchMetadata}
          className="rarity--chart"
          src={item.previewImage.url}
          alt={item.name}
        />
      </div>
      <div className="card--footer">
        <h2>Lobby Lobster</h2>
        <p>{`ID: #${item.id}`}</p>
      </div>
    </div>
  );
};

LobsterCard.propTypes = {
  item: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default LobsterCard;
