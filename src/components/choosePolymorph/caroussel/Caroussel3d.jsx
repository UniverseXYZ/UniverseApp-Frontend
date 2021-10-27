import React, { useState, useEffect } from 'react';
import { Carousel } from '3d-react-carousal';
import './Caroussel3d.scss';
import img1 from '../../../assets/images/lobby-lobsters/1.png';
import img2 from '../../../assets/images/lobby-lobsters/2.png';
import img3 from '../../../assets/images/lobby-lobsters/3.png';
import img4 from '../../../assets/images/lobby-lobsters/4.png';
import img5 from '../../../assets/images/lobby-lobsters/5.png';
import img6 from '../../../assets/images/lobby-lobsters/7.png';
import img7 from '../../../assets/images/lobby-lobsters/8.png';
import img8 from '../../../assets/images/lobby-lobsters/9.png';
import { CHOOSE_POLYMORPH_CARD } from '../../../utils/fixtures/ChoosePolymorphCardDummyData';
import PolymorphCard from '../../polymorphCard/PolymorphCard';

const Caroussel3d = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const tempArr = [];
    CHOOSE_POLYMORPH_CARD.forEach((item) => {
      tempArr.push(<PolymorphCard rarity={item} />);
    });
    setSlides(tempArr);
  }, []);

  return (
    <div className="fighter__slider">
      <Carousel slides={slides} showNavigation />
    </div>
  );
};
export default Caroussel3d;
