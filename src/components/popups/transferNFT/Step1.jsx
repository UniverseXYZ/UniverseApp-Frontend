import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EthereumAddress from 'ethereum-address';
import Input from '../../input/Input.jsx';
import Button from '../../button/Button.jsx';
import ChooseTokenIdDropdown from './ChooseTokenIdDropdown.jsx';

const Step1 = ({ close, nft, receiverAddress, setReceiverAddress, setStep }) => {
  const [receiverAddressError, setReceiverAddressError] = useState('');

  const handleReceiverAddressChange = (e) => {
    setReceiverAddress(e.target.value);
    if (e.target.value) {
      setReceiverAddressError('');
      if (!EthereumAddress.isAddress(e.target.value)) {
        setReceiverAddressError('Wallet address is not valid');
      } else {
        setReceiverAddressError('');
      }
    } else {
      setReceiverAddressError('This field can’t be empty');
    }
  };

  const handleContinueClick = () => {
    if (!receiverAddress) {
      setReceiverAddressError('This field can’t be empty');
    } else {
      setStep(2);
      setTimeout(() => {
        setStep(3);
      }, 3000);
    }
  };

  return (
    <div className="step1">
      <h1 className="title">Transfer</h1>
      <p className="desc">You can transfer NFT to another address</p>
      <div className="form">
        <div className="receiver--address">
          <label>Receiver address</label>
          <Input
            placeholder="e.g. 0x3v042b..."
            className="inp"
            value={receiverAddress}
            onChange={handleReceiverAddressChange}
            error={receiverAddressError}
            hoverBoxShadowGradient
          />
        </div>
        {nft.tokenIds.length > 1 && (
          <div className="tokenID">
            <label>Choose token ID</label>
            <ChooseTokenIdDropdown nft={nft} />
          </div>
        )}
      </div>
      <div className="btn--actions">
        <Button className="light-border-button" onClick={close}>
          Cancel
        </Button>
        <Button
          className="light-button"
          disabled={receiverAddressError}
          onClick={handleContinueClick}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

Step1.propTypes = {
  close: PropTypes.func.isRequired,
  nft: PropTypes.oneOfType([PropTypes.object]).isRequired,
  receiverAddress: PropTypes.string.isRequired,
  setReceiverAddress: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
};

export default Step1;
