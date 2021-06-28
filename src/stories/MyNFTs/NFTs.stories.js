import React from 'react';
import NFTs from './NFTs';

export default {
  title: 'Form/MyNFTs',
  component: NFTs,
};

export const CollectionNFT = () => <NFTs className="collection" />;
export const CollectionNFTSelected = () => <NFTs className="collection" selected />;
export const SingleNFT = () => <NFTs className="single" />;
export const SingleNFTSelected = () => <NFTs className="single" selected />;
