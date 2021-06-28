import React from 'react';
import PropTypes from 'prop-types';
import './NFTs.scss';
import picture from '../../assets/images/image.svg';
import checkIcon from '../../assets/images/check.svg';

const MyNFTs = (props) => {
  const { className, selected, ...rest } = props;
  return (
    <div className={`saved__nft__box ${selected ? 'selected' : ''}`}>
      <div
        className="saved__nft__box__image"
        //   onClick={() => handleSavedNfts(index)}
        aria-hidden="true"
      >
        <img className="preview-image" src={picture} alt="Preview" />
        {selected && (
          <>
            <img className="check__icon" src={checkIcon} alt="Check Icon" />
            {className === 'collection' && <span className="selected-number">10/15</span>}
          </>
        )}
      </div>
      <div className="saved__nft__box__name">
        <h3>NFT 1</h3>
        <button type="button" className="three__dots">
          <span />
          <span />
          <span />
        </button>
      </div>
      {className === 'collection' && (
        <div className="saved__nft__box__footer">
          <div className="collection__details">
            <>
              <img src={picture} alt="Collection" />
              <span>Collection name</span>
            </>
          </div>

          <div className="collection__count">x15</div>
        </div>
      )}
      {className === 'collection' && (
        <>
          <div className="saved__nft__box__highlight__one" />
          <div className="saved__nft__box__highlight__two" />
        </>
      )}
    </div>
  );
};

MyNFTs.propTypes = {
  className: PropTypes.string,
  selected: PropTypes.bool,
};
MyNFTs.defaultProps = {
  className: '',
  selected: null,
};

export default MyNFTs;
