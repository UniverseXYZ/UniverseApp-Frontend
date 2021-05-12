import React, { useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import nfuSocialNetworkIcon from '../../assets/images/nfu-social-network.svg';
import nfuAuctionsIcon from '../../assets/images/nfu-auctions.svg';
import nfuMarketIcon from '../../assets/images/nfu-market.svg';
import nfuGamingIcon from '../../assets/images/nfu-gaming.svg';
import nfuMediaProtocolsIcon from '../../assets/images/nfu-media-protocols.svg';
import nfuGovernanceIcon from '../../assets/images/nfu-governance.svg';
import ellipses from '../../assets/images/ellipses.svg';
import rightArrow from '../../assets/images/arrow-right.svg';

const NonFungibleUniverse = () => {
  const [nfus, setNfus] = useState([
    {
      id: 1,
      icon: nfuSocialNetworkIcon,
      title: 'NFT Social Network',
      description:
        'With the rise of decentralization and blockchain technologies, the community needs a decentralized social forum where they can communicate ideas without fear of an idea or art being censored.',
      loaded: false,
      action: 'Coming soon',
    },
    {
      id: 2,
      icon: nfuAuctionsIcon,
      title: 'Auctions',
      description:
        'Creating a decentralized NFT launch system that is made by artists for artists.',
      loaded: false,
      action: 'Explore',
    },
    {
      id: 3,
      icon: nfuMarketIcon,
      title: 'NFT Marketplace',
      description:
        'A universe of three initial planets with 23 OG characters each to memeify (69 total OG characters).',
      loaded: false,
      action: 'Coming soon',
    },
    {
      id: 4,
      icon: nfuGamingIcon,
      title: 'Gaming',
      description: 'Games built with WEB3 at their forefront, not added in as an afterthought.',
      loaded: false,
      action: 'Coming soon',
    },
    {
      id: 5,
      icon: nfuMediaProtocolsIcon,
      title: 'Media Protocols',
      description:
        'A meeting place where fans and artists can meet and discover new ways a decentralized community can support and interact with their favorite WEB3 media protocols.',
      loaded: false,
      action: 'Coming soon',
    },
    {
      id: 6,
      icon: nfuGovernanceIcon,
      title: 'DAO and Governance',
      description:
        'kekDAO is intent on leading the way in the adoption of new approaches, technologies, and standards that have been proven superior to the established way of doing things.',
      loaded: false,
      action: 'Explore',
    },
  ]);

  const handleLoaded = (idx) => {
    const newNfus = [...nfus];
    newNfus[idx].loaded = true;
    setNfus(newNfus);
  };

  return (
    <div className="non__fungible__universe__section">
      <img className="ellipse-l" src={ellipses} alt="Ellipses" />
      <img className="ellipse-r" src={ellipses} alt="Ellipses" />
      <div className="non__fungible__universe__section__container">
        <h1 className="title">Non-Fungible Universe</h1>
        <div className="nfu__grid">
          {nfus.map((nfu, index) => (
            <div className="nfu__grid__item" key={nfu.id}>
              {!nfu.loaded && (
                <div>
                  <SkeletonTheme color="#202020" highlightColor="#444">
                    <Skeleton circle height={50} width={50} />
                    <h2 className="title">
                      <Skeleton />
                    </h2>
                    <p className="desc">
                      <Skeleton height={150} />
                    </p>
                  </SkeletonTheme>
                </div>
              )}
              <div
                style={{
                  display: nfu.loaded ? 'block' : 'none',
                  height: '100%',
                  position: 'relative',
                }}
              >
                <AnimatedOnScroll animationIn="fadeIn">
                  <img src={nfu.icon} alt={nfu.title} onLoad={() => handleLoaded(index)} />
                  <h2 className="title">{nfu.title}</h2>
                  <p className="desc">{nfu.description}</p>
                  {nfu.action === 'Explore' ? (
                    <button type="button">
                      {nfu.action}
                      <img src={rightArrow} alt="Arrow" />
                    </button>
                  ) : (
                    <button type="button" disabled>
                      {nfu.action}
                    </button>
                  )}
                </AnimatedOnScroll>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NonFungibleUniverse;
