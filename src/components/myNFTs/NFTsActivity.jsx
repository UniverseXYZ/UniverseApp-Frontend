import React, { useState } from 'react';
import { MyNFTSActivity } from '../../utils/fixtures/MyNFTsActivityDummyData';
import listingIcon from '../../assets/images/activity-icons/listing-small.svg';
import salesIcon from '../../assets/images/activity-icons/sales-small.svg';
import transfersIcon from '../../assets/images/activity-icons/transfer-small.svg';
import offersIcon from '../../assets/images/activity-icons/offer-small.svg';
import bidsIcon from '../../assets/images/activity-icons/bid-small.svg';
import burnIcon from '../../assets/images/activity-icons/burn-small.svg';
import bubbleIcon from '../../assets/images/text-bubble.png';
import Button from '../button/Button';

const NFTsActivity = () => {
  const [data, setData] = useState([...MyNFTSActivity]);
  const filters = [
    { name: 'All', icon: null, background: '#000000' },
    { name: 'Listing', icon: listingIcon, background: '#FFB23E' },
    { name: 'Sales', icon: salesIcon, background: '#6FDD6C' },
    { name: 'Transfers', icon: transfersIcon, background: '#D146F3' },
    { name: 'Offers', icon: offersIcon, background: '#F05ABD' },
    { name: 'Bids', icon: bidsIcon, background: '#38D3E9' },
    { name: 'Burn', icon: burnIcon, background: '#E04300' },
  ];
  const [nftsQuantity, setNftsQuantity] = useState(5);
  const [filterIndex, setFilterIndex] = useState(0);

  const handleFilter = (filter, index) => {
    setFilterIndex(index);
    if (filter === 'Listing') {
      setData(MyNFTSActivity.filter((nft) => nft.action === 'Listed'));
    } else if (filter === 'Sales') {
      setData(MyNFTSActivity.filter((nft) => nft.action === 'Sold'));
    } else if (filter === 'Transfers') {
      setData(MyNFTSActivity.filter((nft) => nft.action === 'Transferred'));
    } else if (filter === 'Offers') {
      setData(MyNFTSActivity.filter((nft) => nft.action === 'Offer'));
    } else if (filter === 'Bids') {
      setData(MyNFTSActivity.filter((nft) => nft.action === 'Bid'));
    } else if (filter === 'Burn') {
      setData(MyNFTSActivity.filter((nft) => nft.action === 'Burnt'));
    } else {
      setData(MyNFTSActivity);
      setNftsQuantity(5);
    }
  };

  return (
    <div className="tab__nfts__activity">
      {data.length ? (
        <>
          <div className="nfts__activity__filters">
            <ul>
              {filters.map((filter, index) => (
                <li
                  className={index === filterIndex ? 'active' : ''}
                  style={
                    index === filterIndex
                      ? { background: `${filter.background}` }
                      : { background: '#ffffff' }
                  }
                  onClick={() => handleFilter(filter.name, index)}
                  aria-hidden="true"
                >
                  {index !== 0 && <img src={filter.icon} alt="Icon" />}
                  {filter.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="nfts__activity__list">
            {data.map(
              (nft, index) =>
                index < nftsQuantity && (
                  <div className="nft__activity__div">
                    <div className="nft__image">
                      <img src={nft.image} alt="NFT" />
                    </div>
                    <div className="nft__description">
                      <div className="details">
                        <h4>{nft.name}</h4>
                        <div className="description">
                          <span>
                            <img src={nft.icon} alt="Icon" /> {nft.action}{' '}
                          </span>
                          <span>
                            {nft.action === 'Offer'
                              ? 'from'
                              : nft.action === 'Transferred'
                              ? 'to'
                              : 'by'}{' '}
                            <b>{nft.artist}</b>{' '}
                            {nft.action !== 'Burnt' && (
                              <>
                                for <b>{nft.price} ETH</b>
                              </>
                            )}
                          </span>
                        </div>
                        <p className="time">{nft.time}</p>
                      </div>
                      <div className="nft__view">
                        {/* <img src={viewIcon} alt="View" /> */}
                        <span className="tooltiptext">View on Etherscan</span>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
          {data.length >= nftsQuantity && (
            <div className="activity__button">
              <Button
                className="light-border-button"
                onClick={() => setNftsQuantity(nftsQuantity + 5)}
              >
                Load more
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="nfts__activity__empty">
          <img src={bubbleIcon} alt="Buble" />
          <p className="activity__empty__text">This user has no transactions yet!</p>
        </div>
      )}
    </div>
  );
};

export default NFTsActivity;
