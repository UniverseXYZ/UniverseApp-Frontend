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
import Button from '../../components/button/Button.jsx';
import pencilIcon from '../../assets/images/edit.svg';

const Collection = () => {
  const {
    myNFTs,
    savedNfts,
    setDarkMode,
    showModal,
    setShowModal,
    deployedCollections,
    setSavedCollectionID,
    setActiveView,
  } = useContext(AppContext);
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
      myNFTs.forEach((nft) => {
        if (nft.collectionId === selectedCollection.id) {
          newNFTs.push(nft);
        }
      });
    }
    setCollectionNFTs(newNFTs);
    setFilteredNFTs(newNFTs);
  }, [myNFTs]);

  useEffect(() => {
    let check = false;
    if (selectedCollection) {
      deployedCollections.forEach((col) => {
        if (
          selectedCollection.id === col.id &&
          selectedCollection.description === col.description &&
          selectedCollection.previewImage.name === col.previewImage.name
        ) {
          check = true;
        }
      });
    }
    if (selectedCollection && !check) {
      history.push('/my-nfts');
    }
  }, [deployedCollections]);

  const handleEdit = (id) => {
    setSavedCollectionID(id);
    history.push('/my-nfts/create', { tabIndex: 1, nftType: 'collection' });
  };
  console.log(selectedCollection);
  return selectedCollection ? (
    <div className="collection__page">
      <Cover selectedCollection={selectedCollection} />

      <div className="collection__details__section">
        <div className="collection__details__container">
          <Avatar selectedCollection={selectedCollection} />
          <Title selectedCollection={selectedCollection} saved={location.state.saved} />

          {showModal && <MintModal open={showModal} onClose={handleClose} />}
        </div>
        <Description selectedCollection={selectedCollection} />
        <div className="collection__edit">
          <Button className="light-border-button" onClick={() => handleEdit(selectedCollection.id)}>
            <span>Edit</span>
            <img src={pencilIcon} alt="Edit Icon" />
          </Button>
        </div>
        {collectionNFTs.filter((nft) => !nft.hidden).length ? (
          <>
            <Filters search={search} setSearch={setSearch} filteredNFTs={filteredNFTs} />
            <NFTs filteredNFTs={filteredNFTs} />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  ) : (
    <NotFound />
  );
};

export default Collection;
