import React, { useState } from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../../assets/images/close-menu.svg';
import arrowIcon from '../../assets/images/arrow-down.svg';
import Input from '../input/Input';
import Button from '../button/Button';

const ReportPopup = React.forwardRef(({ onClose }, ref) => {
  const [showReasons, setShowReasons] = useState(false);
  const reasons = ['Copyright infringement', 'Explict and sensitive content', 'Other'];
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');

  const handleReason = (elm) => {
    setReason(elm);
    setShowReasons(false);
  };
  return (
    <div className="report__popup" ref={ref}>
      <img className="close" src={closeIcon} alt="Close" onClick={onClose} aria-hidden="true" />
      <h2>Report this item</h2>
      <p>Explain why you think this item should be removed from marketplace</p>
      <div className="report__reason">
        <Input className="inp" label="Reason" placeholder="Select a reason" value={reason} />
        <img
          src={arrowIcon}
          alt="Arrow"
          onClick={() => setShowReasons(!showReasons)}
          aria-hidden="true"
          style={showReasons ? { transform: 'rotate(180deg)' } : { transform: 'rotate(0deg)' }}
        />
        {showReasons && (
          <ul className="reasons__list">
            {reasons.map((elm, i) => (
              <li aria-hidden="true" onClick={() => handleReason(elm)}>
                {elm}
              </li>
            ))}
          </ul>
        )}
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
