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
import SelectItemsMethodTab from '../../components/sellNftNew/SelectItemsMethodTab';
import NewTabs from '../../components/tabs/NewTabs';

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
  const { stepsData, setStepsData, setDarkMode } = useContext(AppContext);

  const headerLabels = [
    {
      labelText: 'Select items',
      icon: RewardIcon,
      iconActive: RewardIconActive,
      route: '/nft-marketplace/select-items',
      index: 0,
      content: <SelectItemsMethodTab onSelect={setStepsData} data={stepsData} />,
      home: true,
    },
    {
      labelText: 'Select sell method',
      icon: RewardIcon,
      iconActive: RewardIconActive,
      route: '/nft-marketplace/select-method',
      index: 1,
      content: <SelectSellMethodTab onSelect={setStepsData} data={stepsData} />,
      home: false,
    },
    {
      labelText: 'Settings',
      icon: SettingIcon,
      iconActive: SettingIconActive,
      route: '/nft-marketplace/settings',
      index: 2,
      content: getContent(stepsData.selectedMethod, stepsData, setStepsData),
      home: false,
    },
    {
      labelText: 'Summary',
      icon: ReviewIcon,
      iconActive: ReviewIconActive,
      route: '/nft-marketplace/summary',
      index: 3,
      content: <Summary nftImage={nftImage} data={stepsData} />,
      home: false,
    },
  ];

  useEffect(() => {
    setDarkMode(false);
  }, []);

  return (
    <div className="nft--marketplace">
      <SellNftSubHeader backPageName="NFT name" title="Sell NFT" />
      <NewTabs tabData={headerLabels} />
      {/* <StepTabs tabData={headerLabels} verificationSteps={verificationSteps(stepsData)} required /> */}
      {location.pathname === '/nft-marketplace/select-items' && (
        <div className="before--footer--black--bg--section" />
      )}
    </div>
  );
};

export default NFTMarketplace;
