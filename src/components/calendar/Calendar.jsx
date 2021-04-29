import React, { useState, useEffect } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import PropTypes from 'prop-types';
import './Calendar.scss';
import uuid from 'react-uuid';
import arrow from '../../assets/images/arrow.svg';

const Calendar = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
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
  const [selectedDay, setSelectedDay] = useState(d.getDate());
  const [selectedDate, setSelectedDate] = useState({
    year: d.getFullYear(),
    month: d.getMonth(),
  });
  const [currentMonth, setCurrentMonth] = useState([]);

  const createDaysArray = () => {
    const dateArr = [];
    const lastDay = new Date(selectedDate.year, selectedDate.month + 1, 0);
    let weeks = Array(7).join('1').split('1');
    let date;

    for (let i = 1; i < lastDay.getDate() + 1; i += 1) {
      date = new Date(selectedDate.year, selectedDate.month, i);

      if (date.getDay() === 0) {
        if (weeks.join('') !== '') {
          dateArr.push(weeks);
        }
        weeks = Array(7).join('1').split('1');
      }

      weeks[date.getDay()] = date.getDate();
    }

    weeks.length = weeks.length ? 7 : 0;
    if (weeks.length) {
      dateArr.push(weeks);
    }

    setCurrentMonth(dateArr);
  };

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

    // let { year } = selectedDate;
    // let { month } = selectedDate;

    // month = direction === 'next' ? month + 1 : month - 1;

    // if (month === 12) {
    //   month = 0;
    //   year += 1;
    // } else if (month === -1) {
    //   month = 11;
    //   year -= 1;
    // }
    // setSelectedDate({ ...selectedDate, month, year });
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

  // useEffect(() => {
  //   setStartDate({
  //     month: monthNames[selectedDate.month],
  //     day: selectedDay,
  //     year: selectedDate.year,
  //     hours,
  //     minutes,
  //     timezone: selectedTimezone,
  //   });
  // }, [selectedDay]);

  useEffect(() => {
    createDaysArray();
  }, [selectedDate]);

  return (
    <div className="calendar">
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
          editableDateInputs
          onChange={(item) => setState([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={state}
        />
        {/* <div className="week__days">
          {weekNames.map((week) => (
            <div key={uuid()}>{week}</div>
          ))}
        </div>
        {currentMonth.map((weekDays) => (
          <div key={uuid()} className="week__days__numbers">
            {weekDays.map((day) => (
              <div
                key={uuid()}
                className={`${
                  startDate.day === day &&
                  startDate.month === monthNames[selectedDate.month] &&
                  startDate.year === selectedDate.year
                    ? 'selected'
                    : ''
                }`}
                aria-hidden="true"
                onClick={() => day && setSelectedDay(day)}
                style={{ cursor: day ? 'pointer' : 'default' }}
              >
                {day}
              </div>
            ))}
          </div>
        ))} */}
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
};

// Calendar.propTypes = {
//   setStartDate: PropTypes.func.isRequired,
//   startDate: PropTypes.oneOfType([PropTypes.object]).isRequired,
// };

export default Calendar;
