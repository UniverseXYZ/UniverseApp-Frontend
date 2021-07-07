import React, { useState } from 'react';
import { Animated } from 'react-animated-css';
import uuid from 'react-uuid';
import arrowDown from '../../../../assets/images/browse-nft-arrow-down.svg';
import searchIcon from '../../../../assets/images/search-gray.svg';
import collectionImg from '../../../../assets/images/ntf1.svg';

const Collections = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [collections, setCollections] = useState([
    {
      name: 'Jaboc end',
      avatar: collectionImg,
    },
    {
      name: 'Jam Skipper Gemx',
      avatar: collectionImg,
    },
    {
      name: 'Crypto Cartel',
      avatar: collectionImg,
    },
    {
      name: 'Jaboc end',
      avatar: collectionImg,
    },
  ]);

  return (
    <div className="browse--nft--sidebar--filtration--item">
      <div
        className="browse--nft--sidebar--filtration--item--header"
        aria-hidden="true"
        onClick={() => setShowFilters(!showFilters)}
      >
        <h3>Collections</h3>
      </div>
      <Animated animationIn="fadeIn">
        <div className="browse--nft--sidebar--filtration--item--content">
          <div className="search--field">
            <input type="text" placeholder="Search collections" />
            <img src={searchIcon} alt="Search" />
          </div>
          {collections.map((col) => (
            <div className="collections--list" key={uuid()}>
              <img src={col.avatar} alt={col.name} />
              <p>{col.name}</p>
            </div>
          ))}
        </div>
      </Animated>
    </div>
  );
};

export default Collections;
