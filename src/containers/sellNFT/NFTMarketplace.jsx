import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SellNftSubHeader from '../../components/sellNftNew/SellNftSubHeader';
import StepTabs from '../../components/sellNftNew/StepTabs';
import SelectSellMethodTab from '../../components/sellNftNew/SelectSellMethodTab';
import RewardIconActive from '../../assets/images/ion_layers.svg';
import RewardIcon from '../../assets/images/ion_layers-disactive.svg';
import ReviewIcon from '../../assets/images/eye-review.svg';
import ReviewIconActive from '../../assets/images/eye-review-disactive.svg';
import SettingIconActive from '../../assets/images/settings-solid.svg';
import SettingIcon from '../../assets/images/setting-solid-disactive.svg';
import AppContext from '../../ContextAPI';
import DutchAuctionSettingsForm from '../../components/sellNftNew/DutchAuctionSettingsForm';
import EnglishAuctionSettingsForm from '../../components/sellNftNew/EnglishAuctionSettingsForm';
import BundleSellFormContainer from '../../components/sellNftNew/BundleSellFormContainer';
import Summary from '../../components/sellNftNew/Summary';
import nftImage from '../../assets/images/marketplace/nfts/nft13.png';
import './NFTMarketplace.scss';
import { useMarketplaceContext } from '../../contexts/MarketplaceContext';

const verificationSteps = (data) => {
  const keys = Object.keys(data);
  for (let i = 0; i < keys.length; i += 1) {
    if (data[keys[i]] === null) {
      return i;
    }
  }
  return keys.length - 1;
};

const getContent = (type, data, setData) => {
  if (type === 'dutch') return <DutchAuctionSettingsForm data={data} setData={setData} />;
  if (type === 'english') return <EnglishAuctionSettingsForm data={data} setData={setData} />;
  if (type === 'bundle') return <BundleSellFormContainer data={data} setData={setData} />;
  return <h1>other type</h1>;
};

const NFTMarketplace = () => {
  const location = useLocation();
  const { stepsData, setStepsData } = useMarketplaceContext();

  const headerLabels = [
    {
      label: 'Select sell method',
      icon: RewardIcon,
      activeIcon: RewardIconActive,
      link: '/nft-marketplace/select-method',
      index: 0,
      content: <SelectSellMethodTab onSelect={setStepsData} data={stepsData} />,
      home: true,
    },
    {
      label: 'Settings',
      icon: SettingIcon,
      activeIcon: SettingIconActive,
      link: '/nft-marketplace/settings',
      index: 1,
      content: getContent(stepsData.selectedMethod, stepsData, setStepsData),
      home: false,
    },
    {
      label: 'Summary',
      icon: ReviewIcon,
      activeIcon: ReviewIconActive,
      link: '/nft-marketplace/summary',
      index: 2,
      content: <Summary nftImage={nftImage} data={stepsData} />,
      home: false,
    },
  ];

  return (
    <div className="nft--marketplace">
      <SellNftSubHeader backPageName="NFT name" title="Sell NFT" />
      <StepTabs tabData={headerLabels} verificationSteps={verificationSteps(stepsData)} required />
      {location.pathname === '/nft-marketplace/select-method' && (
        <div className="before--footer--black--bg--section" />
      )}
    </div>
  );
};

export default NFTMarketplace;
