import React from 'react';
import PropTypes from 'prop-types';
import './WinnerBox.scss';
import WinnerIcon from '../../../../assets/images/winner-icon.svg';

const WinnerBox = ({ selectedWinner, data, tierId, index, setSelectedWinners }) => (
  <div
    className={selectedWinner === index ? 'reward__winner-box selected' : 'reward__winner-box'}
    aria-hidden="true"
    key={index}
    onClick={() => setSelectedWinners({ ...selectedWinner, [tierId]: index })}
  >
    <img src={WinnerIcon} alt="winner-icon" />
    <p>Winner #{data.slot + 1}</p>
    <span>{data.nftsData?.length} NFTs</span>
    <div className="box--shadow--effect--block" />
  </div>
);

WinnerBox.propTypes = {
  selectedWinner: PropTypes.number.isRequired,
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  tierId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  setSelectedWinners: PropTypes.func.isRequired,
};

export default WinnerBox;
