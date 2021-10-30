/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import CarouselForNfts from '../carouselForNfts/corouselForNfts';
import mp3Icon from '../../assets/images/mp3-icon.png';
import crossSmall from '../../assets/images/crossSmall.svg';
import Button from '../button/Button.jsx';

const CreatTiersStickyBar = ({ winnersData, tierSettings, handleContinue, disabled }) => {
  // const data = winnersData.map((info) => info.nftsData);

  const winners = [
    {
      id: 1,
      winnerName: 1,
    },
    {
      id: 2,
      winnerName: 2,
    },
    {
      id: 3,
      winnerName: 3,
    },
    {
      id: 4,
      winnerName: 4,
    },
    {
      id: 5,
      winnerName: 5,
    },
  ];
  const data = [
    {
      winner: 1,
      id: 6814,
      collectionId: 50,
      txHash: '0xff8292f5cf8d47f16486e98355dc4c2a46c4ff2ae9396d69fd194fec5b18a76c',
      creator: {
        id: 12,
        address: '0x72523054c174a6c8e961bd14a2cab9f059e507e8',
        displayName: 'ygf',
        universePageUrl: 'sf',
        about: 'sdf',
        instagramUser: 'fs',
        twitterUser: '12',
        createdAt: '2021-10-04T12:32:17.702Z',
        profileImageUrl:
          'https://universeapp-assets-dev.s3.amazonaws.com/profiles/86b90555127f10890212b900f207a4d15621d57a0a49915f.jpg',
        logoImageUrl: null,
      },
      name: 'saved',
      description: null,
      tokenId: 1,
      artworkType: 'png',
      url: 'https://universeapp-assets-dev.s3.amazonaws.com/5ff77e1b531570cc763e8f8525807166ebff3365c31c458d.png',
      optimized_url:
        'https://universeapp-assets-dev.s3.amazonaws.com/5ff77e1b531570cc763e8f8525807166ebff3365c31c458d.png',
      thumbnail_url:
        'https://universeapp-assets-dev.s3.amazonaws.com/5ff77e1b531570cc763e8f8525807166ebff3365c31c458d.png',
      original_url: 'https://arweave.net/Vo37gkWzYBtdONH8cfjIfRlwvdJgqtgyH6bpWWIpuLA',
      tokenUri: 'https://arweave.net/JJ4yYjmyoi6DekMreFZl40QhxMq7AuHYGr1YEo2cBxA',
      properties: [
        {
          12: '12',
        },
      ],
      royalties: [
        {
          amount: 5,
          address: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
        },
      ],
      numberOfEditions: 3,
      createdAt: '2021-10-08T13:52:14.402Z',
      updatedAt: '2021-10-08T13:52:14.402Z',
      collection: {
        id: 50,
        source: 'universe',
        txHash: '0xa60f982eaab438db997b5bde8703cf12dc5f56d9860e3a344cee95c28f51ede4',
        address: '0x32d7aa59d5197dffc0dfc220801540b3ac2de35a',
        owner: '0x72523054c174a6c8e961bd14a2cab9f059e507e8',
        creator: '0x72523054c174a6c8e961bd14a2cab9f059e507e8',
        name: 'collection',
        symbol: 'col',
        description: 'col collection collection ceol',
        shortUrl: null,
        coverUrl:
          'https://universeapp-assets-dev.s3.amazonaws.com/36780daf9e88fe0752afd12f5bcb44413549e88b28f95f86.jpg',
        bannerUrl: null,
        publicCollection: false,
        createdAt: '2021-10-08T06:33:40.073Z',
        updatedAt: '2021-10-08T06:33:40.073Z',
      },
      tokenIds: [1],
    },
    {
      winner: 1,
      id: 6814,
      collectionId: 50,
      txHash: '0xff8292f5cf8d47f16486e98355dc4c2a46c4ff2ae9396d69fd194fec5b18a76c',
      creator: {
        id: 12,
        address: '0x72523054c174a6c8e961bd14a2cab9f059e507e8',
        displayName: 'ygf',
        universePageUrl: 'sf',
        about: 'sdf',
        instagramUser: 'fs',
        twitterUser: '12',
        createdAt: '2021-10-04T12:32:17.702Z',
        profileImageUrl:
          'https://universeapp-assets-dev.s3.amazonaws.com/profiles/86b90555127f10890212b900f207a4d15621d57a0a49915f.jpg',
        logoImageUrl: null,
      },
      name: 'saved',
      description: null,
      tokenId: 1,
      artworkType: 'png',
      url: 'https://universeapp-assets-dev.s3.amazonaws.com/5ff77e1b531570cc763e8f8525807166ebff3365c31c458d.png',
      optimized_url:
        'https://universeapp-assets-dev.s3.amazonaws.com/5ff77e1b531570cc763e8f8525807166ebff3365c31c458d.png',
      thumbnail_url:
        'https://universeapp-assets-dev.s3.amazonaws.com/5ff77e1b531570cc763e8f8525807166ebff3365c31c458d.png',
      original_url: 'https://arweave.net/Vo37gkWzYBtdONH8cfjIfRlwvdJgqtgyH6bpWWIpuLA',
      tokenUri: 'https://arweave.net/JJ4yYjmyoi6DekMreFZl40QhxMq7AuHYGr1YEo2cBxA',
      properties: [
        {
          12: '12',
        },
      ],
      royalties: [
        {
          amount: 5,
          address: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
        },
      ],
      numberOfEditions: 5,
      createdAt: '2021-10-08T13:52:14.402Z',
      updatedAt: '2021-10-08T13:52:14.402Z',
      collection: {
        id: 50,
        source: 'universe',
        txHash: '0xa60f982eaab438db997b5bde8703cf12dc5f56d9860e3a344cee95c28f51ede4',
        address: '0x32d7aa59d5197dffc0dfc220801540b3ac2de35a',
        owner: '0x72523054c174a6c8e961bd14a2cab9f059e507e8',
        creator: '0x72523054c174a6c8e961bd14a2cab9f059e507e8',
        name: 'collection',
        symbol: 'col',
        description: 'col collection collection ceol',
        shortUrl: null,
        coverUrl:
          'https://universeapp-assets-dev.s3.amazonaws.com/36780daf9e88fe0752afd12f5bcb44413549e88b28f95f86.jpg',
        bannerUrl: null,
        publicCollection: false,
        createdAt: '2021-10-08T06:33:40.073Z',
        updatedAt: '2021-10-08T06:33:40.073Z',
      },
      tokenIds: [1],
    },
    {
      winner: 3,
      id: 6552,
      collectionId: 1,
      txHash: '0x3c773cdf8c129939467e0a914ac00442e7fe3ad15093e56a973803951b269869',
      creator: {
        id: 12,
        address: '0x72523054c174a6c8e961bd14a2cab9f059e507e8',
        displayName: 'ygf',
        universePageUrl: 'sf',
        about: 'sdf',
        instagramUser: 'fs',
        twitterUser: '12',
        createdAt: '2021-10-04T12:32:17.702Z',
        profileImageUrl:
          'https://universeapp-assets-dev.s3.amazonaws.com/profiles/86b90555127f10890212b900f207a4d15621d57a0a49915f.jpg',
        logoImageUrl: null,
      },
      name: '123',
      description: '123',
      tokenId: 7453,
      artworkType: 'png',
      url: 'https://universeapp-assets-dev.s3.amazonaws.com/842c74e196f0a2d2fa4317b766feec60e4ef23ba6b23e7be.png',
      optimized_url:
        'https://universeapp-assets-dev.s3.amazonaws.com/842c74e196f0a2d2fa4317b766feec60e4ef23ba6b23e7be.png',
      thumbnail_url:
        'https://universeapp-assets-dev.s3.amazonaws.com/842c74e196f0a2d2fa4317b766feec60e4ef23ba6b23e7be.png',
      original_url: 'https://arweave.net/M6bu4GWcDEEOonwK_PMWnXPriOYBzDJeklMfbeiPTgE',
      tokenUri: 'https://arweave.net/pzZLgQObMsu4Ih2v7KZCsPEW1OopwlLtNfyuDfxef2I',
      properties: [
        {
          12: '12',
        },
      ],
      royalties: [
        {
          amount: 12,
          address: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
        },
      ],
      numberOfEditions: 5,
      createdAt: '2021-10-07T13:50:14.841Z',
      updatedAt: '2021-10-07T13:50:14.841Z',
      collection: {
        id: 1,
        source: 'universe',
        txHash: null,
        address: '0xd3ccbb9f3e5b9678c5f4fef91055704df81a104c',
        owner: null,
        creator: null,
        name: 'Universe Core',
        symbol: 'NFUC',
        description: null,
        shortUrl: null,
        coverUrl: null,
        bannerUrl: null,
        publicCollection: true,
        createdAt: '2021-10-03T13:43:30.532Z',
        updatedAt: '2021-10-03T13:43:30.532Z',
      },
      tokenIds: [7453, 7452, 7451, 7450, 7449],
    },
  ];
  return (
    <div className="selected-ntf create-tiers-sticky-bar">
      <div className="container selected-body">
        <div className="infoSelect-div">
          <span>Number of winners : {tierSettings.numberOfWinners}</span>
          <span>NFTs per winner : {tierSettings.nftsPerWinner}</span>
          {winnersData.length > 0 ? (
            <CarouselForNfts winners={winners} data={data} winnersData={winnersData} />
          ) : (
            <div className="img-div">
              {data.map((nft) => (
                <div key={nft.id} className="imgs">
                  {nft.artworkType && nft.artworkType.endsWith('mp4') && (
                    <video
                      className="smallView-image"
                      onMouseOver={(event) => event.target.play()}
                      onFocus={(event) => event.target.play()}
                      onMouseOut={(event) => event.target.pause()}
                      onBlur={(event) => event.target.pause()}
                    >
                      <source src={nft.url} type="video/mp4" />
                      <track kind="captions" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {nft.artworkType && nft.artworkType.endsWith('mpeg') && (
                    <img className="smallView-image" src={mp3Icon} alt="" />
                  )}
                  {nft.artworkType &&
                    !nft.artworkType.endsWith('mpeg') &&
                    !nft.artworkType.endsWith('mp4') && (
                      <img className="smallView-image" src={nft.url} alt="" />
                    )}
                  <img
                    className="del-img"
                    src={crossSmall}
                    onClick={() => handledeleteNft(nft)}
                    alt="delete"
                    aria-hidden="true"
                  />
                </div>
              ))}
              {Array(5)
                .fill(0)
                .map((el, i) => (
                  <div className="placeholder" key={uuid()} />
                ))}
            </div>
          )}
        </div>
        <div className="sel-info">
          {/* {nftsPerWinner > previewNFTs.length && (
              <span className="err-select">
                You have not selected enough NFTs for this reward tier
              </span>
            )} */}
          <div className="continue-nft">
            <Button
              onClick={() => handleContinue(winnersData)}
              disabled={!disabled}
              className="light-button"
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

CreatTiersStickyBar.propTypes = {
  winnersData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  tierSettings: PropTypes.oneOfType([PropTypes.object]).isRequired,
  handleContinue: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default CreatTiersStickyBar;
