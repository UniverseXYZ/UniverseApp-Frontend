import React, { useContext, useEffect, useState, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import NotFound from '../../components/notFound/NotFound.jsx';
import AppContext from '../../ContextAPI';
import './Collection.scss';
import Cover from '../../components/collection/Cover.jsx';
import Avatar from '../../components/collection/Avatar.jsx';
import Title from '../../components/collection/Title.jsx';
import Description from '../../components/collection/Description.jsx';
import Filters from '../../components/collection/Filters.jsx';
import MintModal from '../../components/mintModal/MintModal.jsx';
import NFTs from '../../components/collection/NFTs.jsx';

const Collection = () => {
  const { myNFTs, savedNfts, setDarkMode, showModal, setShowModal, deployedCollections } =
    useContext(AppContext);
  const location = useLocation();
  const selectedCollection = location.state ? location.state.collection : null;
  const [collectionNFTs, setCollectionNFTs] = useState([]);
  const [filteredNFTs, setFilteredNFTs] = useState([]);
  const [search, setSearch] = useState('');
  const history = useHistory();

  const handleClose = () => {
    document.body.classList.remove('no__scroll');
    setShowModal(false);
  };

  useEffect(() => {
    const newFilteredNFTs = [];
    collectionNFTs.forEach((nft) => {
      if (nft.name.toLowerCase().includes(search.toLowerCase())) {
        newFilteredNFTs.push(nft);
      }
    });
    setFilteredNFTs(newFilteredNFTs);
  }, [search]);

  useEffect(() => {
    setDarkMode(false);
    const newNFTs = [];
    if (location.state) {
      savedNfts.forEach((nft) => {
        if (nft.collectionId === selectedCollection.id) {
          newNFTs.push(nft);
        }
      });
      myNFTs.forEach((nft) => {
        if (nft.collectionId === selectedCollection.id) {
          newNFTs.push(nft);
        }
      });
    }
    setCollectionNFTs(newNFTs);
    setFilteredNFTs(newNFTs);
  }, [savedNfts, myNFTs]);

  useEffect(() => {
    let check = false;
    deployedCollections.forEach((col) => {
      if (
        selectedCollection.id === col.id &&
        selectedCollection.description === col.description &&
        selectedCollection.previewImage.name === col.previewImage.name
      ) {
        check = true;
      }
    });
    if (selectedCollection && !check) {
      history.push('/my-nfts');
    }
  }, [deployedCollections]);

  return selectedCollection ? (
    <div className="collection__page">
      <Cover selectedCollection={selectedCollection} />

      <div className="collection__details__section">
        <div className="collection__details__container">
          <Avatar selectedCollection={selectedCollection} />
          <Title selectedCollection={selectedCollection} saved={location.state.saved} />
          <Description selectedCollection={selectedCollection} />
          {collectionNFTs.length ? (
            <>
              <Filters search={search} setSearch={setSearch} filteredNFTs={filteredNFTs} />
              <NFTs filteredNFTs={filteredNFTs} />
            </>
          ) : (
            <></>
          )}
          {showModal && <MintModal open={showModal} onClose={handleClose} />}
        </div>
      </div>
    </div>
  ) : (
    <NotFound />
  );
};

export default Collection;
