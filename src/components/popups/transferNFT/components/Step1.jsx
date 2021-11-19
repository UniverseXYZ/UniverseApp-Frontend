import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Input from '../../../input/Input.jsx';
import Button from '../../../button/Button.jsx';
import { ChooseTokenIdDropdown } from './ChooseTokenIdDropdown.jsx';

export const Step1 = ({ close, nft, formik, showAmount, onSubmit }) => {
  const handleReceiverAddressChange = useCallback((e) => {
    formik.setFieldValue('receiverAddress', e.target.value);
  }, []);

  const handleTokenIdChange = useCallback((tokenId) => {
    formik.setFieldValue('tokenId', tokenId);
  }, []);

  const handleAmountChange = useCallback((e) => {
    formik.setFieldValue('amount', e.target.value);
  }, []);

  const handleContinueClick = useCallback(() => {
    if (formik.isValid) {
      onSubmit(formik.values);
    }
  }, [onSubmit, formik]);

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
            value={formik.values.receiverAddress}
            error={formik.touched?.receiverAddress && formik.errors?.receiverAddress}
            onChange={handleReceiverAddressChange}
            onBlur={() => formik.setFieldTouched('receiverAddress', true)}
            hoverBoxShadowGradient
          />
        </div>
        {nft.tokenIds.length > 1 && (
          <div className="receiver--address tokenID">
            <label>Choose token ID</label>
            <ChooseTokenIdDropdown
              tokenIds={nft.tokenIds}
              selectedTokenId={formik.values.tokenId}
              onSelect={handleTokenIdChange}
            />
          </div>
        )}
        {showAmount && (
          <div className="receiver--address">
            <label>Amount</label>
            <Input
              placeholder="e.g. 0x3v042b..."
              className="inp"
              value={formik.values.amount}
              error={formik.touched?.amount && formik.errors?.amount}
              onChange={handleAmountChange}
              onBlur={() => formik.setFieldTouched('amount')}
              hoverBoxShadowGradient
            />
          </div>
        )}
      </div>
      <div className="btn--actions">
        <Button className="light-border-button" onClick={close}>
          Cancel
        </Button>
        <Button className="light-button" disabled={!formik.isValid} onClick={handleContinueClick}>
          Continue
        </Button>
      </div>
    </div>
  );
};

Step1.propTypes = {
  close: PropTypes.func.isRequired,
  nft: PropTypes.oneOfType([PropTypes.object]).isRequired,
  formik: PropTypes.oneOfType([PropTypes.object]).isRequired,
  showAmount: PropTypes.oneOfType([PropTypes.bool]).isRequired,
  onSubmit: PropTypes.func.isRequired,
};
