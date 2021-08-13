import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../../assets/images/close-menu.svg';
import arrowDown from '../../assets/images/arrow-down.svg';
import Input from '../input/Input';
import Button from '../button/Button';

const ReportPopup = React.forwardRef(({ onClose }, ref) => {
  const [showReasons, setShowReasons] = useState(false);
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Select a reason');

  const handleClickOutside = (event) => {
    if (!event.target.classList.contains('target')) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsDropdownOpened(false);
      }
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });
  return (
    <div className="report__popup" ref={ref}>
      <img className="close" src={closeIcon} alt="Close" onClick={onClose} aria-hidden="true" />
      <h2>Report this item</h2>
      <p>Explain why you think this item should be removed from marketplace</p>
      <div className="report__reason">
        <div className="universe_filter">
          <div className="universe_filter_label">
            <span>Reason</span>
          </div>
          <div>
            <div
              ref={ref}
              className={`universe_dropdown ${isDropdownOpened ? 'opened' : ''}`}
              onClick={() => setIsDropdownOpened(!isDropdownOpened)}
              aria-hidden="true"
            >
              <span className="selected__universe__item">{selectedItem}</span>
              <img className="arrow__down" src={arrowDown} alt="Arrow" />
              {isDropdownOpened && (
                <div className="sort__dropdown">
                  <ul>
                    <li
                      onClick={() => {
                        setSelectedItem('All characters');
                        setIsDropdownOpened(false);
                      }}
                      aria-hidden="true"
                    >
                      Copyright infringement
                    </li>
                    <li
                      onClick={() => {
                        setSelectedItem('OG characters');
                        setIsDropdownOpened(false);
                      }}
                      aria-hidden="true"
                    >
                      Explict and sensitive content
                    </li>
                    <li
                      onClick={() => {
                        setSelectedItem('My polymorphs');
                        setIsDropdownOpened(false);
                      }}
                      aria-hidden="true"
                    >
                      Other
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="report__message">
        <label className="inp-label">Message</label>
        <textarea
          className="inp"
          placeholder="Tell us some details"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="report__buttons">
        <Button className="light-border-button" onClick={onClose}>
          Cancel
        </Button>
        <Button className="light-button">Report</Button>
      </div>
    </div>
  );
});
ReportPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default ReportPopup;
