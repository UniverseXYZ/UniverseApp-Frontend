import React, { useContext, useState, useEffect } from 'react';
import './CreateNFT.scss';
import { useHistory, useLocation } from 'react-router-dom';
import arrow from '../../../assets/images/arrow.svg';
import settingIconActive from '../../../assets/images/settings-solid.svg';
import settingIcon from '../../../assets/images/setting-solid-disactive.svg';
import selectTypeIconActive from '../../../assets/images/select-type-icon-active.svg';
import selectTypeIcon from '../../../assets/images/select-type-icon.svg';
import SelectType from './SelectType';
import SingleNFTSettings from './SingleNFTSettings';
import NFTCollectionSettings from './NFTCollectionSettings';
import AppContext from '../../../ContextAPI';

const CreateNFT = () => {
  const history = useHistory();
  const location = useLocation();
  const { savedNFTsID, savedCollectionID, deployedCollections } = useContext(AppContext);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [selectedNFTType, setSelectedNFTType] = useState('');
  const [showCollectible, setShowCollectible] = useState(false);

  const handleSelectTypeClick = () => {
    if (selectedTabIndex !== 0) {
      setSelectedTabIndex(0);
      setSelectedNFTType('');
    }
  };

  useEffect(() => {
    if (savedNFTsID) {
      setSelectedTabIndex(1);
      setSelectedNFTType('single');
    }
    if (location.state) {
      setSelectedTabIndex(location.state.tabIndex);
      setSelectedNFTType(location.state.nftType);
    }
  }, []);

  return (
    <div className="create--nft--page">
      <div className="create--nft--background" />
      <div className="create--nft--page--container">
        {!savedCollectionID && (
          <>
            {!showCollectible ? (
              <div
                className="back-btn"
                onClick={() =>
                  history.push(
                    location.pathname === '/create-tiers/my-nfts/create'
                      ? '/create-tiers'
                      : '/my-nfts'
                  )
                }
                aria-hidden="true"
              >
                <img src={arrow} alt="back" />
                <span>
                  {location.pathname === '/create-tiers/my-nfts/create'
                    ? 'Create reward tier'
                    : 'My NFTs'}
                </span>
              </div>
            ) : (
              <div
                className="back-btn"
                onClick={() => setShowCollectible(false)}
                aria-hidden="true"
              >
                <img src={arrow} alt="back" />
                <span>NFT collection settings</span>
              </div>
            )}
          </>
        )}
        {savedCollectionID && (
          <div className="back-btn" onClick={() => history.goBack()} aria-hidden="true">
            <img src={arrow} alt="back" />
            <span>
              {deployedCollections.filter((item) => item.id === savedCollectionID)[0].name}
            </span>
          </div>
        )}
        {!savedCollectionID && !savedNFTsID && (
          <h1 className="page--title">
            {selectedTabIndex === 0 ||
            (selectedTabIndex === 1 && selectedNFTType === 'single') ||
            (selectedTabIndex === 1 && selectedNFTType === 'collection' && showCollectible)
              ? 'Create NFT'
              : 'Create NFT collection'}
          </h1>
        )}
        {savedNFTsID && (
          <h1 className="page--title" style={{ marginBottom: '20px' }}>
            Edit NFT
          </h1>
        )}
        {savedCollectionID && <h1 className="page--title">Edit collection</h1>}
        {/* {!showCollectible && (
          <div id="tabs--wrapper">
            <ul className="tabs">
              <li
                className={selectedTabIndex === 0 ? 'active' : 'box--shadow--effect'}
                onClick={handleSelectTypeClick}
                aria-hidden="true"
              >
                <div>
                  <img
                    src={selectedTabIndex === 0 ? selectTypeIconActive : selectTypeIcon}
                    alt="Select type"
                  />
                  Select type
                </div>
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
        )} */}
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
