import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import uuid from 'react-uuid';
import moment from 'moment';
import tabArrow from '../../assets/images/tab-arrow.svg';
import FutureAuctions from './FutureAuctions.jsx';
import ActiveAuctions from './ActiveAuctions.jsx';
import PastAuctions from './PastAuctions.jsx';
import { handleTabLeftScrolling, handleTabRightScrolling } from '../../utils/scrollingHandlers';
import { useAuctionContext } from '../../contexts/AuctionContext';
import { useAuthContext } from '../../contexts/AuthContext';
import { PLACEHOLDER_MY_BIDS } from '../../utils/fixtures/MyBidsDummyData';
import MyBidsCard from '../auctionsCard/MyBidsCard';
import NoAuctionsFound from './NoAuctionsFound';

const pastAuctionsMock = [
  {
    id: 1,
    name: 'Auction 1',
    headline: null,
    startingBid: '0.1',
    tokenAddress: '0x000000000000000000000000000000',
    tokenSymbol: 'XYZ',
    tokenDecimals: 18,
    startDate: '2021-10-10T09:02:31.168Z',
    endDate: '2021-10-12T09:02:31.168Z',
    royaltySplits: [
      {
        address: '0x000000000000000000000000000000',
        percentAmount: 52.654,
      },
      {
        address: '0x000000000000000000000000000000',
        percentAmount: 100,
      },
    ],
    link: 'test',
    promoImageUrl: null,
    backgroundImageUrl: null,
    backgroundImageBlur: false,
    createdAt: '2021-10-12T06:13:00.907Z',
    updatedAt: '2021-10-12T06:13:00.907Z',
    rewardTiers: [
      {
        id: 1,
        auctionId: 1,
        name: 'New reward tier',
        numberOfWinners: 2,
        nftsPerWinner: 2,
        minimumBid: '0.7',
        tierPosition: 0,
        description: 'My description',
        imageUrl: null,
        color: '#fff',
        createdAt: '2021-10-12T06:13:00.907Z',
        updatedAt: '2021-10-12T13:31:15.191Z',
        nfts: [
          {
            artworkType: 'png',
            collectionId: 1,
            createdAt: '2021-10-11T06:02:11.927Z',
            creator: '0xb76801d8d7e0261fcfa72d4b10cfd357c29741c3',
            description: 'test',
            id: 6819,
            name: 'Error NFT',
            numberOfEditions: 1,
            optimized_url:
              'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
            original_url: 'https://arweave.net/awDEKLF6zNnKt7dXmIGYGRdSksHAtpuC0P7BE0c7BbU',
            properties: null,
            royalties: null,
            thumbnail_url:
              'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
            tokenUri: 'https://arweave.net/vjUrgxpo8SYaPnPcRjIsymlBiY1qr9NH0qsAUdBlmkI',
            txHash: '0xf2a7f1110710f721da2b741a9056af7b1f2d89b6386ff29d24fad43a0dff0afd',
            updatedAt: '2021-10-11T06:02:11.927Z',
            url: 'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
          },
          {
            artworkType: 'png',
            collectionId: 1,
            createdAt: '2021-10-11T06:02:11.927Z',
            creator: '0xb76801d8d7e0261fcfa72d4b10cfd357c29741c3',
            description: 'test',
            id: 6819,
            name: 'Error NFT',
            numberOfEditions: 1,
            optimized_url:
              'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
            original_url: 'https://arweave.net/awDEKLF6zNnKt7dXmIGYGRdSksHAtpuC0P7BE0c7BbU',
            properties: null,
            royalties: null,
            thumbnail_url:
              'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
            tokenUri: 'https://arweave.net/vjUrgxpo8SYaPnPcRjIsymlBiY1qr9NH0qsAUdBlmkI',
            txHash: '0xf2a7f1110710f721da2b741a9056af7b1f2d89b6386ff29d24fad43a0dff0afd',
            updatedAt: '2021-10-11T06:02:11.927Z',
            url: 'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
          },
          {
            artworkType: 'png',
            collectionId: 1,
            createdAt: '2021-10-11T06:02:11.927Z',
            creator: '0xb76801d8d7e0261fcfa72d4b10cfd357c29741c3',
            description: 'test',
            id: 6819,
            name: 'Error NFT',
            numberOfEditions: 1,
            optimized_url:
              'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
            original_url: 'https://arweave.net/awDEKLF6zNnKt7dXmIGYGRdSksHAtpuC0P7BE0c7BbU',
            properties: null,
            royalties: null,
            tokenUri: 'https://arweave.net/vjUrgxpo8SYaPnPcRjIsymlBiY1qr9NH0qsAUdBlmkI',
            txHash: '0xf2a7f1110710f721da2b741a9056af7b1f2d89b6386ff29d24fad43a0dff0afd',
            updatedAt: '2021-10-11T06:02:11.927Z',
            url: 'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
          },
        ],
      },
    ],
    collections: [
      {
        id: 1,
        source: 'universe',
        txHash: null,
        address: '0xd3ccbb9f3e5b9678c5f4fef91055704df81a104c',
        owner: null,
        creator: null,
        name: 'Universe Core',
        symbol: 'NFUC',
        description: 'The Univers Core Collection',
        shortUrl: null,
        coverUrl: null,
        bannerUrl: null,
        publicCollection: true,
        createdAt: '2021-10-11T12:54:44.719Z',
        updatedAt: '2021-10-11T12:54:44.719Z',
      },
    ],
  },
  {
    id: 2,
    name: 'Auction 2',
    headline: null,
    startingBid: '0.1',
    tokenAddress: '0x000000000000000000000000000000',
    tokenSymbol: 'XYZ',
    tokenDecimals: 18,
    startDate: '2021-10-10T09:02:31.168Z',
    endDate: '2021-10-12T09:02:31.168Z',
    royaltySplits: [
      {
        address: '0x000000000000000000000000000000',
        percentAmount: 52.654,
      },
      {
        address: '0x000000000000000000000000000000',
        percentAmount: 100,
      },
    ],
    link: null,
    promoImageUrl: null,
    backgroundImageUrl: null,
    backgroundImageBlur: false,
    createdAt: '2021-10-12T06:13:00.907Z',
    updatedAt: '2021-10-12T06:13:00.907Z',
    rewardTiers: [
      {
        id: 1,
        auctionId: 1,
        name: 'New reward tier',
        numberOfWinners: 4,
        nftsPerWinner: 2,
        minimumBid: '0.7',
        tierPosition: 0,
        description: 'My description',
        imageUrl: null,
        color: '#fff',
        createdAt: '2021-10-12T06:13:00.907Z',
        updatedAt: '2021-10-12T13:31:15.191Z',
        nfts: [
          {
            artworkType: 'png',
            collectionId: 1,
            createdAt: '2021-10-11T06:02:11.927Z',
            creator: '0xb76801d8d7e0261fcfa72d4b10cfd357c29741c3',
            description: 'test',
            id: 6819,
            name: 'Error NFT',
            numberOfEditions: 1,
            optimized_url:
              'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
            original_url: 'https://arweave.net/awDEKLF6zNnKt7dXmIGYGRdSksHAtpuC0P7BE0c7BbU',
            properties: null,
            royalties: null,
            thumbnail_url:
              'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
            tokenUri: 'https://arweave.net/vjUrgxpo8SYaPnPcRjIsymlBiY1qr9NH0qsAUdBlmkI',
            txHash: '0xf2a7f1110710f721da2b741a9056af7b1f2d89b6386ff29d24fad43a0dff0afd',
            updatedAt: '2021-10-11T06:02:11.927Z',
            url: 'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
          },
          {
            artworkType: 'png',
            collectionId: 1,
            createdAt: '2021-10-11T06:02:11.927Z',
            creator: '0xb76801d8d7e0261fcfa72d4b10cfd357c29741c3',
            description: 'test',
            id: 6819,
            name: 'Error NFT',
            numberOfEditions: 1,
            optimized_url:
              'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
            original_url: 'https://arweave.net/awDEKLF6zNnKt7dXmIGYGRdSksHAtpuC0P7BE0c7BbU',
            properties: null,
            royalties: null,
            thumbnail_url:
              'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
            tokenUri: 'https://arweave.net/vjUrgxpo8SYaPnPcRjIsymlBiY1qr9NH0qsAUdBlmkI',
            txHash: '0xf2a7f1110710f721da2b741a9056af7b1f2d89b6386ff29d24fad43a0dff0afd',
            updatedAt: '2021-10-11T06:02:11.927Z',
            url: 'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
          },
        ],
      },
      {
        id: 1,
        auctionId: 1,
        name: 'New reward tier',
        numberOfWinners: 4,
        nftsPerWinner: 2,
        minimumBid: '0.7',
        tierPosition: 0,
        description: 'My description',
        imageUrl: null,
        color: '#fff',
        createdAt: '2021-10-12T06:13:00.907Z',
        updatedAt: '2021-10-12T13:31:15.191Z',
        nfts: [
          {
            artworkType: 'png',
            collectionId: 1,
            createdAt: '2021-10-11T06:02:11.927Z',
            creator: '0xb76801d8d7e0261fcfa72d4b10cfd357c29741c3',
            description: 'test',
            id: 6819,
            name: 'Error NFT',
            numberOfEditions: 1,
            optimized_url:
              'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
            original_url: 'https://arweave.net/awDEKLF6zNnKt7dXmIGYGRdSksHAtpuC0P7BE0c7BbU',
            properties: null,
            royalties: null,
            thumbnail_url:
              'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
            tokenUri: 'https://arweave.net/vjUrgxpo8SYaPnPcRjIsymlBiY1qr9NH0qsAUdBlmkI',
            txHash: '0xf2a7f1110710f721da2b741a9056af7b1f2d89b6386ff29d24fad43a0dff0afd',
            updatedAt: '2021-10-11T06:02:11.927Z',
            url: 'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
          },
          {
            artworkType: 'png',
            collectionId: 1,
            createdAt: '2021-10-11T06:02:11.927Z',
            creator: '0xb76801d8d7e0261fcfa72d4b10cfd357c29741c3',
            description: 'test',
            id: 6819,
            name: 'Error NFT',
            numberOfEditions: 1,
            optimized_url:
              'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
            original_url: 'https://arweave.net/awDEKLF6zNnKt7dXmIGYGRdSksHAtpuC0P7BE0c7BbU',
            properties: null,
            royalties: null,
            thumbnail_url:
              'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
            tokenUri: 'https://arweave.net/vjUrgxpo8SYaPnPcRjIsymlBiY1qr9NH0qsAUdBlmkI',
            txHash: '0xf2a7f1110710f721da2b741a9056af7b1f2d89b6386ff29d24fad43a0dff0afd',
            updatedAt: '2021-10-11T06:02:11.927Z',
            url: 'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
          },
          {
            artworkType: 'png',
            collectionId: 1,
            createdAt: '2021-10-11T06:02:11.927Z',
            creator: '0xb76801d8d7e0261fcfa72d4b10cfd357c29741c3',
            description: 'test',
            id: 6819,
            name: 'Error NFT',
            numberOfEditions: 1,
            optimized_url:
              'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
            original_url: 'https://arweave.net/awDEKLF6zNnKt7dXmIGYGRdSksHAtpuC0P7BE0c7BbU',
            properties: null,
            royalties: null,
            thumbnail_url:
              'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
            tokenUri: 'https://arweave.net/vjUrgxpo8SYaPnPcRjIsymlBiY1qr9NH0qsAUdBlmkI',
            txHash: '0xf2a7f1110710f721da2b741a9056af7b1f2d89b6386ff29d24fad43a0dff0afd',
            updatedAt: '2021-10-11T06:02:11.927Z',
            url: 'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
          },
          {
            artworkType: 'png',
            collectionId: 1,
            createdAt: '2021-10-11T06:02:11.927Z',
            creator: '0xb76801d8d7e0261fcfa72d4b10cfd357c29741c3',
            description: 'test',
            id: 6819,
            name: 'Error NFT',
            numberOfEditions: 1,
            optimized_url:
              'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
            original_url: 'https://arweave.net/awDEKLF6zNnKt7dXmIGYGRdSksHAtpuC0P7BE0c7BbU',
            properties: null,
            royalties: null,
            thumbnail_url:
              'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
            tokenUri: 'https://arweave.net/vjUrgxpo8SYaPnPcRjIsymlBiY1qr9NH0qsAUdBlmkI',
            txHash: '0xf2a7f1110710f721da2b741a9056af7b1f2d89b6386ff29d24fad43a0dff0afd',
            updatedAt: '2021-10-11T06:02:11.927Z',
            url: 'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
          },
        ],
      },
    ],
    collections: [
      {
        id: 1,
        source: 'universe',
        txHash: null,
        address: '0xd3ccbb9f3e5b9678c5f4fef91055704df81a104c',
        owner: null,
        creator: null,
        name: 'Universe Core',
        symbol: 'NFUC',
        description: 'The Univers Core Collection',
        shortUrl: null,
        coverUrl: null,
        bannerUrl: null,
        publicCollection: true,
        createdAt: '2021-10-11T12:54:44.719Z',
        updatedAt: '2021-10-11T12:54:44.719Z',
      },
    ],
  },
];

