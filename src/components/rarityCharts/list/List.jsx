/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './List.scss';
import uuid from 'react-uuid';
import PolymorphCard from './PolymorphCard';
import CategoriesFilter from './CategoriesFilter';
import closeIcon from '../../../assets/images/close-menu.svg';
import Pagination from '../../pagination/Pagionation';
import ItemsPerPageDropdown from '../../pagination/ItemsPerPageDropdown';

const List = ({ data, perPage, setPerPage, offset, setOffset }) => {
  const sliceData = data.slice(offset, offset + perPage);
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
  const [showClearALL, setShowClearALL] = useState(false);

  const handleClearAll = () => {
    const newCategories = [...categories];
    newCategories.forEach((item) => {
      item.traits.forEach((trait) => {
        trait.checked = false;
      });
    });
    setCategories(newCategories);
  };

  const removeSelectedFilter = (index, idx) => {
    const newCategories = [...categories];
    newCategories[index].traits[idx].checked = false;
    setCategories(newCategories);
  };

  useEffect(() => {
    let check = false;
    categories.forEach((item) => {
      const res = item.traits.filter((i) => i.checked);
      if (res.length) {
        check = true;
      }
    });
    if (check) {
      setShowClearALL(true);
    } else {
      setShowClearALL(false);
    }
  }, [categories]);

  return sliceData.length ? (
    <div className="rarity--charts--list">
      <CategoriesFilter categories={categories} setCategories={setCategories} />
      <div className="list--with--selected--filters">
        <div className="selected--filters">
          {showClearALL && <div className="result">898 results</div>}
          {categories.map((item, index) => (
            <>
              {item.traits.map(
                (trait, idx) =>
                  trait.checked && (
                    <button type="button" className="light-border-button">
                      {trait.name}
                      <img
                        className="close"
                        src={closeIcon}
                        alt="Close"
                        aria-hidden="true"
                        onClick={() => removeSelectedFilter(index, idx)}
                      />
                    </button>
                  )
              )}
            </>
          ))}
          {showClearALL && (
            <button type="button" className="clear--all" onClick={() => handleClearAll()}>
              Clear all
            </button>
          )}
        </div>
        <div className="grid">
          {sliceData.map((item) => (
            <PolymorphCard key={uuid()} item={item} />
          ))}
        </div>
        {data.length ? (
          <div className="pagination__container">
            <Pagination data={data} perPage={perPage} setOffset={setOffset} />
            <ItemsPerPageDropdown perPage={perPage} setPerPage={setPerPage} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  ) : (
    <div className="rarity--charts--empty">
      <p>No Polymorph could be found :’(</p>
    </div>
  );
};

List.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
  perPage: PropTypes.number.isRequired,
  setPerPage: PropTypes.func.isRequired,
  offset: PropTypes.number.isRequired,
  setOffset: PropTypes.func.isRequired,
};

export default List;
