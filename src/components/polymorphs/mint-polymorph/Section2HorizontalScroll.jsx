import React from 'react';
import HorizontalScroll from 'react-scroll-horizontal';
import './styles/Section2HorizontalScroll.scss';
import charactersData from '../../../utils/fixtures/horizontalScrollCharactersData';

const child = (data) =>
  data.map((elem, index) => (
    <div className={`child--scroll child--scroll--${index + 1}`} key={index.toString()}>
      <img alt="img" src={elem.img} />
      <p>{elem.name}</p>
    </div>
  ));

const Section2HorizontalScroll = () => (
  <div className="section2--horizontal--scroll--parent">
    <h3>Possible base characters</h3>
    <p className="row2--unique--skins">10 unique skins</p>
    <div className="horizontal--scroll--parent">
      <HorizontalScroll pageLock reverseScroll config={{ stiffness: 50, damping: 5 }}>
        {child(charactersData)}
      </HorizontalScroll>
    </div>
  </div>
);

export default Section2HorizontalScroll;
