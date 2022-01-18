import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../button/Button';
import congratsIcon from '../../../../assets/images/bid-submitted.png';

export const Step3 = ({ close, receiverAddress }) => (
  <div className="step3">
    <div className="congrats--icon">
      <img src={congratsIcon} alt="Congrats" />
    </div>
    <h4 className="title">Success!</h4>
    <p className="desc">
      NFT was successfully sent to <br />
      <span>{`${receiverAddress.substring(0, 13)}...${receiverAddress.substring(
        27,
        receiverAddress.length
      )}`}</span>
    </p>
    <div className="btn--actions">
      <Button className="light-border-button" onClick={close}>
        Close
      </Button>
    </div>
  </div>
);

Step3.propTypes = {
  close: PropTypes.func.isRequired,
  receiverAddress: PropTypes.string.isRequired,
};
