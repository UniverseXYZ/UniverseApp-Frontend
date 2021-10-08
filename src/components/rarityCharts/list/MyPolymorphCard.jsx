import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import { useHistory } from 'react-router';
import RarityRankPopup from '../../popups/RarityRankPopup.jsx';
import { getPolymorphMeta } from '../../../utils/api/polymorphs.js';
import { renderLoaderWithData } from '../../../containers/rarityCharts/renderLoaders.js';

const MyPolymorphCard = ({ item }) => {
  const history = useHistory();
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
      onClick={() => history.push(`/polymorphs/${item.tokenid}`)}
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
    </div>
  );
};

MyPolymorphCard.propTypes = {
  item: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default MyPolymorphCard;
