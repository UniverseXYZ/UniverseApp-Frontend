import React, { useState, useEffect, useRef } from 'react';
// import './CreateNFT.scss';
import arrow from '../../../assets/images/arrow.svg';
import SingleNFTForm from './SingleNFTForm';
import NFTCollectionForm from './NFTCollectionForm';
import { useMyNftsContext } from '../../../contexts/MyNFTsContext';
import { useRouter } from 'next/router';

const CreateNFT = () => {
  const router = useRouter();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [selectedNFTType, setSelectedNFTType] = useState('');
  const [backPath, setBackPath] = useState('');

  const scrollContainer = useRef(null);

  const scrollToTop = () => {
    if (scrollContainer && scrollContainer.current) {
      scrollContainer.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const goToCollectionPage = () => {
    if (location.state && location.state.collection) {
      router.push(`/collection/${location.state.collection.address}`);
    }
  };

  useEffect(() => {
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
        {location.state?.collection?.id ? (
          <div className="back-btn" onClick={goToCollectionPage} aria-hidden="true">
            <img src={arrow} alt="back" />
            <span>{location.state?.collection?.name}</span>
          </div>
        ) : (
          <div
            className="back-btn"
            onClick={() => router.back()}
            aria-hidden="true"
            ref={scrollContainer}
          >
            <img src={arrow} alt="back" />
            <span>Go Back</span>
          </div>
        )}
        {!location.state?.collection?.id && !location.state.savedNft?.id && (
          <h1 className="page--title">
            {selectedTabIndex === 0 ||
            (selectedTabIndex === 1 && selectedNFTType === 'single') ||
            (selectedTabIndex === 1 && selectedNFTType === 'collection')
              ? 'Create NFT'
              : 'Create NFT collection'}
          </h1>
        )}
        {location.state.savedNft?.id && (
          <h1 className="page--title" style={{ marginBottom: '20px' }}>
            Edit NFT
          </h1>
        )}
        {location.state?.collection?.id && selectedNFTType === 'collection' && (
          <h1 className="page--title">Edit collection</h1>
        )}
        <div className="tab__content">
          {selectedTabIndex === 1 && selectedNFTType === 'single' && (
            <SingleNFTForm scrollToTop={scrollToTop} />
          )}
          {selectedTabIndex === 1 && selectedNFTType === 'collection' && (
            <NFTCollectionForm scrollToTop={scrollToTop} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