const activeAuctionsMock = [
  {
    id: 1,
    name: 'Auction 1',
    headline: null,
    startingBid: '0.1',
    tokenAddress: '0x000000000000000000000000000000',
    tokenSymbol: 'XYZ',
    tokenDecimals: 18,
    startDate: '2021-10-11T09:02:31.168Z',
    endDate: '2021-11-22T09:02:31.168Z',
    royaltySplits: [
      {
        address: '0x000000000000000000000000000000',
        percentAmount: 52.654,
      },
      {
        address: '0x000000000000000000000000000000',
        percentAmount: 100,
      },
    ],
    link: 'test',
    promoImageUrl: null,
    backgroundImageUrl: null,
    backgroundImageBlur: false,
    createdAt: '2021-10-12T06:13:00.907Z',
    updatedAt: '2021-10-12T06:13:00.907Z',
    rewardTiers: [
      {
        id: 1,
        auctionId: 1,
        name: 'New reward tier',
        numberOfWinners: 2,
        nftsPerWinner: 2,
        minimumBid: '0.7',
        tierPosition: 0,
        description: 'My description',
        imageUrl: null,
        color: '#fff',
        createdAt: '2021-10-12T06:13:00.907Z',
        updatedAt: '2021-10-12T13:31:15.191Z',
        nfts: [
          {
            artworkType: 'png',
            collectionId: 1,
            createdAt: '2021-10-11T06:02:11.927Z',
            creator: '0xb76801d8d7e0261fcfa72d4b10cfd357c29741c3',
            description: 'test',
            id: 6819,
            name: 'Error NFT',
            numberOfEditions: 1,
            optimized_url:
              'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
            original_url: 'https://arweave.net/awDEKLF6zNnKt7dXmIGYGRdSksHAtpuC0P7BE0c7BbU',
            properties: null,
            royalties: null,
            thumbnail_url:
              'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
            tokenUri: 'https://arweave.net/vjUrgxpo8SYaPnPcRjIsymlBiY1qr9NH0qsAUdBlmkI',
            txHash: '0xf2a7f1110710f721da2b741a9056af7b1f2d89b6386ff29d24fad43a0dff0afd',
            updatedAt: '2021-10-11T06:02:11.927Z',
            url: 'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
          },
          {
            artworkType: 'png',
            collectionId: 1,
            createdAt: '2021-10-11T06:02:11.927Z',
            creator: '0xb76801d8d7e0261fcfa72d4b10cfd357c29741c3',
            description: 'test',
            id: 6819,
            name: 'Error NFT',
            numberOfEditions: 1,
            optimized_url:
              'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
            original_url: 'https://arweave.net/awDEKLF6zNnKt7dXmIGYGRdSksHAtpuC0P7BE0c7BbU',
            properties: null,
            royalties: null,
            thumbnail_url:
              'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
            tokenUri: 'https://arweave.net/vjUrgxpo8SYaPnPcRjIsymlBiY1qr9NH0qsAUdBlmkI',
            txHash: '0xf2a7f1110710f721da2b741a9056af7b1f2d89b6386ff29d24fad43a0dff0afd',
            updatedAt: '2021-10-11T06:02:11.927Z',
            url: 'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
          },
          {
            artworkType: 'png',
            collectionId: 1,
            createdAt: '2021-10-11T06:02:11.927Z',
            creator: '0xb76801d8d7e0261fcfa72d4b10cfd357c29741c3',
            description: 'test',
            id: 6819,
            name: 'Error NFT',
            numberOfEditions: 1,
            optimized_url:
              'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
            original_url: 'https://arweave.net/awDEKLF6zNnKt7dXmIGYGRdSksHAtpuC0P7BE0c7BbU',
            properties: null,
            royalties: null,
            tokenUri: 'https://arweave.net/vjUrgxpo8SYaPnPcRjIsymlBiY1qr9NH0qsAUdBlmkI',
            txHash: '0xf2a7f1110710f721da2b741a9056af7b1f2d89b6386ff29d24fad43a0dff0afd',
            updatedAt: '2021-10-11T06:02:11.927Z',
            url: 'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
          },
        ],
      },
    ],
    collections: [
      {
        id: 1,
        source: 'universe',
        txHash: null,
        address: '0xd3ccbb9f3e5b9678c5f4fef91055704df81a104c',
        owner: null,
        creator: null,
        name: 'Universe Core',
        symbol: 'NFUC',
        description: 'The Univers Core Collection',
        shortUrl: null,
        coverUrl: null,
        bannerUrl: null,
        publicCollection: true,
        createdAt: '2021-10-11T12:54:44.719Z',
        updatedAt: '2021-10-11T12:54:44.719Z',
      },
    ],
  },
  {
    id: 2,
    name: 'Auction 2',
    headline: null,
    startingBid: '0.1',
    tokenAddress: '0x000000000000000000000000000000',
    tokenSymbol: 'XYZ',
    tokenDecimals: 18,
    startDate: '2021-10-10T09:02:31.168Z',
    endDate: '2021-10-12T09:02:31.168Z',
    royaltySplits: [
      {
        address: '0x000000000000000000000000000000',
        percentAmount: 52.654,
      },
      {
        address: '0x000000000000000000000000000000',
        percentAmount: 100,
      },
    ],
    link: 'test',
    promoImageUrl: null,
    backgroundImageUrl: null,
    backgroundImageBlur: false,
    createdAt: '2021-10-12T06:13:00.907Z',
    updatedAt: '2021-10-12T06:13:00.907Z',
    rewardTiers: [
      {
        id: 1,
        auctionId: 1,
        name: 'New reward tier',
        numberOfWinners: 4,
        nftsPerWinner: 2,
        minimumBid: '0.7',
        tierPosition: 0,
        description: 'My description',
        imageUrl: null,
        color: '#fff',
        createdAt: '2021-10-12T06:13:00.907Z',
        updatedAt: '2021-10-12T13:31:15.191Z',
        nfts: [
          {
            artworkType: 'png',
            collectionId: 1,
            createdAt: '2021-10-11T06:02:11.927Z',
            creator: '0xb76801d8d7e0261fcfa72d4b10cfd357c29741c3',
            description: 'test',
            id: 6819,
            name: 'Error NFT',
            numberOfEditions: 1,
            optimized_url:
              'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
            original_url: 'https://arweave.net/awDEKLF6zNnKt7dXmIGYGRdSksHAtpuC0P7BE0c7BbU',
            properties: null,
            royalties: null,
            thumbnail_url:
              'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
            tokenUri: 'https://arweave.net/vjUrgxpo8SYaPnPcRjIsymlBiY1qr9NH0qsAUdBlmkI',
            txHash: '0xf2a7f1110710f721da2b741a9056af7b1f2d89b6386ff29d24fad43a0dff0afd',
            updatedAt: '2021-10-11T06:02:11.927Z',
            url: 'https://universeapp-assets-dev.s3.amazonaws.com/ea3b44dd96b71bd9033257f0e269370927ba927629194098.png',
          },
        ],
      },
    ],
    collections: [
      {
        id: 1,
        source: 'universe',
        txHash: null,
        address: '0xd3ccbb9f3e5b9678c5f4fef91055704df81a104c',
        owner: null,
        creator: null,
        name: 'Universe Core',
        symbol: 'NFUC',
        description: 'The Univers Core Collection',
        shortUrl: null,
        coverUrl: null,
        bannerUrl: null,
        publicCollection: true,
        createdAt: '2021-10-11T12:54:44.719Z',
        updatedAt: '2021-10-11T12:54:44.719Z',
      },
    ],
  },
];

