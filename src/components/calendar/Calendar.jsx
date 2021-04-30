import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import './Calendar.scss';
import arrow from '../../assets/images/arrow.svg';

const Calendar = React.forwardRef(({ setValues, sDate, eDate }, ref) => {
  const [state, setState] = useState([
    {
      startDate: typeof sDate === 'object' ? sDate : new Date(),
      endDate: typeof eDate === 'object' ? eDate : new Date(),
      key: 'selection',
    },
  ]);

  const d = new Date();
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
  const weekNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const splitTime = new Date().toString().split(' ');
  const [selectedTimezone, setSelectedTimezone] = useState(
    splitTime[splitTime.length - 1].slice(1, -1)
  );
  const [hours, setHours] = useState('12');
  const [minutes, setMinutes] = useState('00');
  const [selectedDate, setSelectedDate] = useState({
    year: d.getFullYear(),
    month: d.getMonth(),
  });

  const changeMonth = (direction) => {
    if (direction === 'next') {
      document.querySelector('.rdrNextButton').click();
    } else {
      document.querySelector('.rdrPprevButton').click();
    }
    setTimeout(() => {
      const month = Number(document.querySelector('.rdrMonthPicker select').value);
      const year = Number(document.querySelector('.rdrYearPicker select').value);
      setSelectedDate({ month, year });
    }, 100);
  };

  const handleHoursChange = (val) => {
    const value = val.replace(/[^\d]/, '');
    if (value.length < 3 && Number(value) < 24) {
      setHours(value);
    }
  };

  const handleMinutesChange = (val) => {
    const value = val.replace(/[^\d]/, '');
    if (value.length < 3 && Number(value) < 60) {
      setMinutes(value);
    }
  };

  useEffect(() => {
    setValues((prevValues) => ({
      ...prevValues,
      startDate: state[0].startDate,
      endDate: state[0].endDate,
    }));
  }, [state]);

  useEffect(() => {
    if (document.querySelector('.rdrWeekDay')) {
      const month = Number(document.querySelector('.rdrMonthPicker select').value);
      const year = Number(document.querySelector('.rdrYearPicker select').value);
      setSelectedDate({ month, year });
      weekNames.forEach((weekName, index) => {
        document.querySelectorAll('.rdrWeekDay')[index].innerHTML = weekName;
      });
    }
  }, []);

  return (
    <div className="calendar" ref={ref}>
      <div className="calendar__header">
        <h2>{`${monthNames[selectedDate.month]} ${selectedDate.year}`}</h2>
        <div className="month__changers">
          <button type="button" onClick={() => changeMonth('prev')}>
            <img className="left" src={arrow} alt="Left arrow" />
          </button>
          <button type="button" onClick={() => changeMonth('next')}>
            <img className="right" src={arrow} alt="Right arrow" />
          </button>
        </div>
      </div>

      <div className="calendar__body">
        <DateRange
          onChange={(item) => setState([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={state}
        />
      </div>

      <div className="calendar__footer">
        <div className="timezone">
          <div className="label">Time zone:</div>
          <div className="selected__timezone">{selectedTimezone}</div>
        </div>
        <div className="time">
          <input type="text" value={hours} onChange={(e) => handleHoursChange(e.target.value)} />
          <span>:</span>
          <input
            type="text"
            value={minutes}
            onChange={(e) => handleMinutesChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
});

Calendar.propTypes = {
  setValues: PropTypes.func.isRequired,
  sDate: PropTypes.oneOfType([PropTypes.any]).isRequired,
  eDate: PropTypes.oneOfType([PropTypes.any]).isRequired,
};

export default Calendar;
