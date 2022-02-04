import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import bubbleIcon from '../../assets/images/text-bubble.png';
import plusIcon from '../../assets/images/plus.svg';

const NoCollectionsFound = () => {
  const history = useHistory();
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const ref2 = useRef(null);

  const handleClickOutside = (event) => {
    if (ref2.current && !ref2.current.contains(event.target)) {
      setIsDropdownOpened(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return (
    <div className="empty__nfts">
      <div className="tabs-empty">
        <div className="image-bubble">
          <img src={bubbleIcon} alt="bubble-icon" />
        </div>
        <h3>No collections found</h3>
        <p>Create NFTs or NFT collections with our platform by clicking the button below</p>
        <button
          type="button"
          ref={ref2}
          className={`create--nft--dropdown  ${isDropdownOpened ? 'opened' : ''} light-button`}
          onClick={() => setIsDropdownOpened(!isDropdownOpened)}
          aria-hidden="true"
        >
          Create
          <img src={plusIcon} alt="icon" />
          {isDropdownOpened && (
            <div className="sort__share__dropdown">
              <ul>
                <li
                  aria-hidden="true"
                  onClick={() =>
                    history.push('/my-nfts/create', { tabIndex: 1, nftType: 'single' })
                  }
                >
                  NFT
                </li>
                <li
                  aria-hidden="true"
                  onClick={() =>
                    history.push('/my-nfts/create', { tabIndex: 1, nftType: 'collection' })
                  }
                >
                  Collection
                </li>
              </ul>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default NoCollectionsFound;
