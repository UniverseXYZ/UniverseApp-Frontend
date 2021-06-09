import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Callendar.scss';
import uuid from 'react-uuid';
import arrow from '../../assets/images/arrow.svg';
import arrowDown from '../../assets/images/arrow-down.svg';
import closeIcon from '../../assets/images/cross.svg';
import Button from '../../components/button/Button';

const Calendar = (props) => {
  const { className, ...rest } = props;
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
  const [startDateTemp, setStartDateTemp] = useState({
    month: monthNames[d.getMonth()],
    day: d.getDate(),
    year: d.getFullYear(),
    hours: '12',
    minutes: '00',
    timezone: 'GMT +04:00',
    format: 'AM',
  });
  const [endDateTemp, setEndDateTemp] = useState({
    month: monthNames[d.getMonth()],
    day: d.getDate(),
    year: d.getFullYear(),
    hours: '12',
    minutes: '00',
    timezone: 'GMT +04:00',
    format: 'AM',
  });
  const [currentMonth, setCurrentMonth] = useState([]);
  const [values, setValues] = useState({
    name: '',
    startingBid: '',
    startDate: '',
    endDate: '',
  });
  const [selectedDate, setSelectedDate] = useState({
    year: values.startDate ? Number(values.startDate.toString().split(' ')[3]) : d.getFullYear(),
    month: values.startDate
      ? monthNames.indexOf(values.startDate.toString().split(' ')[1])
      : d.getMonth(),
  });
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  console.log(monthNames);

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

  const handleHoursChangeStart = (val) => {
    const value = val.replace(/[^\d]/, '');
    if (value.length < 3 && Number(value) < 24) {
      setStartDateTemp((prevState) => ({
        ...prevState,
        hours: value,
      }));
    }
  };
  const handleHoursChangeEnd = (val) => {
    const value = val.replace(/[^\d]/, '');
    if (value.length < 3 && Number(value) < 24) {
      setEndDateTemp((prevState) => ({
        ...prevState,
        hours: value,
      }));
    }
  };

  const handleMinutesChangeStart = (val) => {
    const value = val.replace(/[^\d]/, '');
    if (value.length < 3 && Number(value) < 60) {
      setStartDateTemp((prevState) => ({
        ...prevState,
        minutes: value,
      }));
    }
  };
  const handleMinutesChangeEnd = (val) => {
    const value = val.replace(/[^\d]/, '');
    if (value.length < 3 && Number(value) < 60) {
      setEndDateTemp((prevState) => ({
        ...prevState,
        minutes: value,
      }));
    }
  };

  const handleDayClickStart = (day) => {
    if (day) {
      if (
        new Date(new Date(selectedDate.year, selectedDate.month, day).toDateString()) <
        new Date(new Date().toDateString())
      ) {
        alert('Start date can not be before today!');
      } else if (
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
    }
  };

  const handleDayClickEnd = (day) => {
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

  useEffect(() => {
    createDaysArray();
  }, [selectedDate]);

  return (
    <div>
      {className === 'start__date' ? (
        <div className="calendar" ref={startDateRef}>
          <div className="calendar-first">
            <h1>Start date</h1>
            <div className="calendar__header">
              <button className="left-btn" type="button" onClick={() => changeMonth('prev')}>
                <img className="left" src={arrow} alt="Left arrow" />
              </button>
              <h3>{`${monthNames[selectedDate.month]} ${selectedDate.year}`}</h3>
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
                            new Date(
                              selectedDate.year,
                              selectedDate.month,
                              Number(day)
                            ).getTime() ===
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
                      onClick={() => handleDayClickStart(day)}
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
            <img className="close" src={closeIcon} alt="Close" aria-hidden="true" />
            <div className="timezone">
              <div className="label">Time zone:</div>
              <div className="selected__timezone" aria-hidden="true">
                Your time zone is UTC+3
              </div>
            </div>

            <div className="time">
              <input
                type="text"
                value={startDateTemp.hours}
                onChange={(e) => handleHoursChangeStart(e.target.value)}
              />
              <span>:</span>
              <input
                type="text"
                value={startDateTemp.minutes}
                onChange={(e) => handleMinutesChangeStart(e.target.value)}
              />
            </div>
            <div className="actions">
              <Button className="light-border-button">Cancel</Button>
              <Button className="light-button">Save</Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="calendar" ref={endDateRef}>
          <div className="calendar-first">
            <h1>End date</h1>
            <div className="calendar__header">
              <button className="left-btn" type="button" onClick={() => changeMonth('prev')}>
                <img className="left" src={arrow} alt="Left arrow" />
              </button>
              <h3>{`${monthNames[selectedDate.month]} ${selectedDate.year}`}</h3>
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
                      onClick={() => handleDayClickEnd(day)}
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
            <img className="close" src={closeIcon} alt="Close" aria-hidden="true" />
            <div className="timezone">
              <div className="label">Time zone:</div>
              <div className="selected__timezone" aria-hidden="true">
                Your time zone is UTC+3
              </div>
            </div>
            <div className="time">
              <input
                type="text"
                value={endDateTemp.hours}
                onChange={(e) => handleHoursChangeEnd(e.target.value)}
              />
              <span>:</span>
              <input
                type="text"
                value={endDateTemp.minutes}
                onChange={(e) => handleMinutesChangeEnd(e.target.value)}
              />
            </div>
            <div className="actions">
              <Button className="light-border-button">Cancel</Button>
              <Button className="light-button">Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Calendar.propTypes = {
  className: PropTypes.string,
};

Calendar.defaultProps = {
  className: 'start__date',
};

export default Calendar;
