import React, { useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import bubbleIcon from '../../assets/images/text-bubble.png';
import plusIcon from '../../assets/images/plus.svg';
import Button from '../button/Button';

const NoNftsFound = () => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const ref = useRef(null);
  const ref2 = useRef(null);
  const refMobile = useRef(null);

  const history = useHistory();

  const handleClickOutside = (event) => {
    if (!event.target.classList.contains('target')) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        refMobile.current &&
        !refMobile.current.contains(event.target)
      ) {
        setIsDropdownOpened(false);
      }
    }

    if (ref2.current && !ref2.current.contains(event.target)) {
      setIsDropdownOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div className="empty__nfts">
      <div className="tabs-empty">
        <div className="image-bubble">
          <img src={bubbleIcon} alt="bubble-icon" />
        </div>
        <h3>No NFTs found</h3>
        <h3 style={{ marginTop: 6 }}>
          If you&apos;re signing in for the first time, it may take a bit before your nfts are
          synced
        </h3>
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
export default NoNftsFound;
