import React, { useState, useEffect, useRef } from 'react';
// import './CreateNFT.scss';
import { useRouter } from 'next/router';

import arrow from '../../../assets/images/arrow.svg';

// import './CreateNFT.scss';
import SingleNFTForm from './SingleNFTForm';
import NFTCollectionForm from './NFTCollectionForm';
import { useMyNftsContext } from '../../../contexts/MyNFTsContext';
import { useSearchParam } from 'react-use';

const CreateNFT = () => {
  const router = useRouter();

  const scrollContainer = useRef(null);

  const collectionAddress = useSearchParam('collection');
  const tabIndex = +useSearchParam('tabIndex');
  const NFTType = useSearchParam('nftType');
  const savedNFTID = useSearchParam('savedNft');

  const scrollToTop = () => {
    if (scrollContainer && scrollContainer.current) {
      scrollContainer.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const goToCollectionPage = () => {
    if (collectionAddress) {
      router.push(`/collection/${collectionAddress}`);
    }
  };

  return (
    <div className="create--nft--page">
      <div className="create--nft--background" />
      <div className="create--nft--page--container">
        {collectionAddress ? (
          <div className="back-btn" onClick={goToCollectionPage} aria-hidden="true">
            <img src={arrow} alt="back" style={{ marginRight: '6px' }} />
            {/*<span>{location.state?.collection?.name}</span>*/}
            Go Back
          </div>
        ) : (
          <div
            className="back-btn"
            onClick={() => router.back()}
            aria-hidden="true"
            ref={scrollContainer}
          >
            <img src={arrow} alt="back" style={{ marginRight: '6px' }} />
            <span>Go Back</span>
          </div>
        )}
        {!collectionAddress && !savedNFTID && (
          <h1 className="page--title">
            {tabIndex === 0 ||
            (tabIndex === 1 && NFTType === 'single') ||
            (tabIndex === 1 && NFTType === 'collection')
              ? 'Create NFT'
              : 'Create NFT collection'}
          </h1>
        )}
        {savedNFTID && (
          <h1 className="page--title" style={{ marginBottom: '20px' }}>
            Edit NFT
          </h1>
        )}
        {collectionAddress && NFTType === 'collection' && (
          <h1 className="page--title">Edit collection</h1>
        )}
        <div className="tab__content">
          {tabIndex === 1 && NFTType === 'single' && (
            <SingleNFTForm scrollToTop={scrollToTop} />
          )}
          {tabIndex === 1 && NFTType === 'collection' && (
            <NFTCollectionForm scrollToTop={scrollToTop} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
