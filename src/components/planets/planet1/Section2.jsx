import React from 'react';
import PropTypes from 'prop-types';
import WrapperCenter from '../../polymorphs/WrapperCenter';
import WrapperCenterTwoColumns from '../../polymorphs/WrapperCenterTwoColumns';
import Section2Card from './Section2Card';
import LeftTopImg from '../../../assets/images/planet1-section2-left-top.png';
import './styles/Section2.scss';

const Section2 = (props) => {
  const { title, legendary, legendaryLeftTopImg } = props;
  return (
    <div className="planet--section2">
      {/* <div className="opacity--block"> */}
      {!!legendaryLeftTopImg.length && (
        <img src={legendaryLeftTopImg} alt="img" className="left--top--img" />
      )}
      <WrapperCenter className="section--title">
        <h3>{title}</h3>
      </WrapperCenter>
      <WrapperCenter className="cards--section">
        <WrapperCenterTwoColumns
          leftBlock={<Section2Card {...legendary[1]} legendary />}
          rightBlock={<Section2Card {...legendary[0]} legendary />}
        />
      </WrapperCenter>
      {/* </div> */}
    </div>
  );
};

Section2.propTypes = {
  title: PropTypes.string,
  legendary: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
    })
  ).isRequired,
  legendaryLeftTopImg: PropTypes.string,
};

Section2.defaultProps = {
  title: '',
  legendaryLeftTopImg: '',
};

export default Section2;
