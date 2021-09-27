import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import BundleDutchAuction from './BundleDutchAuction.jsx';
import SelectNfts from './SelectNfts.jsx';
import SingleItemsDutchAuction from './SingleItemsDutchAuction.jsx';
import AppContext from '../../../ContextAPI';

const DutchAuctionContainer = (props) => {
  const { sellNFTBundleDutchAuctionData } = useContext(AppContext);
  const { data, setData } = props;
  const [bundleData, setBundleData] = useState({
    startPrice: sellNFTBundleDutchAuctionData.startPrice || null,
    endPrice: sellNFTBundleDutchAuctionData.endPrice || null,
    priceType: sellNFTBundleDutchAuctionData.priceType || 'eth',
    bundleName: sellNFTBundleDutchAuctionData.bundleName || null,
    bundleDescription: sellNFTBundleDutchAuctionData.bundleDescription || null,
    switch: sellNFTBundleDutchAuctionData.switch || [],
    buyerAddress: sellNFTBundleDutchAuctionData.buyerAddress || null,
    endingPriceDate: sellNFTBundleDutchAuctionData.endingPriceDate || '',
    scheduleDate: sellNFTBundleDutchAuctionData.scheduleDate || '',
  });

  return (
    <div className="bundle--sell--container">
      {data.selectedItem !== 'single' ? (
        <>
          <BundleDutchAuction bundleData={bundleData} setBundleData={setBundleData} />
          <SelectNfts stepData={data} setStepData={setData} bundleData={bundleData} />
        </>
      ) : (
        <SingleItemsDutchAuction stepData={data} setStepData={setData} />
      )}
    </div>
  );
};

DutchAuctionContainer.propTypes = {
  data: PropTypes.shape({
    selectedItem: PropTypes.string,
    selectedMethod: PropTypes.string,
    settings: PropTypes.shape({}),
    summary: PropTypes.shape({}),
  }).isRequired,
  setData: PropTypes.func.isRequired,
};

export default DutchAuctionContainer;
