import React, { useState, useEffect } from 'react';
import './CreateNFT.scss';
import { useHistory, useLocation } from 'react-router-dom';
import arrow from '../../../assets/images/arrow.svg';
import SingleNFTForm from './SingleNFTForm';
import NFTCollectionForm from './NFTCollectionForm';
import { useMyNftsContext } from '../../../contexts/MyNFTsContext';
import { useAuthContext } from '../../../contexts/AuthContext';

const CreateNFT = () => {
  const history = useHistory();
  const location = useLocation();
  const { savedNFTsID, savedCollectionID } = useMyNftsContext();
  const { deployedCollections } = useAuthContext();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [selectedNFTType, setSelectedNFTType] = useState('');
  const [backPath, setBackPath] = useState('');
  const [showCollectible, setShowCollectible] = useState(false);

  const goToCollectionPage = () => {
    const findCollection = deployedCollections.filter((item) => item.id === savedCollectionID);
    history.push(`/collection/${findCollection[0].address}`, {
      collection: deployedCollections.filter((item) => item.id === savedCollectionID)[0],
      saved: false,
    });
  };

  useEffect(() => {
    if (savedNFTsID) {
      setSelectedTabIndex(1);
      setSelectedNFTType('single');
    }
    if (location.state) {
      setSelectedTabIndex(location.state.tabIndex);
      setSelectedNFTType(location.state.nftType);
      setBackPath(location.state.backPath);
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
                      : backPath === 'minting'
                      ? '/minting'
                      : '/my-nfts'
                  )
                }
                aria-hidden="true"
              >
                <img src={arrow} alt="back" />
                <span>
                  {location.pathname === '/create-tiers/my-nfts/create'
                    ? 'Create reward tier'
                    : backPath === 'minting'
                    ? 'Minting'
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
          <div className="back-btn" onClick={goToCollectionPage} aria-hidden="true">
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
        <div className="tab__content">
          {selectedTabIndex === 1 && selectedNFTType === 'single' && <SingleNFTForm />}
          {selectedTabIndex === 1 && selectedNFTType === 'collection' && (
            <NFTCollectionForm
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
