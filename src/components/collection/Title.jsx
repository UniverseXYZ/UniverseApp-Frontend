import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ selectedCollection, nftsCount, ownersCount }) => {
  const NFTSCount = nftsCount >= 1000 ? `${nftsCount / 1000}K` : nftsCount;
  return (
    <div className="collection__info">
      <div className="collection__name__desc">
        <h1 title={selectedCollection.name}>
          {selectedCollection.name.length > 15
            ? `${selectedCollection.name.substring(0, 15)}...`
            : selectedCollection.name}
        </h1>
      </div>
      <h2 className="token">{selectedCollection.address}</h2>
      <div className="item_info">
        <div className="bordered">
          <h1>{NFTSCount}</h1>
          <span>items</span>
        </div>
        <div className="bordered">
          {ownersCount ? (
            <>
              <h1>{ownersCount}</h1>
              <span>owners</span>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

Title.propTypes = {
  selectedCollection: PropTypes.oneOfType([PropTypes.object]).isRequired,
  nftsCount: PropTypes.number.isRequired,
  ownersCount: PropTypes.number,
};

Title.defaultProps = {
  ownersCount: 0,
};

export default Title;
