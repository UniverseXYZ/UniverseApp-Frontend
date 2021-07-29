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
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [selectedNFTType, setSelectedNFTType] = useState('');
  const [showCollectible, setShowCollectible] = useState(false);

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
        {!showCollectible ? (
          <div className="back-btn" onClick={() => history.push('/my-nfts')} aria-hidden="true">
            <img src={arrow} alt="back" />
            <span>My NFTs</span>
          </div>
        ) : (
          <div className="back-btn" onClick={() => setShowCollectible(false)} aria-hidden="true">
            <img src={arrow} alt="back" />
            <span>NFT collection settings</span>
          </div>
        )}
        <h1 className="page--title">
          {selectedTabIndex === 0 ||
          (selectedTabIndex === 1 && selectedNFTType === 'single') ||
          (selectedTabIndex === 1 && selectedNFTType === 'collection' && showCollectible)
            ? 'Create NFT'
            : 'Create NFT collection'}
        </h1>
        {!showCollectible && (
          <div id="tabs--wrapper">
            <ul className="tabs">
              <li
                className={selectedTabIndex === 0 ? 'active' : ''}
                onClick={handleSelectTypeClick}
                aria-hidden="true"
              >
                {selectedTabIndex === 1 && <div className="box--shadow--effect--block" />}
                <img
                  src={selectedTabIndex === 0 ? selectTypeIconActive : selectTypeIcon}
                  alt="Select type"
                />
                Select type
              </li>
              <li
                className={`
                    ${selectedTabIndex === 1 ? 'active' : ''}
                    ${selectedTabIndex === 0 ? 'disabled' : ''}
                  `}
              >
                <img
                  src={selectedTabIndex === 1 ? settingIconActive : settingIcon}
                  alt="Setting"
                  className="setting--icon"
                />
                Settings
              </li>
            </ul>
          </div>
        )}
        <div className="tab__content">
          {selectedTabIndex === 0 && (
            <SelectType
              setSelectedTabIndex={setSelectedTabIndex}
              setSelectedNFTType={setSelectedNFTType}
            />
          )}
          {selectedTabIndex === 1 && selectedNFTType === 'single' && <SingleNFTSettings />}
          {selectedTabIndex === 1 && selectedNFTType === 'collection' && (
            <NFTCollectionSettings
              showCollectible={showCollectible}
              setShowCollectible={setShowCollectible}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
