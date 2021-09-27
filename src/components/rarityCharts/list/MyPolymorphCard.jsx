import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import RarityRankPopup from '../../popups/RarityRankPopup.jsx';
import { getPolymorphMeta } from '../../../utils/api/polymorphs.js';
import { renderLoaderWithData } from '../../../containers/rarityCharts/renderLoaders.js';

const PolymorphCard = ({ item }) => {
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
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
      onClick={() =>
        window.open(`${window.location.origin}/polymorphs/${item.id}`, '_blank').focus()
      }
      aria-hidden="true"
    >
      <div className="card--header">
        <div className="card--number">{`#${item.rank}`}</div>
        <div className="card--price">{`Rarity Score: ${item.rarityscore}`}</div>
      </div>
      <div className="card--body">
        <img
          onError={fetchMetadata}
          className="rarity--chart"
          src={item.imageurl}
          alt={item.name}
        />
      </div>
      <div className="card--footer">
        <h2>Lobby Lobster</h2>
        <p>{`ID: #${item.tokenid}`}</p>
      </div>
      <Popup open={showPopup}>
        <RarityRankPopup onClose={() => setShowPopup(false)} item={item} />
      </Popup>
    </div>
  );
};

PolymorphCard.propTypes = {
  item: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default PolymorphCard;
