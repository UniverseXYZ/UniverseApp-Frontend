import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import RarityRankPopup from '../../popups/RarityRankPopup.jsx';
import priceIcon from '../../../assets/images/eth-icon-new.svg';
import neverScrambledIcon from '../../../assets/images/never-scrambled-badge.svg';
import singleTraitScrambledIcon from '../../../assets/images/single-trait-scrambled-badge.svg';
import { getPolymorphMeta } from '../../../utils/api/polymorphs.js';
import { renderLoaders } from '../../../containers/rarityCharts/renderLoaders.js';

const PolymorphCard = ({ item, index }) => {
  const [loading, setLoading] = useState(false);

  const fetchMetadata = async () => {
    setLoading(true);
    const data = await getPolymorphMeta(item.tokenid);

    setLoading(false);
  };

  return loading ? (
    renderLoaders(1)
  ) : (
    <div className="card">
      <div className="card--header">
        <div className="card--number">{`#${item.rank}`}</div>
        <div className="card--price">{`Rarity Score: ${item.rarityscore}`}</div>
      </div>
      <div className="card--body">
        <Popup
          trigger={
            <img
              onError={fetchMetadata}
              className="rarity--chart"
              src={item.imageurl}
              alt={item.name}
            />
          }
        >
          {(close) => <RarityRankPopup onClose={close} item={item} />}
        </Popup>
        {item.scrambles === 0 && item.morphs > 0 ? (
          <div className="card--scrambled">
            <img alt="Single trait scrambled badge" src={singleTraitScrambledIcon} />
            <span className="tooltiptext">Single trait scrambled</span>
          </div>
        ) : item.isvirgin ? (
          <div className="card--scrambled">
            <img alt="Never scrambled badge" src={neverScrambledIcon} />
            <span className="tooltiptext">Never scrambled</span>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="card--footer">
        <h2>{item.character}</h2>
        <p>{`#${item.tokenid}`}</p>
      </div>
    </div>
  );
};

PolymorphCard.propTypes = {
  item: PropTypes.oneOfType([PropTypes.object]).isRequired,
  index: PropTypes.oneOfType([PropTypes.number]).isRequired,
};

export default PolymorphCard;
