import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import WrapperCenter from '../polymorphs/WrapperCenter';
import CoverPhoto from './CoverPhoto';
import UserDataBlock from './UserDataBlock';
import MyCommunities from './MyCommunities';
import RightBlockTopLinks from './RightBlockTopLinks';
import GallerySection from './GallerySection';
import RecentActivity from './RecentActivity';
import marketplaceIcon from '../../assets/images/nft-marketplace.svg';
import galleryIcon from '../../assets/images/my-nfts.svg';
import auctionIcon from '../../assets/images/auction-house.svg';
import btnAddIcon from '../../assets/images/add-icon.svg';
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

const colors = [
  '#FFCCBC',
  '#FFCDD2',
  '#F8BBD0',
  '#E1BEE7',
  '#D1C4E9',
  '#C5CAE9',
  '#BBDEFB',
  '#B3E5FC',
  '#B2EBF2',
  '#B2DFDB',
  '#C8E6C9',
  '#DCEDC8',
  '#F0F4C3',
  '#FFF9C4',
  '#FFECB3',
  '#FFE0B2',
  '#FFCCBC',
  '#D7CCC8',
];

const MyProfileContainer = (props) => {
  const [color] = useState(colors[parseInt(Math.random() * 18, 10)]);
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
    transactions,
  } = user;
  return (
    <div className="my--profile--container">
      <CoverPhoto coverPhoto={coverPhoto} color={color} />
      <WrapperCenter className="my--profile--wrapper">
        <div className="left--column">
          <UserDataBlock
            name={name}
            avatar={avatar}
            uid={uid}
            following={following}
            followers={followers}
            about={about}
            color={color}
          />
          <MyCommunities communities={communities} />
        </div>
        <div className="right--column">
          <AnimatedOnScroll animationIn="fadeIn" animationInDelay={200}>
            <RightBlockTopLinks links={rightTopLinks} />
          </AnimatedOnScroll>
          <AnimatedOnScroll animationIn="fadeIn" animationInDelay={300}>
            <GallerySection
              gallery={topNfts}
              className="top--nfts"
              title="🔥 Top 5 NFTs"
              emptyGalleryText="Your hasn’t choose your top NFT’s yet"
              btnText="Add"
              btnIcon={btnAddIcon}
            />
          </AnimatedOnScroll>
          <AnimatedOnScroll animationIn="fadeIn" animationInDelay={400}>
            <GallerySection
              gallery={saleOnNfts}
              className="nfts--on--sale"
              title="🛒 NFTs On Sale"
              actionText="View all NFT listings"
              emptyGalleryText="Your hasn’t choose your top NFT’s on Sale"
              btnText="Add"
              btnIcon={btnAddIcon}
            />
          </AnimatedOnScroll>
          <AnimatedOnScroll animationIn="fadeIn" animationInDelay={500}>
            <GallerySection
              gallery={auctions}
              className="featured--auctions"
              title="🖲 Featured Auctions"
              actionText="View all active auctions"
              emptyGalleryText="No auction found"
              btnText="Set up auction"
            />
          </AnimatedOnScroll>
          <AnimatedOnScroll animationIn="fadeIn" animationInDelay={300}>
            <RecentActivity transactions={transactions} />
          </AnimatedOnScroll>
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
    transactions: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.string,
        price: PropTypes.number,
        priceTypes: PropTypes.string,
        hoursAgo: PropTypes.number,
        image: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default MyProfileContainer;
