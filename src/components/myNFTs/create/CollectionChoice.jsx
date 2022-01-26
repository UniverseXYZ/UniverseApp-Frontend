import React from 'react';
import PropTypes from 'prop-types';
import { getCollectionBackgroundColor } from '../../../utils/helpers';
import universeIcon from '../../../assets/images/universe-img.svg';
import checkIcon from '../../../assets/images/Completed.svg';

const CollectionChoice = ({ col, selectedCollection, setSelectedCollection }) => (
  <div className="collection-box">
    {selectedCollection && selectedCollection.id === col.id ? (
      <img className="check__icon" src={checkIcon} alt="selected" />
    ) : (
      <></>
    )}
    <div
      className={`universe${
        selectedCollection && selectedCollection.id === col.id ? ' selected' : ''
      }`}
      aria-hidden="true"
      onClick={() =>
        selectedCollection && selectedCollection.id === col.id
          ? setSelectedCollection(null)
          : setSelectedCollection(col)
      }
    >
      {col.address === process.env.REACT_APP_UNIVERSE_ERC_721_ADDRESS.toLowerCase() ? (
        <img src={universeIcon} alt={col.name} />
      ) : !col?.coverUrl ? (
        <div
          className="random__bg__color"
          style={{
            backgroundColor: getCollectionBackgroundColor(col),
          }}
        >
          {col.name.charAt(0)}
        </div>
      ) : (
        <div>
          <img src={col.coverUrl} alt={col.name} />
        </div>
      )}
      <h5 className="collection-name">{col.name}</h5>
      <p>{col.symbol}</p>
    </div>
    <div className="box--shadow--effect--block" />
  </div>
);

CollectionChoice.propTypes = {
  col: PropTypes.oneOfType([PropTypes.object]).isRequired,
  selectedCollection: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setSelectedCollection: PropTypes.func.isRequired,
};

export default CollectionChoice;
