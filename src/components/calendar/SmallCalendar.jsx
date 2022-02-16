import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import arrow from '../../assets/images/arrow.svg';

const SmallCalendar = ({
  showCalendar,
  setShowCalendar,
  monthNames,
  offerExpirationDate,
  setOfferExpirationDate,
}) => {
  const ref = useRef();
  const d = new Date();
  const weekNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [currentMonth, setCurrentMonth] = useState([]);
  const [selectedDate, setSelectedDate] = useState({
    year: d.getFullYear(),
    month: d.getMonth(),
  });

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
    let { year } = selectedDate;
    let { month } = selectedDate;

    month = direction === 'next' ? month + 1 : month - 1;

    if (month === 12) {
      month = 0;
      year += 1;
    } else if (month === -1) {
      month = 11;
      year -= 1;
    }
    setSelectedDate({ month, year });
  };

  const handleHoursChange = (val) => {
    const value = val.replace(/[^\d]/, '');
    if (value.length < 3 && Number(value) < 25) {
      setOfferExpirationDate((prevState) => ({
        ...prevState,
        hours: Number(value),
      }));
    }
  };

  const handleMinutesChange = (val) => {
    const value = val.replace(/[^\d]/, '');
    if (value.length < 3 && Number(value) < 60) {
      setOfferExpirationDate((prevState) => ({
        ...prevState,
        minutes: Number(value),
      }));
    }
  };

  const handleDayClick = (day) => {
    if (day) {
      setOfferExpirationDate((prevState) => ({
        ...prevState,
        month: monthNames[selectedDate.month],
        day,
        year: selectedDate.year,
      }));
    }
  };

  const handleClickOutside = (event) => {
    if (
      ref.current &&
      !ref.current.contains(event.target) &&
      !event.target.classList.contains('calendar--icon') &&
      event.target.alt !== 'Calendar'
    ) {
      setShowCalendar(!showCalendar);
    }
  };

  useEffect(() => {
    createDaysArray();
  }, [selectedDate]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div className="calendar__wrapper" ref={ref}>
      <div className="calendar-first">
        <div className="calendar__header">
          <button
            className="left-btn"
            type="button"
            onClick={() => changeMonth('prev')}
            disabled={selectedDate.month === new Date().getMonth()}
          >
            <img className="left" src={arrow} alt="Left arrow" />
          </button>
          <h2>{`${monthNames[selectedDate.month]}`}</h2>
          <div className="month__changers">
            <button type="button" onClick={() => changeMonth('next')}>
              <img className="right" src={arrow} alt="Right arrow" />
            </button>
          </div>
        </div>

        <div className="calendar__body">
          <div className="week__days">
            {weekNames.map((week) => (
              <div key={uuid()}>{week}</div>
            ))}
          </div>
          {currentMonth.map((week) => (
            <div key={uuid()} className="week__days__numbers">
              {week.map((day) => (
                <button
                  className={
                    day === offerExpirationDate.day &&
                    monthNames[selectedDate.month] === offerExpirationDate.month &&
                    selectedDate.year === offerExpirationDate.year
                      ? 'selectedDay'
                      : ''
                  }
                  type="button"
                  key={uuid()}
                  aria-hidden="true"
                  onClick={() => handleDayClick(day)}
                  style={{ cursor: day ? 'pointer' : 'default' }}
                  disabled={
                    new Date(new Date(selectedDate.year, selectedDate.month, day).toDateString()) <
                    new Date(new Date().toDateString())
                  }
                >
                  {day}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="calendar__footer">
        <div className="time">
          <input
            type="text"
            value={offerExpirationDate.hours}
            onChange={(e) => handleHoursChange(e.target.value)}
          />
          <span>:</span>
          <input
            type="text"
            value={offerExpirationDate.minutes}
            onChange={(e) => handleMinutesChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

SmallCalendar.propTypes = {
  showCalendar: PropTypes.bool.isRequired,
  setShowCalendar: PropTypes.func.isRequired,
  monthNames: PropTypes.oneOfType([PropTypes.array]).isRequired,
  offerExpirationDate: PropTypes.oneOfType([PropTypes.any]).isRequired,
  setOfferExpirationDate: PropTypes.func.isRequired,
};

export default SmallCalendar;
