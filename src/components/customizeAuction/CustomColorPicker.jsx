import React, { useState, useEffect, useRef } from 'react';
import ColorPicker, { useColor } from 'react-color-palette';
import 'react-color-palette/lib/css/styles.css';
import arrowDown from '../../assets/images/arrow-down.svg';

const CustomColorPicker = () => {
  const [color, setColor] = useColor('hex', '#EABD16');
  const [hidePicker, setHidePicker] = useState(true);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setHidePicker(true);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return (
    <div className="pick__color__div" ref={ref}>
      <div className="pick" onClick={() => setHidePicker(!hidePicker)} aria-hidden="true">
        <div className="color" style={{ background: `${color.hex}` }} />
        <img src={arrowDown} alt="Arrow down" />
      </div>

      <div hidden={hidePicker} className="custom__color__picker">
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
  );
};

export default CustomColorPicker;
