import React from 'react';
import { useRouter } from 'next/router';

import bubbleIcon from '../../assets/images/text-bubble.png';
import Button from '../button/Button';

const NoSavedNftsFound = () => {
  const router = useRouter();

  return (
    <div className="empty__nfts">
      <div className="tabs-empty">
        <div className="image-bubble">
          <img src={bubbleIcon} alt="bubble-icon" />
        </div>
        <h3>No saved NFTs found</h3>
        <p>Create NFTs or NFT collections with our platform by clicking the button below</p>
        <Button
          className="light-button"
          onClick={() => router.push('/my-nfts/create?tabIndex=1&nftType=single')}
        >
          Create NFT
        </Button>
      </div>
    </div>
  );
};

export default NoSavedNftsFound;
