import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';
import RarityRankPopup from '../../popups/RarityRankPopup.jsx';
import priceIcon from '../../../assets/images/eth-icon-new.svg';
import neverScrambledIcon from '../../../assets/images/never-scrambled-badge.svg';
import singleTraitScrambledIcon from '../../../assets/images/single-trait-scrambled-badge.svg';
import AppContext from '../../../ContextAPI.js';

const PolymorphCard = ({ item }) => {
  const { setSelectedNftForScramble } = useContext(AppContext);
  const history = useHistory();

  return (
    <div className="card">
      <div className="card--header">
        <div className="card--number">{`#${item.id}`}</div>
        <div className="card--price">{`Rarity Score: ${item.rarityScore}`}</div>
      </div>
      <div className="card--body">
        <img
          className="rarity--chart"
          src={item?.thumbnail_url}
          alt={item.name}
          aria-hidden="true"
          onClick={() => {
            setSelectedNftForScramble(item);
            history.push(`/polymorphs/${item.id}`);
          }}
        />
        {/* <Popup
          trigger={<img className="rarity--chart" src={item.thumbnail_url} alt={item.name} />}
        >
          {(close) => <RarityRankPopup onClose={close} item={item} />}
        </Popup> */}
        {item.scrambled === 'single' ? (
          <div className="card--scrambled">
            <img alt="Single trait scrambled badge" src={singleTraitScrambledIcon} />
            <span className="tooltiptext">Single trait scrambled</span>
          </div>
        ) : (
          <div className="card--scrambled">
            <img alt="Never scrambled badge" src={neverScrambledIcon} />
            <span className="tooltiptext">Never scrambled</span>
          </div>
        )}
      </div>
      <div className="card--footer">
        <div className="name--id">
          <h2>{item.name}</h2>
          <p>{`ID: #${item.polymorphID}`}</p>
        </div>
        <div className="polymorph--collection">
          {item.collection.coverUrl && (
            <img alt={item.collection.name} src={item.collection.coverUrl} />
          )}
          <p>{item.collection.name}</p>
        </div>
      </div>
    </div>
  );
};

PolymorphCard.propTypes = {
  item: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default PolymorphCard;
