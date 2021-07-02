import React from 'react';
import CollectionName from '../../components/sellNFT/CollectionName';
import SellNFTContainer from '../../components/sellNFT/SellNFTContainer';
import NFTMarketplaceTab from '../../components/tabs/NFTMarketplaceTab';
import collectionImg from '../../assets/images/collection-img.png';
import SetPrice from '../../components/sellNFT/SetPriceTabContent';
import HighestBid from '../../components/sellNFT/HighestBidTabContent';
import Bundle from '../../components/sellNFT/BundleTabContent';
import './NFTMarketplace.scss';

const headerTabLabels = [
  { className: '', label: 'Set price', hintText: 'Sell at fixed or declining price' },
  { className: '', label: 'Highest bid', hintText: 'Auction to the highest bidder' },
  { className: '', label: 'Bundle', hintText: 'Group this item with others to sell' },
];

const contents = [
  { index: 0, component: <SetPrice /> },
  { index: 1, component: <HighestBid /> },
  { index: 2, component: <Bundle /> },
];

const NFTMarketplace = () => (
  <div className="nft--marketplace">
    <CollectionName image={collectionImg} name="NFT name" price="0.5" />
    <SellNFTContainer title="Select your sell method" contentClassName="content--marketplace">
      <NFTMarketplaceTab headerLabels={headerTabLabels} contents={contents} />
    </SellNFTContainer>
  </div>
);

export default NFTMarketplace;
