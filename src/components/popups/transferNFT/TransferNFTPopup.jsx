import React, { useState } from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../../../assets/images/close-menu.svg';
import './TransferNFTPopup.scss';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const TransferNFTPopup = ({ close, nft }) => {
  const [receiverAddress, setReceiverAddress] = useState('');
  const [step, setStep] = useState(1);

  return (
    <div className="transfer--nft--popup">
      <img
        className="close--popup"
        onClick={close}
        src={closeIcon}
        alt="Close"
        aria-hidden="true"
      />
      {step === 1 && (
        <Step1
          close={close}
          nft={nft}
          receiverAddress={receiverAddress}
          setReceiverAddress={setReceiverAddress}
          setStep={setStep}
        />
      )}
      {step === 2 && <Step2 close={close} />}
      {step === 3 && <Step3 close={close} receiverAddress={receiverAddress} />}
    </div>
  );
};

TransferNFTPopup.propTypes = {
  close: PropTypes.func.isRequired,
  nft: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default TransferNFTPopup;
