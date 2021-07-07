import uuid from 'react-uuid';
import userCoverPhoto from '../../assets/images/my-profile-cover-photo.png';
import userAvatar from '../../assets/images/my-profile-avatar.png';
import CryptoPunks from '../../assets/images/my-profile/my-communities/communitie1.png';
import CommunityVerified from '../../assets/images/my-profile/my-communities/communitie2.png';
import MeetCommunityVerified from '../../assets/images/my-profile/my-communities/communitie3.png';

// top nfts
import nfts1 from '../../assets/images/my-profile/top-5-nfts/top-nfts-img1.png';
import nfts2 from '../../assets/images/my-profile/top-5-nfts/top-nfts-img2.png';
import nfts3 from '../../assets/images/my-profile/top-5-nfts/top-nfts-img3.png';
import nfts4 from '../../assets/images/my-profile/top-5-nfts/top-nfts-img4.png';

// sale on nfts
import saleOnNft1 from '../../assets/images/my-profile/sale-on-nfts/sale-on-nft1.png';
import saleOnNft2 from '../../assets/images/my-profile/sale-on-nfts/sale-on-nft2.png';
import saleOnNft3 from '../../assets/images/my-profile/sale-on-nfts/sale-on-nft3.png';
import saleOnNft4 from '../../assets/images/my-profile/sale-on-nfts/sale-on-nft4.png';
import saleOnNft5 from '../../assets/images/my-profile/sale-on-nfts/sale-on-nft5.png';

// featured auctions
import featuredAuctions1 from '../../assets/images/my-profile/featured-auctions/featured-auctions1.png';
import featuredAuctions2 from '../../assets/images/my-profile/featured-auctions/featured-auctions2.png';
import featuredAuctions3 from '../../assets/images/my-profile/featured-auctions/featured-auctions3.png';
import featuredAuctions4 from '../../assets/images/my-profile/featured-auctions/featured-auctions4.png';
import featuredAuctions5 from '../../assets/images/my-profile/featured-auctions/featured-auctions5.png';

export default {
  coverPhoto: userCoverPhoto,
  name: 'Justin 3LAU',
  avatar: userAvatar,
  uid: uuid(),
  following: 58,
  followers: 79,
  about: `
  Cras vel eget vitae quis scelerisque arcu ut. Tristique velit nec sed sit massa. Odio molestie velit purus at blandit. Lacus.`,
  communities: [
    { name: 'CryptoPunks', image: CryptoPunks, members: 10622 },
    { name: 'Meet Community Verified', image: CommunityVerified, members: 10622 },
    { name: 'Meet Community Verified', image: MeetCommunityVerified, members: 10622 },
    { name: 'CryptoPunks', image: CryptoPunks, members: 10622 },
    { name: 'Meet Community Verified', image: CommunityVerified, members: 10622 },
    { name: 'Meet Community Verified', image: MeetCommunityVerified, members: 10622 },
    { name: 'CryptoPunks', image: CryptoPunks, members: 10622 },
    { name: 'CryptoPunks', image: CryptoPunks, members: 10622 },
    { name: 'Meet Community Verified', image: MeetCommunityVerified, members: 10622 },
  ],
  topNfts: [
    { image: nfts1, name: 'nfts 1' },
    { image: nfts2, name: 'nfts 2' },
    { image: nfts3, name: 'nfts 3' },
    { image: nfts4, name: 'nfts 4' },
    { image: nfts1, name: 'nfts 5' },
  ],
  saleOnNfts: [
    { image: saleOnNft1, name: 'sale on nfts 1' },
    { image: saleOnNft2, name: 'sale on nfts 2' },
    { image: saleOnNft3, name: 'sale on nfts 3' },
    { image: saleOnNft4, name: 'sale on nfts 4' },
    { image: saleOnNft5, name: 'sale on nfts 5' },
    { image: saleOnNft2, name: 'sale on nfts 5' },
    { image: saleOnNft4, name: 'sale on nfts 5' },
    { image: saleOnNft5, name: 'sale on nfts 5' },
    { image: saleOnNft1, name: 'sale on nfts 5' },
    { image: saleOnNft3, name: 'sale on nfts 5' },
    { image: saleOnNft2, name: 'sale on nfts 5' },
    { image: saleOnNft3, name: 'sale on nfts 5' },
  ],
  auctions: [
    { image: featuredAuctions1, name: 'auction 1' },
    { image: featuredAuctions2, name: 'auction 2' },
    { image: featuredAuctions3, name: 'auction 3' },
    { image: featuredAuctions4, name: 'auction 4' },
    { image: featuredAuctions5, name: 'auction 5' },
    { image: featuredAuctions2, name: 'auction 6' },
    { image: featuredAuctions4, name: 'auction 7' },
    { image: featuredAuctions5, name: 'auction 8' },
    { image: featuredAuctions1, name: 'auction 9' },
    { image: featuredAuctions3, name: 'auction 10' },
    { image: featuredAuctions2, name: 'auction 11' },
    { image: featuredAuctions3, name: 'auction 12' },
  ],
  transactions: [
    {
      name: 'Nft Name',
      type: 'listing',
      price: 0.037,
      priceType: 'eth',
      hoursAgo: 13,
      image: featuredAuctions3,
    },
    {
      name: 'Nft Name',
      type: 'sale',
      price: 0.037,
      priceType: 'eth',
      hoursAgo: 13,
      image: featuredAuctions5,
    },
    {
      name: 'Nft Name',
      type: 'transfer',
      price: 0.037,
      priceType: 'eth',
      hoursAgo: 13,
      image: saleOnNft3,
    },
    {
      name: 'Nft Name',
      type: 'transfer',
      price: 0.037,
      priceType: 'eth',
      hoursAgo: 13,
      image: saleOnNft3,
    },
    {
      name: 'Nft Name',
      type: 'offer',
      price: 0.037,
      priceType: 'eth',
      hoursAgo: 13,
      image: saleOnNft5,
    },
    {
      name: 'Nft Name',
      type: 'burn',
      price: 0.037,
      priceType: 'eth',
      hoursAgo: 13,
      image: saleOnNft4,
    },
    {
      name: 'Nft Name',
      type: 'listing',
      price: 0.037,
      priceType: 'eth',
      hoursAgo: 13,
      image: featuredAuctions3,
    },
    {
      name: 'Nft Name',
      type: 'sale',
      price: 0.037,
      priceType: 'eth',
      hoursAgo: 13,
      image: featuredAuctions4,
    },
    {
      name: 'Nft Name',
      type: 'transfer',
      price: 0.037,
      priceType: 'eth',
      hoursAgo: 13,
      image: featuredAuctions4,
    },
    {
      name: 'Nft Name',
      type: 'offer',
      price: 0.037,
      priceType: 'eth',
      hoursAgo: 13,
      image: saleOnNft4,
    },
    {
      name: 'Nft Name',
      type: 'burn',
      price: 0.037,
      priceType: 'eth',
      hoursAgo: 13,
      image: featuredAuctions4,
    },
  ],
};
