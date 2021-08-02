import React, { useState, useEffect, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import '../pagination/Pagination.scss';
import './UniverseNFTs.scss';
import uuid from 'react-uuid';
import Popup from 'reactjs-popup';
import AppContext from '../../ContextAPI';
import Button from '../button/Button.jsx';
import Pagination from '../pagination/Pagionation';
import ItemsPerPageDropdown from '../pagination/ItemsPerPageDropdown';
import { UNIVERSE_NFTS } from '../../utils/fixtures/NFTsUniverseDummyData';
import arrowDown from '../../assets/images/arrow-down.svg';
import neverScrambledIcon from '../../assets/images/never-scrambled-badge.svg';
import bubbleIcon from '../../assets/images/text-bubble.png';
import singleTraitScrambledIcon from '../../assets/images/single-trait-scrambled-badge.svg';
import videoIcon from '../../assets/images/video-icon.svg';
import SortByOrder from '../input/SortByOrder.jsx';
import SortBySelect from '../input/SortBySelect.jsx';
import SearchField from '../input/SearchField.jsx';
import RarityChartsLoader from '../../containers/rarityCharts/RarityChartsLoader.jsx';
import UniverseNFTsList from './universeNFTsList/UniverseNFTsList.jsx';
import RarityChartFiltersPopup from '../popups/RarityChartFiltersPopup.jsx';
import filterIcon from '../../assets/images/filters-icon-black.svg';

const UniverseNFTs = () => {
  const { setSelectedNftForScramble } = useContext(AppContext);
  const history = useHistory();
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(12);
  const ref = useRef(null);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState('All characters');
  const [searchByName, setSearchByName] = useState('');
  const [desc, setDesc] = useState(false);
  const [polymorphData, setPolymorphData] = useState([...UNIVERSE_NFTS]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([
    {
      id: uuid(),
      title: 'Headwear',
      traits: [
        {
          id: uuid(),
          name: 'No Headwear',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Amish Hat',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Astronaut Helmet',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Party Hat',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Black Golf Hat',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Black Ninja Headband',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Black Ushanka',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Blue Beanie',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Brown Ushanka',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Caesar Hat',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Clown Hat',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Copter Hat',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Golden Hat',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Golden Knight Helmet',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Golden Spartan Helmet',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Green Beanie',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Grey Football Helmet',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Marine Helmet',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Old Hat',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Platinum Spartan Helmet',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Purple Ushanka',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Rainbow Cap',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Red Beanie',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Red Football Helmet',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Silver Knight Helmet',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Silver Spartan Helmet',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Straw Hat',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Sushi Chef Hat',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Traffic Cone',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Tuxedo Hat',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Violet Beanie',
          checked: false,
        },
      ],
    },
    {
      id: uuid(),
      title: 'Eyewear',
      traits: [
        {
          id: uuid(),
          name: 'No Eyewear',
          checked: false,
        },
        {
          id: uuid(),
          name: '3D Glasses',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Bar Shades',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Eye Paint',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Golden Sunglasses',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Monocle',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Orange Sunglasses',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Purple Sunglasses',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Respirator',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Retro Glasses',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Round Glasses',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Sunglasses',
          checked: false,
        },
        {
          id: uuid(),
          name: 'VR Set',
          checked: false,
        },
      ],
    },
    {
      id: uuid(),
      title: 'Torso',
      traits: [
        {
          id: uuid(),
          name: 'No Torso',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Amish Shirt',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Argentina Jersey',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Astronaut Torso',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Beer Mug Tshirt',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Black Ninja Robe',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Blue Hockey Jersey',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Bow Tie & Suit',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Brazil Jersey',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Chemical Protection Robe',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Clown Jacket',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Golden Armor',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Golden Jacket',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Golden Spartan Armor',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Grey Jacket',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Marine Shirt',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Platinum Spartan Armor',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Rainbow Jacket',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Red Basketball Jersey',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Red Collared Shirt',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Red Football Jersey',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Ribbed Zombie Shirt',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Samurai Armor',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Silver Armor',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Silver Spartan Armor',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Striped Soccer Jersey',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Suit & Tie',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Suit',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Sushi Chef Shirt',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Taekwondo Robe',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Tennis Shirt',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Tuxedo Jacket',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Weed Plant Tshirt',
          checked: false,
        },
        {
          id: uuid(),
          name: 'White Football Jersey',
          checked: false,
        },
      ],
    },
    {
      id: uuid(),
      title: 'Pants',
      traits: [
        {
          id: uuid(),
          name: 'Underwear',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Amish Pants',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Argentina Pants',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Astronaut Pants',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Black Dress Pants',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Black Ninja Pants',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Black Pants',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Black Soccer Pants',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Blue Hockey Pants',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Blue Jeans',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Brazil Pants',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Cargo Shorts',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Chemical Protection Pants',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Classic Plaid Pants',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Clown Pants',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Golden Grieves',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Golden Pants',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Gray Jeans',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Grey Dress Pants',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Grey Football Pants',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Grey Pants',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Marine Pants',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Rainbow Pants',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Red Basketball Pants',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Red Football Pants',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Ribbed Zombie Pants',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Samurai Pants',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Silver Grieves',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Spartan Pants',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Sushi Chef Pants',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Taekwondo Pants',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Tennis Pants',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Tuxedo Pants',
          checked: false,
        },
      ],
    },
    {
      id: uuid(),
      title: 'Footwear',
      traits: [
        {
          id: uuid(),
          name: 'No Shoes',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Amish Shoes',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Astronaut Footwear',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Basketball Shoes',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Black Dress Shoes',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Black Ninja Boots',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Brown Dress Shoes',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Brown Spartan Sandals',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Chemical Protection Boots',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Clown Boots',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Golden Knight Boots',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Golden Shoes',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Golf Shoes',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Ice Skates',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Loafers',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Marine Boots',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Platinum Spartan Sandals',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Red Football Cleats',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Red Soccer Cleats',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Samurai Boots',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Silver Knight Boots',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Sneakers',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Sushi Chef Shoes',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Tennis Socks & Shoes',
          checked: false,
        },
        {
          id: uuid(),
          name: 'White/Yellow Football Cleats',
          checked: false,
        },
      ],
    },
    {
      id: uuid(),
      title: 'Left-Hand Accessories',
      traits: [
        {
          id: uuid(),
          name: 'No Left Hand Accesories',
          checked: false,
        },
        {
          id: uuid(),
          name: 'American Football',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Amish Pitch Fork',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Banana',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Basketball',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Beer',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Big Gun',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Black Gun',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Blue Degen Sword',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Bong',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Bow & Arrow',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Corn Gun',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Diamond',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Double Degen Sword Blue',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Double Degen Sword Red',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Double Degen Sword Yellow',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Football',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Golden Gun',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Golden Spartan Sword',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Golf Club',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Green Degen Sword',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Grenade',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Hockey Stick',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Katana',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Platinum Spartan Sword',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Purple Degen Sword',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Red Degen Sword',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Shield',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Silver Spartan Sword',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Sushi Knife',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Sword',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Tennis Racket',
          checked: false,
        },
      ],
    },
    {
      id: uuid(),
      title: 'Right-Hand Accessories',
      traits: [
        {
          id: uuid(),
          name: 'No Right Hand Accesories',
          checked: false,
        },
        {
          id: uuid(),
          name: 'American Football',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Amish Pitch Fork',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Banana',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Basketball',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Beer',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Big Gun',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Black Gun',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Blue Degen Sword',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Bong',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Bow & Arrow',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Corn Gun',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Diamond',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Double Degen Sword Blue',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Double Degen Sword Red',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Double Degen Sword Yellow',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Football',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Golden Gun',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Golden Spartan Sword',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Golf Club',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Green Degen Sword',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Grenade',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Hockey Stick',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Katana',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Platinum Spartan Sword',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Purple Degen Sword',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Red Degen Sword',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Shield',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Silver Spartan Sword',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Sushi Knife',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Sword',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Tennis Racket',
          checked: false,
        },
      ],
    },
    {
      id: uuid(),
      title: 'Backgrounds',
      traits: [
        {
          id: uuid(),
          name: 'Angel Tears',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Aqua Splash',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Crimson Blush',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Deep Relief',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Desert Hump',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Eternal Constance',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Flying High',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Happy Fisher',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Plum Plate',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Squeaky Clean',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Strong Bliss',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Summer Salad',
          checked: false,
        },
        {
          id: uuid(),
          name: 'Winter Solstice',
          checked: false,
        },
      ],
    },
  ]);
  const [categoriesIndexes, setCategoriesIndexes] = useState([]);
  const [selectedFiltersLength, setSelectedFiltersLength] = useState(0);

  const handleClickOutside = (event) => {
    if (!event.target.classList.contains('target')) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsDropdownOpened(false);
      }
    }
  };

  const handleSearchByName = (value) => {
    setSearchByName(value);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [loading]);

  return (
    <div className="tab__saved__nfts">
      <div className="tab__wallet">
        <div className="universe_NFTs">
          <div className="rarity--charts--search--and--filters--row">
            <SortBySelect
              id="sort--select"
              data={UNIVERSE_NFTS}
              defaultValue="Polymorphs"
              sortData={[
                'Polymorphs',
                'OG characters (coming soon)',
                'Lobby Lobsters (coming soon)',
              ]}
              getData={(find) => setPolymorphData(find)}
              getDesc={(value) => setDesc(value)}
              desc={desc}
              disableOptions={[false, true, true]}
            />
            <div className="rarity--charts--search--and--floor--price">
              <SearchField
                data={UNIVERSE_NFTS}
                placeholder="Search items"
                dropdown={false}
                CardElement={<></>}
                enterKeyEvent={false}
                getData={(find) => setPolymorphData(find)}
              />
            </div>
            <SortByOrder
              data={UNIVERSE_NFTS}
              getData={(find) => setPolymorphData(find)}
              getDesc={(value) => setDesc(value)}
            />
            <SortBySelect
              id="sort--select"
              data={UNIVERSE_NFTS}
              defaultValue="Sort by"
              sortData={['Sort by', 'Rarity Score', 'Rank', 'Polymorph Id']}
              getData={(find) => setPolymorphData(find)}
              getDesc={(value) => setDesc(value)}
              desc={desc}
              hideFirstOption
            />
          </div>
          {loading ? (
            <RarityChartsLoader number={9} />
          ) : (
            <>
              <UniverseNFTsList
                data={polymorphData}
                perPage={perPage}
                setPerPage={setPerPage}
                offset={offset}
                setOffset={setOffset}
                categories={categories}
                setCategories={setCategories}
                categoriesIndexes={categoriesIndexes}
                setCategoriesIndexes={setCategoriesIndexes}
              />
            </>
          )}
          <div className="mobile--filters">
            <Popup
              trigger={
                <button type="button" className="light-button">
                  <img src={filterIcon} alt="Filter" />
                </button>
              }
            >
              {(close) => (
                <RarityChartFiltersPopup
                  close={close}
                  categories={categories}
                  setCategories={setCategories}
                  categoriesIndexes={categoriesIndexes}
                  setCategoriesIndexes={setCategoriesIndexes}
                  selectedFiltersLength={selectedFiltersLength}
                  setSelectedFiltersLength={setSelectedFiltersLength}
                />
              )}
            </Popup>
            {selectedFiltersLength !== 0 && <div className="count">{selectedFiltersLength}</div>}
          </div>
        </div>
        {/* <div className="nfts__lists">
          {polymorphData
            .slice(offset, offset + perPage)
            .filter((item) => item.name.toLowerCase().includes(searchByName.toLowerCase()))
            .map((elm) =>
              elm.artworkType === 'jpeg' ? (
                <div
                  key={uuid()}
                  className="nft__box"
                  aria-hidden="true"
                  onClick={() => {
                    setSelectedNftForScramble(elm);
                    history.push(`/polymorphs/${elm.id}`);
                  }}
                >
                  <div className="nft__box__image">
                    <img className="preview-image" alt={elm.name} src={elm.thumbnail_url} />
                    {elm.scrambled && elm.scrambled === 'never' ? (
                      <div className="never-scrambled">
                        <img alt="Never scrambled badge" src={neverScrambledIcon} />
                        <span className="tooltiptext">Never scrambled</span>
                      </div>
                    ) : (
                      <></>
                    )}
                    {elm.scrambled && elm.scrambled === 'single' ? (
                      <div className="single-trait-scrambled">
                        <img alt="Single trait scrambled badge" src={singleTraitScrambledIcon} />
                        <span className="tooltiptext">Single trait scrambled</span>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="polymorph">
                    <p>{elm.name}</p>
                  </div>
                  <div className="nft_box_footer">
                    <img alt="fjffd" src={elm.collection.coverUrl} />
                    <p>{elm.collectionName}</p>
                  </div>
                </div>
              ) : (
                <div key={uuid()} className="nft__box">
                  <div className="videoicon">
                    <img alt="videocover" src={videoIcon} />
                  </div>
                  <div className="nft__box__image">
                    <video
                      onMouseOver={(event) => event.target.play()}
                      onFocus={(event) => event.target.play()}
                      onMouseOut={(event) => event.target.pause()}
                      onBlur={(event) => event.target.pause()}
                    >
                      <source src={elm.thumbnail_url} type="video/mp4" />
                      <track kind="captions" />
                    </video>
                  </div>
                  <div className="polymorph">
                    <p>{elm.name}</p>
                  </div>
                  <div className="nft_box_footer">
                    <img alt="fjffd" src={elm.collectionAvatar} />
                    <p>{elm.collectionName}</p>
                  </div>
                </div>
              )
            )}
        </div> */}
        {/* {polymorphData.length &&
        polymorphData.filter((item) => item.name.toLowerCase().includes(searchByName.toLowerCase()))
          .length ? (
          <div>
            <div className="pagination__container">
              <Pagination
                data={polymorphData.filter((item) =>
                  item.name.toLowerCase().includes(searchByName.toLowerCase())
                )}
                perPage={perPage}
                setOffset={setOffset}
              />
              <ItemsPerPageDropdown perPage={perPage} setPerPage={setPerPage} />
            </div>
          </div>
        ) : (
          <div className="empty__filter__nfts">
            <div className="tabs-empty">
              <div className="image-bubble">
                <img src={bubbleIcon} alt="bubble-icon" />
              </div>
              <h3>No NFTs found</h3>
              <p>Create NFTs or NFT collections with our platform by clicking the button below</p>
              <Button
                className="light-button"
                onClick={() => history.push('/my-nfts/create', { tabIndex: 1, nftType: 'single' })}
              >
                Create NFT
              </Button>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};
export default UniverseNFTs;
