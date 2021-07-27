import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BundleSellForm from './BundleSellForm';
import SelectNfts from './SelectNfts';
import './styles/BundleSellFormContainer.scss';

const BundleSellFormContainer = (props) => {
  const { data, setData } = props;
  const [bundleformData, setBundleFormData] = useState(null);
  const [continueBtnDisabled, setContinueBtnDisabled] = useState(true);
  useEffect(() => {
    if (bundleformData !== null) {
      setContinueBtnDisabled(false);
    } else setContinueBtnDisabled(true);
  }, [bundleformData]);

  return (
    <div className="bundle--sell--container">
      <BundleSellForm getData={setBundleFormData} />
      <SelectNfts continueBtnDisabled={continueBtnDisabled} stepData={data} setStepData={setData} />
    </div>
  );
};

BundleSellFormContainer.propTypes = {
  data: PropTypes.shape({
    selectedMethod: PropTypes.string,
    settings: PropTypes.shape({}),
    summary: PropTypes.shape({}),
  }).isRequired,
  setData: PropTypes.func.isRequired,
};

export default BundleSellFormContainer;
