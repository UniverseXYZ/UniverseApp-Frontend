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
        <div className="card--number">{`#${item.rarityRank}`}</div>
        <div className="card--price">{`Rarity Score: ${item.rarityScore}`}</div>
      </div>
      <div className="card--body">
        <img
          className="rarity--chart"
          src={item.previewImage.url}
          alt={item.name}
          aria-hidden="true"
          onClick={() => {
            setSelectedNftForScramble(item);
            history.push(
              item.type === 'polymorph' ? `/polymorphs/${item.id}` : `/lobsters/${item.id}`
            );
          }}
        />
        {/* <Popup
          trigger={<img className="rarity--chart" src={item.previewImage.url} alt={item.name} />}
        >
          {(close) => <RarityRankPopup onClose={close} item={item} />}
        </Popup> */}
        {item.scrambled === 'single' && (
          <div className="card--scrambled">
            <img alt="Single trait scrambled badge" src={singleTraitScrambledIcon} />
            <span className="tooltiptext">Single trait scrambled</span>
          </div>
        )}
        {item.scrambled === 'never' && (
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
          <img alt={item.collectionName} src={item.collectionAvatar} />
          <p>{item.collectionName}</p>
        </div>
      </div>
    </div>
  );
};

PolymorphCard.propTypes = {
  item: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default PolymorphCard;
