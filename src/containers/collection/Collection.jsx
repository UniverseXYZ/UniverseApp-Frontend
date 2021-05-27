import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NotFound from '../../components/notFound/NotFound.jsx';
import AppContext from '../../ContextAPI';
import './Collection.scss';
import Cover from '../../components/collection/Cover.jsx';
import Avatar from '../../components/collection/Avatar.jsx';
import Title from '../../components/collection/Title.jsx';
import Description from '../../components/collection/Description.jsx';
import Filters from '../../components/collection/Filters.jsx';

const Collection = () => {
  const { myNFTs, setWebsite } = useContext(AppContext);
  const location = useLocation();
  const selectedCollection = location.state ? location.state.collection : null;
  const [collectionNFTs, setCollectionNFTs] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setWebsite(false);
    const newNFTs = [];
    myNFTs.forEach((nft) => {
      if (nft.collectionId === selectedCollection.id) {
        newNFTs.push(nft);
      }
    });
    setCollectionNFTs(newNFTs);
  }, []);

  useEffect(() => {
    console.log('selectedCollection', selectedCollection);
    console.log('collectionNFTs', collectionNFTs);
  }, [collectionNFTs]);

  return selectedCollection ? (
    <div className="collection__page">
      <Cover selectedCollection={selectedCollection} />

      <div className="collection__details__section">
        <div className="collection__details__container">
          <Avatar selectedCollection={selectedCollection} />
          <Title selectedCollection={selectedCollection} />
          <Description selectedCollection={selectedCollection} />
          <Filters />
        </div>
      </div>
    </div>
  ) : (
    <NotFound />
  );
};

export default Collection;
