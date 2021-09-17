import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import BundleEnglishAuction from './BundleEnglishAuction.jsx';
import SelectNfts from './SelectNfts.jsx';
import SingleItemsEnglishAuction from './SingleItemsEnglishAuction.jsx';
import AppContext from '../../../ContextAPI';

const EnglishAuctionContainer = (props) => {
  const { sellNFTBundleEnglishAuctionData } = useContext(AppContext);
  const { data, setData } = props;
  const [bundleData, setBundleData] = useState({
    startPrice: sellNFTBundleEnglishAuctionData.startPrice || null,
    endPrice: sellNFTBundleEnglishAuctionData.endPrice || null,
    date: sellNFTBundleEnglishAuctionData.date || null,
    priceType: sellNFTBundleEnglishAuctionData.priceType || 'eth',
    bundleName: sellNFTBundleEnglishAuctionData.bundleName || null,
    bundleDescription: sellNFTBundleEnglishAuctionData.bundleDescription || null,
  });

  return (
    <div className="bundle--sell--container">
      {data.selectedItem !== 'single' ? (
        <>
          <BundleEnglishAuction bundleData={bundleData} setBundleData={setBundleData} />
          <SelectNfts stepData={data} setStepData={setData} bundleData={bundleData} />
        </>
      ) : (
        <SingleItemsEnglishAuction stepData={data} setStepData={setData} />
      )}
    </div>
  );
};

EnglishAuctionContainer.propTypes = {
  data: PropTypes.shape({
    selectedItem: PropTypes.string,
    selectedMethod: PropTypes.string,
    settings: PropTypes.shape({}),
    summary: PropTypes.shape({}),
  }).isRequired,
  setData: PropTypes.func.isRequired,
};

export default EnglishAuctionContainer;
