import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ColorPicker, { useColor } from 'react-color-palette';
import './ColorPicker.scss';
import arrowDown from '../../assets/images/arrow-down.svg';

const CustomColorPicker = (props) => {
  const { className, show, ...rest } = props;
  const [hidePicker, setHidePicker] = useState(true);
  const [color, setColor] = useColor('hex', '#EABD16');

  return (
    <div className="pick__color">
      <p>Pick tier color</p>
      <div className="pick__color__div">
        <div className="pick" onClick={() => setHidePicker(!hidePicker)} aria-hidden="true">
          <div className="color" style={{ background: `${color.hex}` }} />
          <img src={arrowDown} alt="Arrow down" />
        </div>

        <div hidden={hidePicker} className="custom__color__picker" aria-hidden="true">
          <ColorPicker width={286} height={238} color={color} onChange={setColor} hideHSB hideRGB />
          <div className="color__picker__hex">
            <h5 className="color__picker__title">Hex</h5>
            <div className="color__picker__name">
              <div className="colored" style={{ background: `${color.hex}` }} />
              <p>{color.hex}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CustomColorPicker.propTypes = {
  className: PropTypes.string,
  show: PropTypes.bool,
};

CustomColorPicker.defaultProps = {
  className: '',
  show: false,
};

export default CustomColorPicker;
