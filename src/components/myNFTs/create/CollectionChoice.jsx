import React from 'react';
import PropTypes from 'prop-types';
import { getCollectionBackgroundColor } from '../../../utils/helpers';

const CollectionChoice = ({ col, selectedCollection, setSelectedCollection }) => (
  <div className="collection-box">
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
      {!col?.coverUrl ? (
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
      <p>{col.tokenName}</p>
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
