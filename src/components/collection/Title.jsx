import React from 'react';
import PropTypes from 'prop-types';
import { getEtherscanContractUrl } from '../../utils/helpers';
import currencyIcon from '../../assets/images/eth-icon-new.svg';

const Title = ({ selectedCollection, nftsCount, ownersCount }) => {
  const NFTSCount = nftsCount >= 1000 ? `${nftsCount / 1000}K` : nftsCount;

  return (
    <div className="collection__info">
      <div className="collection__name__desc">
        <h1 title={selectedCollection.name}>{selectedCollection.name}</h1>
      </div>
      <h2
        className="token"
        onClick={() => {
          const url = getEtherscanContractUrl(selectedCollection.address);
          window.open(url, '_blank').focus();
        }}
        aria-hidden
      >
        {`${selectedCollection.address.substring(0, 13)}...${selectedCollection.address.substring(
          27,
          selectedCollection.address.length
        )}`}
      </h2>
      <div className="item_info">
        <div className="bordered">
          <h1>{NFTSCount}</h1>
          <span>items</span>
        </div>
        <div className="bordered">
          <h1>{ownersCount}</h1>
          <span>owners</span>
        </div>
        <div>
          <h1>
            <img src={currencyIcon} alt="Currency" />0
          </h1>
          <span>volume traded</span>
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
