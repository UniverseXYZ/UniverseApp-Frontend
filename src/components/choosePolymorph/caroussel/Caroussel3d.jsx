import React, { useState, useEffect } from 'react';
import './Caroussel3d.scss';
import { CHOOSE_POLYMORPH_CARD } from '../../../utils/fixtures/ChoosePolymorphCardDummyData';
import PolymorphCard from '../../polymorphCard/PolymorphCard';

const Caroussel3d = () => {
  useEffect(() => {
    $('#carousel').flipster({
      style: 'carousel',
      spacing: -0.5,
      nav: true,
      buttons: true,
      loop: true,
    });
  }, []);

  return (
    <div className="fighter__slider">
      <div id="carousel">
        <ul className="flip-items">
          {CHOOSE_POLYMORPH_CARD.map((item) => (
            <PolymorphCard rarity={item} />
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Caroussel3d;
