import React, { useContext, useEffect, useState, useRef } from 'react';
import { Contract } from 'ethers';
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
import NFTCard from '../../components/nft/NFTCard.jsx';
import LoadMore from '../../components/pagination/LoadMore.jsx';
import bubbleIcon from '../../assets/images/text-bubble.png';
import plusIcon from '../../assets/images/plus.svg';
import SearchFilters from '../../components/nft/SearchFilters.jsx';
import { getCollectionData } from '../../utils/api/mintNFT';
import { useThemeContext } from '../../contexts/ThemeContext.jsx';
import { useMyNftsContext } from '../../contexts/MyNFTsContext.jsx';

const Collection = () => {
  const { showModal, setShowModal, setSavedCollectionID } = useMyNftsContext();
  const { setDarkMode } = useThemeContext();
  const location = useLocation();
  const collectionId = location.state ? location.state.collection.id : null;
  const [collectionNFTs, setCollectionNFTs] = useState([]);
  const [filteredNFTs, setFilteredNFTs] = useState([]);
  const [search, setSearch] = useState('');
  const history = useHistory();
  const [quantity, setQuantity] = useState(8);
  const ref = useRef(null);
  const [collectionData, setCollectionData] = useState(null);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [ownersCount, setOwnersCount] = useState(0);

  const handleClose = () => {
    document.body.classList.remove('no__scroll');
    setShowModal(false);
  };

  // TODO:: This code may be useful if we need any data from the collection contract
  // const getCollectionOwnersInt = async (address, abi, txSigner) => {
  //   const contract = new Contract(address, abi, txSigner);
  //   const owners = await contract.totalSupply();
  //   return owners.toNumber();
  // };

  // useEffect(async () => {
  //   if (contracts && collectionData) {
  //     const owners = await getCollectionOwnersInt(
  //       collectionData.collection.address,
  //       contracts.UniverseERC721Core.abi,
  //       signer
  //     );
  //     setOwnersCount(owners);
  //   }
  // }, [contracts, collectionData]);

  useEffect(() => {
    const newFilteredNFTs = [];
    collectionNFTs.forEach((nft) => {
      if (nft.name.toLowerCase().includes(search.toLowerCase())) {
        newFilteredNFTs.push(nft);
      }
    });
    setFilteredNFTs(newFilteredNFTs);
  }, [search]);

  useEffect(async () => {
    setDarkMode(false);

    const data = await getCollectionData(collectionId);
    const cNFTs = data.nfts || [];

    if (!data.message) setCollectionData(data);

    setCollectionNFTs([...cNFTs]);
    setFilteredNFTs([...cNFTs]);
  }, []);

  const handleEdit = (id) => {
    setSavedCollectionID(id);
    history.push('/my-nfts/create', { tabIndex: 1, nftType: 'collection' });
  };

  return collectionData ? (
    <div className="collection__page">
      <Cover selectedCollection={collectionData.collection} />

      <div className="collection__details__section">
        <div className="collection__details__container">
          <Avatar selectedCollection={collectionData.collection} />
          <Title
            selectedCollection={collectionData.collection}
            saved={location.state.saved}
            nftsCount={collectionNFTs.length}
            ownersCount={ownersCount}
          />

          {showModal && <MintModal open={showModal} onClose={handleClose} />}
        </div>
        <Description selectedCollection={collectionData.collection} />
        <div className="collection__edit">
          <Button
            className="light-border-button"
            onClick={() => handleEdit(collectionData.collection.id)}
          >
            <span>Edit</span>
            <img src={pencilIcon} alt="Edit Icon" />
          </Button>
        </div>
        <div className="collection--nfts--container">
          <SearchFilters data={collectionNFTs} />
          {collectionNFTs.filter((nft) => !nft.hidden).length ? (
            <>
              <div className="nfts__lists">
                {collectionNFTs
                  .filter((nft) => !nft.hidden)
                  .map((nft, index) => index < quantity && <NFTCard key={nft.id} nft={nft} />)}
              </div>
              {collectionNFTs.filter((nft) => !nft.hidden).length > quantity && (
                <LoadMore quantity={quantity} setQuantity={setQuantity} perPage={8} />
              )}
            </>
          ) : (
            <div className="empty__nfts">
              <div className="tabs-empty">
                <div className="image-bubble">
                  <img src={bubbleIcon} alt="bubble-icon" />
                </div>
                <h3>No NFTs found</h3>
                <p>Create NFTs or NFT collections with our platform by clicking the button below</p>
                <Button
                  ref={ref}
                  className={`create--nft--dropdown  ${
                    isDropdownOpened ? 'opened' : ''
                  } light-button`}
                  onClick={() =>
                    history.push('/my-nfts/create', { tabIndex: 1, nftType: 'single' })
                  }
                  aria-hidden="true"
                >
                  Create NFT
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <NotFound />
  );
};

export default Collection;
