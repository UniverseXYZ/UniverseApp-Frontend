import React, { useContext, useEffect, useState, useRef } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import NotFound from '../../components/notFound/NotFound.jsx';
import './Collection.scss';
import Cover from '../../components/collection/Cover.jsx';
import Avatar from '../../components/collection/Avatar.jsx';
import Title from '../../components/collection/Title.jsx';
import Description from '../../components/collection/Description.jsx';
import Button from '../../components/button/Button.jsx';
import pencilIcon from '../../assets/images/edit.svg';
import NFTCard from '../../components/nft/NFTCard.jsx';
import bubbleIcon from '../../assets/images/text-bubble.png';
import CollectionSearchFilters from '../../components/nft/CollectionSearchFilters.jsx';
import { getCollectionData } from '../../utils/api/mintNFT';
import { useThemeContext } from '../../contexts/ThemeContext.jsx';
import { useMyNftsContext } from '../../contexts/MyNFTsContext.jsx';
import { useAuthContext } from '../../contexts/AuthContext.jsx';
import SimplePagination from '../../components/pagination/SimplePaginations.jsx';
import ItemsPerPageDropdown from '../../components/pagination/ItemsPerPageDropdown.jsx';
import '../../components/pagination/Pagination.scss';

const Collection = () => {
  const { setSavedCollectionID } = useMyNftsContext();
  const { address } = useAuthContext();
  const { setDarkMode } = useThemeContext();
  const { collectionAddress } = useParams();
  const location = useLocation();
  const [collectionNFTs, setCollectionNFTs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredNFTs, setFilteredNFTs] = useState([]);
  const [search, setSearch] = useState('');
  const history = useHistory();
  const [quantity, setQuantity] = useState(8);
  const ref = useRef(null);
  const [collectionData, setCollectionData] = useState(null);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [ownersCount, setOwnersCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(8);

  const handleClose = () => {
    document.body.classList.remove('no__scroll');
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
    if (search) {
      const newFilteredNFTs = collectionNFTs.filter((item) =>
        item.name.toLowerCase().includes(search.toLocaleLowerCase())
      );
      setFilteredNFTs(newFilteredNFTs);
    } else {
      setFilteredNFTs(collectionNFTs);
    }
  }, [search]);

  useEffect(async () => {
    setDarkMode(false);

    const data = await getCollectionData(collectionAddress);
    const cNFTs = data.nfts || [];
    console.log(cNFTs);

    if (!data.message) setCollectionData(data);

    setCollectionNFTs([...cNFTs]);
    setFilteredNFTs([...cNFTs]);
    setLoading(false);
  }, []);

  const handleEdit = (id) => {
    setSavedCollectionID(id);
    history.push('/my-nfts/create', { tabIndex: 1, nftType: 'collection' });
  };
  console.log(collectionData);
  return loading ? (
    <></>
  ) : collectionData ? (
    <div className="collection__page">
      <Cover selectedCollection={collectionData.collection} />

      <div className="collection__details__section">
        <div className="collection__details__container">
          <Avatar selectedCollection={collectionData.collection} />
          <Title
            selectedCollection={collectionData.collection}
            saved={location.state?.saved}
            nftsCount={collectionNFTs.length}
            ownersCount={ownersCount}
          />
        </div>
        <Description selectedCollection={collectionData.collection} />
        {address === collectionData?.collection?.owner ? (
          <div className="collection__edit">
            <Button
              className="light-border-button"
              onClick={() => handleEdit(collectionData.collection.id)}
            >
              <span>Edit</span>
              <img src={pencilIcon} alt="Edit Icon" />
            </Button>
          </div>
        ) : (
          <></>
        )}
        <div className="collection--nfts--container">
          <CollectionSearchFilters data={collectionNFTs} setData={setFilteredNFTs} />
          {filteredNFTs.filter((nft) => !nft.hidden).length ? (
            <>
              <div className="nfts__lists">
                {filteredNFTs
                  .slice(offset, offset + perPage)
                  .filter((nft) => !nft.hidden)
                  .map(
                    (nft, index) =>
                      index < quantity && (
                        <NFTCard
                          key={nft.id}
                          nft={{
                            ...nft,
                            collection: collectionData.collection,
                          }}
                          collectionAddress={collectionAddress}
                        />
                      )
                  )}
              </div>
              <div className="pagination__container">
                <SimplePagination
                  data={filteredNFTs}
                  perPage={perPage}
                  setOffset={setOffset}
                  setPage={setPage}
                  page={page}
                />
                <ItemsPerPageDropdown
                  perPage={perPage}
                  setPerPage={setPerPage}
                  itemsPerPage={[8, 16, 32]}
                />
              </div>
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
