import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import cardImage from '../../assets/images/polymorph-card.png';
import icon from '../../assets/images/CollectionIcon.png';
import './PolymorphCard.scss';
import scrambledIcon from '../../assets/images/never-scrambled-badge.svg';
import { CHOOSE_POLYMORPH_CARD } from '../../utils/fixtures/ChoosePolymorphCardDummyData';

const PolymorphCard = ({ rarity }) => {
  const history = useHistory();
  return (
    <li>
      <div className="polymorph--card">
        <div className="polymorph--card--header--section">
          <span>#{rarity.rarityNumber}</span>
          <h3>Rarity score: {rarity.rarityScore}</h3>
        </div>
        <div className="polymorph--card--middle--section">
          <img src={rarity.previewImage.url} alt="polymorph" />
          <div className="single--icon">
            <img src={rarity.typeIcon} alt="single" />
          </div>
        </div>
        <div className="polymorph--card--footer--section">
          <div className="title--section">
            <h1>{rarity.name}</h1>
            <h2>ID: #{rarity.polymorphID}</h2>
          </div>
          <div className="icon--section">
            <span>
              <img src={rarity.collectionAvatar} alt="icon" />
              <p>{rarity.collectionName}</p>
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};

PolymorphCard.propTypes = {
  rarity: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default PolymorphCard;
