import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Calendar.scss';
import uuid from 'react-uuid';
import moment from 'moment';
import arrow from '../../assets/images/arrow.svg';
import closeIcon from '../../assets/images/cross.svg';
import arrowDown from '../../assets/images/arrow-down.svg';
import Button from '../button/Button.jsx';

const EndDateCalendar = React.forwardRef(
  (
    { monthNames, values, setValues, endDateTemp, setEndDateTemp, setShowEndDate, onClose },
    ref
  ) => {
    const d = new Date();
    const weekNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const timezones = [
      'GMT -12:00',
      'GMT -11:00',
      'GMT -10:00',
      'GMT -09:00',
      'GMT -08:00',
      'GMT -07:00',
      'GMT -06:00',
      'GMT -05:00',
      'GMT -04:00',
      'GMT -03:00',
      'GMT -02:00',
      'GMT -01:00',
      'GMT +00:00',
      'GMT +01:00',
      'GMT +02:00',
      'GMT +03:00',
      'GMT +04:00',
      'GMT +05:00',
      'GMT +06:00',
      'GMT +07:00',
      'GMT +08:00',
      'GMT +09:00',
      'GMT +10:00',
      'GMT +11:00',
      'GMT +12:00',
    ];
    const [currentMonth, setCurrentMonth] = useState([]);
    const [showTimezones, setShowTimezones] = useState(false);
    const [selectedDate, setSelectedDate] = useState({
      year: values.endDate ? Number(values.endDate.toString().split(' ')[3]) : d.getFullYear(),
      month: values.endDate
        ? monthNames.indexOf(values.endDate.toString().split(' ')[1])
        : d.getMonth(),
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
        setEndDateTemp((prevState) => ({
          ...prevState,
          hours: value,
        }));
      }
    };

    const handleMinutesChange = (val) => {
      const value = val.replace(/[^\d]/, '');
      if (value.length < 3 && Number(value) < 60) {
        setEndDateTemp((prevState) => ({
          ...prevState,
          minutes: value,
        }));
      }
    };

    const handleDayClick = (day) => {
      if (day) {
        if (
          new Date(new Date(selectedDate.year, selectedDate.month, day).toDateString()) <
            new Date(new Date().toDateString()) ||
          new Date(new Date(selectedDate.year, selectedDate.month, day).toDateString()) <
            new Date(
              new Date(
                Number(values.startDate.toString().split(' ')[3]),
                monthNames.indexOf(values.startDate.toString().split(' ')[1]),
                Number(values.startDate.toString().split(' ')[2])
              ).toDateString()
            )
        ) {
          alert(
            `End date must be after ${values.startDate.toString().split(' ')[1]} ${Number(
              values.startDate.toString().split(' ')[2]
            )}, ${Number(values.startDate.toString().split(' ')[3])}`
          );
        } else {
          setEndDateTemp((prevState) => ({
            ...prevState,
            month: monthNames[selectedDate.month],
            day,
            year: selectedDate.year,
          }));
        }
      }
    };

    const handleCancelClick = () => {
      if (!values.endDate) {
        setEndDateTemp({
          month: monthNames[d.getMonth()],
          day: d.getDate(),
          year: d.getFullYear(),
          hours: '12',
          minutes: '00',
          timezone: 'GMT +04:00',
          format: 'AM',
        });
      } else {
        setEndDateTemp({
          month: values.endDate.toString().split(' ')[1],
          day: Number(values.endDate.toString().split(' ')[2]),
          year: Number(values.endDate.toString().split(' ')[3]),
          hours: values.endDate.toString().split(' ')[4].substring(0, 2),
          minutes: values.endDate.toString().split(' ')[4].substring(3, 5),
          timezone: endDateTemp.timezone,
          format: endDateTemp.format,
        });
      }
      onClose();
    };

    const handleSaveClick = () => {
      if (endDateTemp.hours && endDateTemp.minutes) {
        setValues((prevValues) => ({
          ...prevValues,
          endDate: new Date(
            endDateTemp.year,
            monthNames.indexOf(endDateTemp.month),
            endDateTemp.day,
            endDateTemp.hours,
            endDateTemp.minutes
          ),
        }));
        onClose();
      } else {
        setEndDateTemp((prevState) => ({
          ...prevState,
          hours: '24',
          minutes: '00',
        }));
        onClose();
      }
    };

    const handleFormatClick = (val) => {
      setEndDateTemp((prevState) => ({
        ...prevState,
        format: val,
      }));
    };

    useEffect(() => {
      if (!values.endDate && values.startDate) {
        setEndDateTemp((prevState) => ({
          ...prevState,
          month: values.startDate.toString().split(' ')[1],
          day: Number(values.startDate.toString().split(' ')[2]),
          year: Number(values.startDate.toString().split(' ')[3]),
        }));
      }
      createDaysArray();
    }, [selectedDate]);

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };

    useEffect(() => {
      document.addEventListener('click', handleClickOutside, true);
      return () => {
        document.removeEventListener('click', handleClickOutside, true);
      };
    });

    return (
      <div className="calendar" ref={ref}>
        <img className="close" src={closeIcon} alt="Close" onClick={onClose} aria-hidden="true" />
        <div className="calendar__wrapper">
          <div className="calendar-first">
            <h1>End date</h1>
            <div className="calendar__header">
              <button className="left-btn" type="button" onClick={() => changeMonth('prev')}>
                <img className="left" src={arrow} alt="Left arrow" />
              </button>
              <h2>{`${monthNames[selectedDate.month]} ${selectedDate.year}`}</h2>
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
                  {week.map((day, index) => (
                    <div
                      key={uuid()}
                      className={`
                    ${
                      day === endDateTemp.day &&
                      monthNames[selectedDate.month] === endDateTemp.month &&
                      selectedDate.year === endDateTemp.year
                        ? 'selectedEndDay'
                        : ''
                    }
                    ${
                      day &&
                      values.startDate &&
                      new Date(selectedDate.year, selectedDate.month, day) <
                        new Date(
                          endDateTemp.year,
                          monthNames.indexOf(endDateTemp.month),
                          endDateTemp.day
                        ) &&
                      new Date(selectedDate.year, selectedDate.month, day) >
                        new Date(
                          Number(values.startDate.toString().split(' ')[3]),
                          monthNames.indexOf(values.startDate.toString().split(' ')[1]),
                          Number(values.startDate.toString().split(' ')[2])
                        )
                        ? 'inRange'
                        : ''
                    }
                    ${
                      new Date(selectedDate.year, selectedDate.month, Number(day)).getTime() ===
                      new Date(
                        Number(values.startDate.toString().split(' ')[3]),
                        monthNames.indexOf(values.startDate.toString().split(' ')[1]),
                        Number(values.startDate.toString().split(' ')[2])
                      ).getTime()
                        ? 'selectedStartDay'
                        : ''
                    }
                    ${index === 0 ? 'startEdge' : ''}
                    ${index === 6 ? 'endEdge' : ''}
                  `}
                      aria-hidden="true"
                      onClick={() => handleDayClick(day)}
                      style={{ cursor: day ? 'pointer' : 'default' }}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="calendar__footer">
            <div className="timezone">
              <div className="label">Select time</div>
              <div className="selected__timezone" aria-hidden="true">
                {/* {endDateTemp.timezone}
                <img src={arrowDown} alt="Arrow Down" className={showTimezones ? 'rotate' : ''} />
                {showTimezones && (
                  <ul>
                    {timezones.map((tz) => (
                      <li
                        key={uuid()}
                        aria-hidden="true"
                        onClick={() =>
                          setEndDateTemp((prevState) => ({
                            ...prevState,
                            timezone: tz,
                          }))
                        }
                      >
                        {tz}
                      </li>
                    ))}
                  </ul>
                )} */}
                Your time zone is UTC+3
              </div>
            </div>
            {/* <div className="time__format">
              <div
                className={endDateTemp.format === 'AM' ? 'selected' : ''}
                aria-hidden="true"
                onClick={() => handleFormatClick('AM')}
              >
                AM
              </div>
              <div
                className={endDateTemp.format === 'PM' ? 'selected' : ''}
                aria-hidden="true"
                onClick={() => handleFormatClick('PM')}
              >
                PM
              </div>
            </div> */}
            <div className="time">
              <input
                type="text"
                value={endDateTemp.hours}
                onChange={(e) => handleHoursChange(e.target.value)}
              />
              <span>:</span>
              <input
                type="text"
                value={endDateTemp.minutes}
                onChange={(e) => handleMinutesChange(e.target.value)}
              />
            </div>
            <div className="actions">
              <Button className="light-border-button" onClick={handleCancelClick}>
                Cancel
              </Button>
              <Button className="light-button" onClick={handleSaveClick}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

EndDateCalendar.propTypes = {
  monthNames: PropTypes.oneOfType([PropTypes.array]).isRequired,
  values: PropTypes.oneOfType([PropTypes.any]).isRequired,
  setValues: PropTypes.func.isRequired,
  endDateTemp: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setEndDateTemp: PropTypes.func.isRequired,
  setShowEndDate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EndDateCalendar;
