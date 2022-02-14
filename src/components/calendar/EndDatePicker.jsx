import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import EndDateCalendar from './EndDateCalendar.jsx';
import Input from '../input/Input';
import callendarIcon from '../../assets/images/calendar.svg';
import './EndDatePicker.scss';
import './Calendar.scss';
import { parseDateForDatePicker } from './utils';

const EndDatePicker = (props) => {
  const { value, onChange, title, error } = props;
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const d = new Date();
  const [values, setValues] = useState({ endDate: value, startDate: '' });
  const [showEndDate, setShowEndDate] = useState(false);
  const endDateRef = useRef(null);
  const [endDateTemp, setEndDateTemp] = useState(parseDateForDatePicker(d));
  const formatDate = (date) => {
    const { month, day, year, hours, minutes } = parseDateForDatePicker(date);
    return `${month} ${day}, ${year}, ${hours}:${minutes} ${endDateTemp.timezone}`;
  };

  useEffect(() => {
    setValues({ ...values, endDate: value });
  }, [value]);
  return (
    <div className="date__input">
      <div style={{ position: 'relative' }}>
        <Input
          type="text"
          readOnly
          onClick={() => setShowEndDate(true)}
          id="endDate"
          autoComplete="off"
          value={values.endDate ? formatDate(values.endDate) : ''}
          error={error}
        />
        <Popup
          trigger={
            <img
              aria-hidden="true"
              className="callendar__image"
              src={callendarIcon}
              alt="Callendar"
            />
          }
        >
          {(close) => (
            <EndDateCalendar
              ref={endDateRef}
              monthNames={monthNames}
              values={values}
              setValues={(e) => {
                setValues(e);
                onChange(e().endDate.toString());
              }}
              endDateTemp={endDateTemp}
              setEndDateTemp={setEndDateTemp}
              setShowEndDate={setShowEndDate}
              onClose={close}
              title={title}
            />
          )}
        </Popup>
      </div>
    </div>
  );
};

EndDatePicker.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  title: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

EndDatePicker.defaultProps = {
  value: '',
  onChange: () => {},
  title: 'End Date',
  error: false,
};

export default EndDatePicker;
