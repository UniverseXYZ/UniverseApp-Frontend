import React from 'react';
import PropTypes from 'prop-types';
import warningIcon from '../../../assets/images/Exclamation.svg';
import './index.scss';

const DEFAULT_TEXT =
  'The auctions rewards need to be released first. Without this step, the auctioneer will not be able to collect his earnings and the bidders will not be able to claim their NFTs.';

const WarningSection = ({ text = DEFAULT_TEXT, mySlot }) => (
  <div className="warning_content">
    <div className="warning__div">
      <img src={warningIcon} alt="" />
      <p>{text}</p>
    </div>
  </div>
);

WarningSection.propTypes = {
  mySlot: PropTypes.oneOfType([PropTypes.object]).isRequired,
  text: PropTypes.node.isRequired,
};

export default WarningSection;
