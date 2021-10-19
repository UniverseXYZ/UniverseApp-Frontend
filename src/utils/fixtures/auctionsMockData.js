export const pastAuctionsMock = [
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
    bids: [
      {
        id: 1,
        amount: 0.15,
        userId: 1,
      },
      {
        id: 2,
        amount: 0.01,
        userId: 2,
      },
      {
        id: 3,
        amount: 0.4,
        userId: 1,
      },
      {
        id: 4,
        amount: 5,
        userId: 3,
      },
      {
        id: 5,
        amount: 0.65,
        userId: 2,
      },
      {
        id: 6,
        amount: 0.72,
        userId: 10,
      },
    ],
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
    bids: [
      {
        id: 1,
        amount: 3.55,
        userId: 1,
      },
      {
        id: 2,
        amount: 2,
        userId: 2,
      },
      {
        id: 3,
        amount: 17.5,
        userId: 3,
      },
    ],
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

export const activeAuctionsMock = [
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
    currency: 'ETH',
    bids: [
      {
        id: 1,
        amount: 0.15,
        userId: 1,
      },
      {
        id: 2,
        amount: 0.01,
        userId: 2,
      },
      {
        id: 3,
        amount: 0.4,
        userId: 1,
      },
      {
        id: 4,
        amount: 5,
        userId: 3,
      },
      {
        id: 5,
        amount: 0.65,
        userId: 2,
      },
      {
        id: 6,
        amount: 0.72,
        userId: 10,
      },
    ],
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
    currency: 'ETH',
    bids: [
      {
        id: 1,
        amount: 0.15,
        userId: 1,
      },
      {
        id: 2,
        amount: 0.34,
        userId: 2,
      },
      {
        id: 3,
        amount: 0.4,
        userId: 1,
      },
      {
        id: 4,
        amount: 0.5,
        userId: 3,
      },
      {
        id: 5,
        amount: 0.65,
        userId: 2,
      },
      {
        id: 6,
        amount: 0.72,
        userId: 10,
      },
    ],
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
