import React from 'react';
import PropTypes from 'prop-types';
import './WinnerBox.scss';
import WinnerIcon from '../../../../assets/images/winner-icon.svg';

const WinnerBox = ({ winnerNumber, tierId, nftsCount, setSelectedWinners, activeClass, index }) => (
  <div
    className={activeClass ? 'reward__winner-box selected' : 'reward__winner-box'}
    aria-hidden="true"
    onClick={() => setSelectedWinners({ [tierId]: index })}
  >
    <img src={WinnerIcon} alt="winner-icon" />
    <p>Winner #{winnerNumber}</p>
    <span>{nftsCount} NFTs</span>
    <div className="box--shadow--effect--block" />
  </div>
);

WinnerBox.propTypes = {
  tierId: PropTypes.string.isRequired,
  setSelectedWinners: PropTypes.func.isRequired,
  winnerNumber: PropTypes.number.isRequired,
  nftsCount: PropTypes.number.isRequired,
  activeClass: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};

export default WinnerBox;
