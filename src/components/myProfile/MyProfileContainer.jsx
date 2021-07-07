import React from 'react';
import PropTypes from 'prop-types';
import WrapperCenter from '../polymorphs/WrapperCenter';
import CoverPhoto from './CoverPhoto';
import UserDataBlock from './UserDataBlock';
import MyCommunities from './MyCommunities';
import RightBlockTopLinks from './RightBlockTopLinks';
import GallerySection from './GallerySection';
import marketplaceIcon from '../../assets/images/nft-marketplace.svg';
import galleryIcon from '../../assets/images/my-nfts.svg';
import auctionIcon from '../../assets/images/auction-house.svg';
import './styles/MyProfileContainer.scss';

const rightTopLinks = [
  { text: 'NFTs', className: 'nfts', href: '/my-profile', icon: galleryIcon },
  { text: 'Auctions', className: 'auctions', href: '/my-profile', icon: auctionIcon },
  {
    text: 'Social galleries',
    className: 'social-galleries',
    href: '/my-profile',
    icon: marketplaceIcon,
  },
];

const MyProfileContainer = (props) => {
  const { user } = props;
  const {
    coverPhoto,
    name,
    avatar,
    uid,
    following,
    followers,
    about,
    communities,
    topNfts,
    saleOnNfts,
    auctions,
  } = user;
  console.log(user);
  return (
    <div className="my--profile--container">
      <CoverPhoto coverPhoto={coverPhoto} />
      <WrapperCenter className="my--profile--wrapper">
        <div className="left--column">
          <UserDataBlock
            name={name}
            avatar={avatar}
            uid={uid}
            following={following}
            followers={followers}
            about={about}
          />
          <MyCommunities communities={communities} />
        </div>
        <div className="right--column">
          <RightBlockTopLinks links={rightTopLinks} />
          <GallerySection gallery={topNfts} className="top--nfts" title="🔥 Top 5 NFTs" />
          <GallerySection
            gallery={saleOnNfts}
            className="nfts--on--sale"
            title="🛒 NFTs On Sale"
            actionText="View all NFT listings"
          />
          <GallerySection
            gallery={auctions}
            className="featured--auctions"
            title="🖲 Featured Auctions"
            actionText="View all active auctions"
          />
        </div>
      </WrapperCenter>
    </div>
  );
};

MyProfileContainer.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    uid: PropTypes.string,
    following: PropTypes.number,
    followers: PropTypes.number,
    about: PropTypes.string,
    avatar: PropTypes.string,
    coverPhoto: PropTypes.string,
    communities: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        image: PropTypes.string,
        members: PropTypes.number,
      })
    ),
    topNfts: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string,
        name: PropTypes.string,
      })
    ),
    saleOnNfts: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string,
        name: PropTypes.string,
      })
    ),
    auctions: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string,
        name: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default MyProfileContainer;
