import React, { useState } from 'react';
import CollectionName from '../../components/sellNFT/CollectionName';
import SellNFTContainer from '../../components/sellNFT/SellNFTContainer';
import NFTMarketplaceTab from '../../components/tabs/NFTMarketplaceTab';
import collectionImg from '../../assets/images/collection-img.png';
import SetPrice from '../../components/sellNFT/SetPriceTabContent';
import HighestBid from '../../components/sellNFT/HighestBidTabContent';
import Bundle from '../../components/sellNFT/BundleTabContent';
import Submenu from '../../components/submenu/Submenu';
import SummaryBlock from '../../components/sellNFT/SummaryBlock';
import './NFTMarketplace.scss';

const headerTabLabels = [
  { className: '', label: 'Set price', hintText: 'Sell at fixed or declining price' },
  { className: '', label: 'Highest bid', hintText: 'Auction to the highest bidder' },
  { className: '', label: 'Bundle', hintText: 'Group this item with others to sell' },
];

const NFTMarketplace = () => {
  const [startPrice, setStartPrice] = useState('');
  const [endPrice, setEndPrice] = useState('');
  const [priceType, setPriceType] = useState('eth');
  const [formType, setFormType] = useState(null);
  const contents = [
    {
      index: 0,
      component: (
        <SetPrice
          startPrice={startPrice}
          setStartPrice={setStartPrice}
          endPrice={endPrice}
          setEndPrice={setEndPrice}
          priceType={priceType}
          setPriceType={setPriceType}
          setFormType={setFormType}
        />
      ),
    },
    { index: 1, component: <HighestBid /> },
    { index: 2, component: <Bundle /> },
  ];
  return (
    <div className="nft--marketplace">
      <Submenu title="NFT Marketplace" subtitles={['Browse NFTs', 'Activity']} />
      <CollectionName image={collectionImg} name="NFT name" price="0.5" />
      <SellNFTContainer title="Select your sell method" contentClassName="content--marketplace">
        <NFTMarketplaceTab headerLabels={headerTabLabels} contents={contents} />
        <SummaryBlock startPrice={startPrice} endPrice={endPrice} formType={formType} />
      </SellNFTContainer>
    </div>
  );
};

export default NFTMarketplace;
