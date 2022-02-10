import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Calendar.scss';
import uuid from 'react-uuid';
import arrow from '../../assets/images/arrow.svg';
import closeIcon from '../../assets/images/cross.svg';
import Button from '../button/Button.jsx';
import { parseDateForDatePicker } from './utils';
import { getTimezoneOffset } from '../../utils/dates';

const StartDateCalendar = React.forwardRef(
  (
    {
      auction,
      monthNames,
      values,
      setValues,
      startDateTemp,
      setStartDateTemp,
      setShowStartDate,
      setEndDateTemp,
      onClose,
    },
    ref
  ) => {
    const d = new Date();
    const weekNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const UTCHoursFromNow = getTimezoneOffset() / -60;
    const [currentMonth, setCurrentMonth] = useState([]);
    const [minDateTimeError, setMinDateTimeError] = useState(false);
    const [minHours, setMinHours] = useState(
      new Date().getHours() + 1 < 10 ? `0${new Date().getHours() + 1}` : new Date().getHours() + 1
    );
    const [minMins, setMinMins] = useState(
      new Date().getMinutes() + 1 < 10
        ? `0${new Date().getMinutes() + 1}`
        : new Date().getMinutes() + 1
    );
    const [selectedDate, setSelectedDate] = useState({
      year: values.startDate ? Number(values.startDate.toString().split(' ')[3]) : d.getFullYear(),
      month: values.startDate
        ? monthNames.indexOf(values.startDate.toString().split(' ')[1])
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
        setStartDateTemp((prevState) => ({
          ...prevState,
          hours: value,
        }));
      }

      if (
        new Date().getDate() === startDateTemp.day &&
        (Number(value) < minHours ||
          (Number(value) === minHours && Number(startDateTemp.minutes) < minMins))
      ) {
        setMinDateTimeError(true);
        return;
      }
      setMinDateTimeError(false);
    };

    const handleMinutesChange = (val) => {
      const value = val.replace(/[^\d]/, '');
      if (value.length < 3 && Number(value) < 60) {
        setStartDateTemp((prevState) => ({
          ...prevState,
          minutes: value,
        }));

        if (
          new Date().getDate() === startDateTemp.day &&
          Number(startDateTemp.hours) <= minHours &&
          Number(value) < minMins
        ) {
          setMinDateTimeError(true);
          return;
        }
        setMinDateTimeError(false);
      }
    };

    const handleDayClick = (day) => {
      if (day) {
        if (
          new Date(new Date(selectedDate.year, selectedDate.month, day).toDateString()) <
          new Date(new Date().toDateString())
        ) {
          alert('Start date can not be before today!');
        } else if (
          !auction.initialised &&
          values.endDate &&
          new Date(new Date(selectedDate.year, selectedDate.month, day).toDateString()) >
            new Date(
              Number(values.endDate.toString().split(' ')[3]),
              monthNames.indexOf(values.endDate.toString().split(' ')[1]),
              Number(values.endDate.toString().split(' ')[2])
            )
        ) {
          alert(
            `Start date must be before ${values.endDate.toString().split(' ')[1]} ${Number(
              values.endDate.toString().split(' ')[2]
            )}, ${Number(values.endDate.toString().split(' ')[3])}`
          );
        } else {
          setStartDateTemp((prevState) => ({
            ...prevState,
            month: monthNames[selectedDate.month],
            day,
            year: selectedDate.year,
          }));
        }
        if (day > new Date().getDate()) {
          setMinDateTimeError(false);
        } else if (
          Number(startDateTemp.hours) < minHours ||
          (Number(startDateTemp.hours) === minHours && Number(startDateTemp.minutes) < minMins)
        ) {
          setMinDateTimeError(true);
        }
      }
    };

    const handleCancelClick = () => {
      if (!values.startDate) {
        setStartDateTemp(parseDateForDatePicker(d));
      } else {
        setStartDateTemp({
          month: values.startDate.toString().split(' ')[1],
          day: Number(values.startDate.toString().split(' ')[2]),
          year: Number(values.startDate.toString().split(' ')[3]),
          hours: values.startDate.toString().split(' ')[4].substring(0, 2),
          minutes: values.startDate.toString().split(' ')[4].substring(3, 5),
          timezone: startDateTemp.timezone,
          format: startDateTemp.format,
        });
      }
      onClose();
    };

    const handleSaveClick = () => {
      if (startDateTemp.hours && startDateTemp.minutes) {
        const startDate = new Date(
          startDateTemp.year,
          monthNames.indexOf(startDateTemp.month),
          startDateTemp.day,
          startDateTemp.hours,
          startDateTemp.minutes
        );
        if (auction.initialised && startDate > values.endDate) {
          setValues((prevValues) => ({
            ...prevValues,
            startDate,
            endDate: startDate,
          }));
          setEndDateTemp((prevState) => ({
            ...prevState,
            month: monthNames[selectedDate.month],
            day: startDateTemp.day,
            year: startDateTemp.year,
          }));
          onClose();
        } else {
          setValues((prevValues) => ({
            ...prevValues,
            startDate: new Date(
              startDateTemp.year,
              monthNames.indexOf(startDateTemp.month),
              startDateTemp.day,
              startDateTemp.hours,
              startDateTemp.minutes
            ),
          }));
          onClose();
        }
      } else {
        setStartDateTemp((prevState) => ({
          ...prevState,
          hours: new Date().getHours(),
          minutes:
            new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes(),
        }));
        onClose();
      }
    };

    useEffect(() => {
      if (!values.startDate) {
        setStartDateTemp((prevState) => ({
          ...prevState,
          hours: new Date().getHours() === 24 ? 1 : new Date().getHours() + 1,
          minutes:
            new Date().getMinutes() < 9
              ? `0${new Date().getMinutes() + 1}`
              : new Date().getMinutes() + 1,
        }));
      }
    }, []);

    useEffect(() => {
      createDaysArray();
    }, [selectedDate]);

    useEffect(() => {
      document.body.classList.add('no__scroll');

      return () => document.body.classList.remove('no__scroll');
    }, []);

    return (
      <div className="calendar" ref={ref}>
        <img className="close" src={closeIcon} alt="Close" onClick={onClose} aria-hidden="true" />
        <div className="calendar__wrapper">
          <div className="calendar-first">
            <h1>Start date</h1>
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
                    <button
                      type="button"
                      key={uuid()}
                      className={`
                    ${
                      day === startDateTemp.day &&
                      monthNames[selectedDate.month] === startDateTemp.month &&
                      selectedDate.year === startDateTemp.year
                        ? 'selectedStartDay'
                        : ''
                    }
                    ${
                      day &&
                      values.endDate &&
                      new Date(selectedDate.year, selectedDate.month, day) >
                        new Date(
                          startDateTemp.year,
                          monthNames.indexOf(startDateTemp.month),
                          startDateTemp.day
                        ) &&
                      new Date(selectedDate.year, selectedDate.month, day) <
                        new Date(
                          Number(values.endDate.toString().split(' ')[3]),
                          monthNames.indexOf(values.endDate.toString().split(' ')[1]),
                          Number(values.endDate.toString().split(' ')[2])
                        )
                        ? 'inRange'
                        : ''
                    }
                    ${
                      new Date(selectedDate.year, selectedDate.month, Number(day)).getTime() ===
                      new Date(
                        Number(values.endDate.toString().split(' ')[3]),
                        monthNames.indexOf(values.endDate.toString().split(' ')[1]),
                        Number(values.endDate.toString().split(' ')[2])
                      ).getTime()
                        ? 'selectedEndDay'
                        : ''
                    }
                    ${index === 0 ? 'startEdge' : ''}
                    ${index === 6 ? 'endEdge' : ''}
                  `}
                      aria-hidden="true"
                      onClick={() => handleDayClick(day)}
                      style={{ cursor: day ? 'pointer' : 'default' }}
                      disabled={
                        new Date(
                          new Date(selectedDate.year, selectedDate.month, day).toDateString()
                        ) < new Date(new Date().toDateString())
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
            <div className="timezone">
              <div className="label">Select time</div>
              <div className="selected__timezone" aria-hidden="true">
                {`Your time zone is UTC${
                  UTCHoursFromNow > 0 ? `+${UTCHoursFromNow}` : UTCHoursFromNow
                }`}
              </div>
            </div>
            <div className="time">
              <input
                type="text"
                value={startDateTemp.hours}
                onChange={(e) => handleHoursChange(e.target.value)}
              />
              <span>:</span>
              <input
                type="text"
                value={startDateTemp.minutes}
                onChange={(e) => handleMinutesChange(e.target.value)}
              />
            </div>
            {minDateTimeError && (
              <p className="error-message">
                Selected time must be after {minHours}:{minMins}
              </p>
            )}
            <div className="actions">
              <Button className="light-border-button" onClick={handleCancelClick}>
                Cancel
              </Button>
              <Button
                className="light-button"
                onClick={handleSaveClick}
                disabled={minDateTimeError}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

StartDateCalendar.propTypes = {
  auction: PropTypes.oneOfType([PropTypes.object]).isRequired,
  monthNames: PropTypes.oneOfType([PropTypes.array]).isRequired,
  values: PropTypes.oneOfType([PropTypes.any]).isRequired,
  setValues: PropTypes.func.isRequired,
  startDateTemp: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setStartDateTemp: PropTypes.func.isRequired,
  setEndDateTemp: PropTypes.func.isRequired,
  setShowStartDate: PropTypes.func,
  onClose: PropTypes.func.isRequired,
};

StartDateCalendar.defaultProps = {
  setShowStartDate: () => {},
};

export default StartDateCalendar;