const MyAuction = () => {
  const { myAuctions, setMyAuctions, setAuction, selectedTabIndex, setSelectedTabIndex, auction } =
    useAuctionContext();
  const { loggedInArtist } = useAuthContext();

  const tabTitles = ['My bids', 'Active auctions', 'Future auctions', 'Past auctions'];
  const tabs = { MyBids: 0, ActiveAuctions: 1, FutureAuctions: 2, PastAuctions: 3 };

  const [showButton, setShowButton] = useState(true);
  const history = useHistory();

  useEffect(() => {
    document.title = 'Universe Minting - My Auctions';
    return () => {
      document.title = 'Universe Minting';
    };
  }, []);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 500) {
        document.querySelector('.tab__right__arrow').style.display = 'flex';
      } else {
        document.querySelector('.tab__right__arrow').style.display = 'none';
        document.querySelector('.tab__left__arrow').style.display = 'none';
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    function handleShowButton() {
      if (window.innerWidth < 576) {
        if (
          selectedTabIndex === tabs.ActiveAuctions &&
          !myAuctions.filter(
            (item) =>
              item.launch &&
              moment(item.startDate).isBefore(moment.now()) &&
              !moment(item.endDate).isBefore(moment.now())
          ).length
        ) {
          setShowButton(false);
        } else if (
          selectedTabIndex === tabs.FutureAuctions &&
          !myAuctions.filter((item) => !item.launch).length
        ) {
          setShowButton(false);
        } else if (
          selectedTabIndex === tabs.PastAuctions &&
          !myAuctions.filter((item) => item.launch && moment(item.endDate).isBefore(moment.now()))
            .length
        ) {
          setShowButton(false);
        } else {
          setShowButton(true);
        }
      } else {
        setShowButton(true);
      }
    }
    window.addEventListener('resize', handleShowButton);
    handleShowButton();

    return () => window.removeEventListener('resize', handleShowButton);
  }, [selectedTabIndex]);

  return (
    <div className="container auction__page">
      <div className="auction__page__header">
        <h1 className="title">My auctions</h1>
        {showButton && (
          <div>
            <button
              type="button"
              className="light-button set_up"
              onClick={() => {
                setAuction({ rewardTiers: [] });
                return (
                  loggedInArtist.name && loggedInArtist.avatar && history.push('/setup-auction')
                );
              }}
              disabled={!loggedInArtist.name || !loggedInArtist.avatar}
            >
              Set up auction
            </button>
          </div>
        )}
      </div>

      <div className="auction__page__body">
        <div className="tabs__wrapper">
          <div className="tab__left__arrow">
            <img
              onClick={handleTabLeftScrolling}
              src={tabArrow}
              alt="Tab left arrow"
              aria-hidden="true"
            />
          </div>
          <ul className="tabs">
            {tabTitles.map((title, index) => (
              <li
                key={uuid()}
                className={selectedTabIndex === index ? 'active' : ''}
                onClick={() => setSelectedTabIndex(index)}
                aria-hidden="true"
              >
                {title}
              </li>
            ))}
          </ul>
          <div className="tab__right__arrow">
            <img
              onClick={handleTabRightScrolling}
              src={tabArrow}
              alt="Tab right arrow"
              aria-hidden="true"
            />
          </div>
        </div>

        {selectedTabIndex === tabs.MyBids && (
          <>
            {PLACEHOLDER_MY_BIDS.length ? (
              <MyBidsCard data={PLACEHOLDER_MY_BIDS} />
            ) : (
              <NoAuctionsFound
                title="No bids found"
                desc="Explore the auctions by clicking the button below"
                btnText="Auction house"
                btnAction="/minting-and-auctions/marketplace/active-auctions"
              />
            )}
          </>
        )}

        {selectedTabIndex === tabs.ActiveAuctions && (
          <>
            {activeAuctionsMock.filter(
              (item) =>
                item &&
                moment(item.startDate).isBefore(moment.now()) &&
                !moment(item.endDate).isBefore(moment.now())
            ).length ? (
              <ActiveAuctions
                myAuctions={activeAuctionsMock}
                setMyAuctions={setMyAuctions}
                setAuction={setAuction}
              />
            ) : (
              <NoAuctionsFound title="No active auctions found" />
            )}
          </>
        )}

        {selectedTabIndex === tabs.FutureAuctions && (
          <>
            {myAuctions.filter((item) => !item.launch).length ? (
              <FutureAuctions
                myAuctions={myAuctions}
                setMyAuctions={setMyAuctions}
                setAuction={setAuction}
              />
            ) : (
              <NoAuctionsFound title="No scheduled auctions found" />
            )}
          </>
        )}

        {selectedTabIndex === tabs.PastAuctions && (
          <>
            {pastAuctionsMock.filter((item) => item && moment(item.endDate).isBefore(moment.now()))
              .length ? (
              <PastAuctions myAuctions={pastAuctionsMock} setMyAuctions={setMyAuctions} />
            ) : (
              <NoAuctionsFound title="No past auctions found" />
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default MyAuction;
