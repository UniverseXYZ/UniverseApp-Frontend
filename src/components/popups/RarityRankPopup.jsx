import React from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../../assets/images/close-menu.svg';
import neverScrumbledIcon from '../../assets/images/never-scrambled-badge.svg';
import scrumbledIcon from '../../assets/images/single-trait-scrambled-badge.svg';
import bluePuzzle from '../../assets/images/blue-puzzle.svg';
import pinkPuzzle from '../../assets/images/pink-puzzle.svg';

const RarityRankPopup = ({ onClose, item }) => {
  const variable = '';
  return (
    <div className="rarity--rank--popup">
      <img src={closeIcon} alt="Close" className="close" onClick={onClose} aria-hidden="true" />
      <div className="rarity--rank">
        <div className="rarity--rank--image">
          {item.scrambled === 'single' ? (
            <div className="never--scrumbled">
              <img src={scrumbledIcon} alt="Single trait scrambled badge" />
              <span className="tooltiptext">Single trait scrambled</span>
            </div>
          ) : (
            <div className="never--scrumbled">
              <img src={neverScrumbledIcon} alt="Never scrambled badge" />
              <span className="tooltiptext">Never scrambled</span>
            </div>
          )}
          <img src={item.previewImage.url} alt={item.name} />
        </div>
        <div className="rarity--rank--body">
          <div className="rarity--rank--header">
            <div>
              <h1>{`Rarity Rank #${item.id}`}</h1>
              <h2>{item.name}</h2>
            </div>
            <p className="number">{`#${item.serialNumber}`}</p>
          </div>
          <div className="rarity--rank--descriptions">
            <div className="rarity--description">
              <h4>Base Character</h4>
              <h3>Marigunana</h3>
              <p className="description">28% have this trait</p>
            </div>
            <div className="rarity--description selected">
              <div className="matching">
                <img src={bluePuzzle} alt="Blue" />
                <span className="tooltiptext">Matching trait</span>
              </div>
              <h4>Headwear</h4>
              <h3>Marine Helemt</h3>
              <p className="description">58% have this trait</p>
            </div>
            <div className="rarity--description">
              <h4>Eyewear</h4>
              <h3>Bar Shades</h3>
              <p className="description">58% have this trait</p>
            </div>
            <div className="rarity--description selected">
              <div className="matching">
                <img src={pinkPuzzle} alt="Pink" />
                <span className="tooltiptext">Matching trait</span>
              </div>
              <h4>Footwear</h4>
              <h3>Brown Spartan Sandals</h3>
              <p className="description">58% have this trait</p>
            </div>
            <div className="rarity--description selected">
              <div className="matching">
                <img src={bluePuzzle} alt="Blue" />
                <span className="tooltiptext">Matching trait</span>
              </div>
              <h4>Torso</h4>
              <h3>Golden Jacket</h3>
              <p className="description">58% have this trait</p>
            </div>
            <div className="rarity--description selected">
              <div className="matching">
                <img src={pinkPuzzle} alt="Pink" />
                <span className="tooltiptext">Matching trait</span>
              </div>
              <h4>Pants</h4>
              <h3>Classic Plaid Pants</h3>
              <p className="description">58% have this trait</p>
            </div>
            <div className="rarity--description">
              <h4>Left-hand accessory</h4>
              <h3>No Left-Hand Accessory</h3>
              <p className="description">58% have this trait</p>
            </div>
            <div className="rarity--description selected">
              <div className="matching">
                <img src={pinkPuzzle} alt="Pink" />
                <span className="tooltiptext">Matching trait</span>
              </div>
              <h4>Right-hand accessory</h4>
              <h3>Blue Degen Sword</h3>
              <p className="description">58% have this trait</p>
            </div>
            <div className="rarity--description">
              <h4>Background</h4>
              <h3>Happy Fisher</h3>
              <p className="description">58% have this trait</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
RarityRankPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  item: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
export default RarityRankPopup;
