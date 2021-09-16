import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import BundleSellForm from './BundleSellForm';
import SelectNfts from './SelectNfts';
import './styles/BundleSellFormContainer.scss';
import SingleItemsFixedListing from './SingleItemsFixedListing';
import AppContext from '../../ContextAPI';

const BundleSellFormContainer = (props) => {
  const { sellNFTBundleFixedListingData } = useContext(AppContext);
  const { data, setData } = props;
  const [bundleData, setBundleData] = useState({
    startPrice: sellNFTBundleFixedListingData.startPrice || null,
    priceType: sellNFTBundleFixedListingData.priceType || 'eth',
    bundleName: sellNFTBundleFixedListingData.bundleName || null,
    bundleDescription: sellNFTBundleFixedListingData.bundleDescription || null,
    switch: sellNFTBundleFixedListingData.switch || [],
    buyerAddress: sellNFTBundleFixedListingData.buyerAddress || null,
  });

  return (
    <div className="bundle--sell--container">
      {data.selectedItem !== 'single' ? (
        <>
          <BundleSellForm data={data} bundleData={bundleData} setBundleData={setBundleData} />
          <SelectNfts stepData={data} setStepData={setData} bundleData={bundleData} />
        </>
      ) : (
        <SingleItemsFixedListing stepData={data} setStepData={setData} />
      )}
    </div>
  );
};

BundleSellFormContainer.propTypes = {
  data: PropTypes.shape({
    selectedItem: PropTypes.string,
    selectedMethod: PropTypes.string,
    settings: PropTypes.shape({}),
    summary: PropTypes.shape({}),
  }).isRequired,
  setData: PropTypes.func.isRequired,
};

export default BundleSellFormContainer;
