import React, { useState } from 'react';
import './CreateNFT.scss';
import { useHistory } from 'react-router-dom';
import arrow from '../../../assets/images/arrow.svg';
import settingIconActive from '../../../assets/images/settings-solid.svg';
import settingIcon from '../../../assets/images/setting-solid-disactive.svg';
import selectTypeIconActive from '../../../assets/images/select-type-icon-active.svg';
import selectTypeIcon from '../../../assets/images/select-type-icon.svg';
import SelectType from './SelectType';
import SingleNFTSettings from './SingleNFTSettings';
import NFTCollectionSettings from './NFTCollectionSettings';

const CreateNFT = () => {
  const history = useHistory();
  const [selectedTabIndex, setSelectedTabIndex] = useState(1);
  const [selectedNFTType, setSelectedNFTType] = useState('collection');

  const handleSelectTypeClick = () => {
    if (selectedTabIndex !== 0) {
      setSelectedTabIndex(0);
      setSelectedNFTType('');
    }
  };

  return (
    <div className="create--nft--page">
      <div className="create--nft--background" />
      <div className="create--nft--page--container">
        <div className="back-btn" onClick={() => history.push('/my-nfts')} aria-hidden="true">
          <img src={arrow} alt="back" />
          <span>My NFTs</span>
        </div>
        <h1 className="page--title">Create NFT</h1>
        <div className="tabs__wrapper">
          <div className="tabs">
            <div className="tab_items">
              <div
                id="tabsdiv"
                className={selectedTabIndex === 0 ? 'active' : ''}
                onClick={handleSelectTypeClick}
                aria-hidden="true"
              >
                <span className="first-triangle" />
                <button type="button">
                  <img
                    src={selectedTabIndex === 0 ? selectTypeIconActive : selectTypeIcon}
                    alt="setting-icon"
                  />
                  Select type
                </button>
                <span className="last-triangle" />
              </div>
              <div
                id="tabsdiv"
                className={`
                  ${selectedTabIndex === 1 ? 'active' : ''}
                  ${selectedTabIndex === 0 ? 'disabled' : ''}
                `}
              >
                <span className="first-triangle" />
                <button type="button">
                  <img
                    src={selectedTabIndex === 1 ? settingIconActive : settingIcon}
                    alt="setting-icon"
                  />
                  Settings
                </button>
                <span className="last-triangle" />
              </div>
            </div>
          </div>
        </div>
        <div className="tab__content">
          {selectedTabIndex === 0 && (
            <SelectType
              setSelectedTabIndex={setSelectedTabIndex}
              setSelectedNFTType={setSelectedNFTType}
            />
          )}
          {selectedTabIndex === 1 && selectedNFTType === 'single' && <SingleNFTSettings />}
          {selectedTabIndex === 1 && selectedNFTType === 'collection' && <NFTCollectionSettings />}
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
