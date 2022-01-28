import React from 'react';
import PropTypes from 'prop-types';
import './WinnerBox.scss';
import WinnerIcon from '../../../../assets/images/winner-icon.svg';

const WinnerBox = ({
  selectedWinnerIndex,
  selectedWinners,
  data,
  tierId,
  index,
  setSelectedWinners,
}) => (
  <div
    className={selectedWinnerIndex === index ? 'reward__winner-box selected' : 'reward__winner-box'}
    aria-hidden="true"
    key={index}
    onClick={() => setSelectedWinners({ ...selectedWinners, [tierId]: index })}
  >
    <img src={WinnerIcon} alt="winner-icon" />
    <p>Winner #{data.slot + 1}</p>
    <span>{data.nftsData?.length} NFTs</span>
    <div className="box--shadow--effect--block" />
  </div>
);

WinnerBox.propTypes = {
  selectedWinnerIndex: PropTypes.number.isRequired,
  selectedWinners: PropTypes.oneOfType([PropTypes.array]).isRequired,
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  tierId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  setSelectedWinners: PropTypes.func.isRequired,
};

export default WinnerBox;
