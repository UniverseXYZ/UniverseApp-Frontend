import React, { useState } from 'react';
import { Animated } from 'react-animated-css';
import uuid from 'react-uuid';
import arrowDown from '../../../../assets/images/browse-nft-arrow-down.svg';
import searchIcon from '../../../../assets/images/search-gray.svg';
import creatorImg from '../../../../assets/images/Justin-3LAU.png';

const Creators = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [creators, setCreators] = useState([
    {
      name: 'Justin 3LAU',
      avatar: creatorImg,
    },
    {
      name: 'John Dues',
      avatar: creatorImg,
    },
    {
      name: 'John Crypto Cartel',
      avatar: creatorImg,
    },
    {
      name: 'Justin 3LAU',
      avatar: creatorImg,
    },
  ]);

  return (
    <div className="browse--nft--sidebar--filtration--item">
      <div
        className="browse--nft--sidebar--filtration--item--header"
        aria-hidden="true"
        onClick={() => setShowFilters(!showFilters)}
      >
        <h3>Creators</h3>
        <img src={arrowDown} alt="Arrow Down" className={showFilters ? 'rotate' : ''} />
      </div>
      {showFilters ? (
        <Animated animationIn="fadeIn">
          <div className="browse--nft--sidebar--filtration--item--content">
            <div className="search--field">
              <input type="text" placeholder="Search artists" />
              <img src={searchIcon} alt="Search" />
            </div>
            {creators.map((creator) => (
              <div className="creators--list" key={uuid()}>
                <img src={creator.avatar} alt={creator.name} />
                <p>{creator.name}</p>
              </div>
            ))}
          </div>
        </Animated>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Creators;
