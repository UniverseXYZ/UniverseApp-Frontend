import React, { useState, useRef } from 'react';
import Popup from 'reactjs-popup';
import EndDateCalendar from './EndDateCalendar.jsx';
import Input from '../input/Input';
import callendarIcon from '../../assets/images/calendar.svg';
import './EndDatePicker.scss';
import './Calendar.scss';

const EndDatePicker = () => {
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
  const [values, setValues] = useState({ endDate: '', startDate: '' });
  const [showEndDate, setShowEndDate] = useState(false);
  const endDateRef = useRef(null);
  const [endDateTemp, setEndDateTemp] = useState({
    month: monthNames[d.getMonth()],
    day: d.getDate(),
    year: d.getFullYear(),
    hours: new Date().getHours(),
    minutes: new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes(),
    timezone: 'GMT +04:00',
    format: 'AM',
  });

  return (
    <div className="date__input">
      <div style={{ position: 'relative' }}>
        <Input
          type="text"
          readOnly
          onClick={() => setShowEndDate(true)}
          id="endDate"
          autoComplete="off"
          value={
            values.endDate
              ? `${values.endDate.toString().split(' ')[1]}
              ${values.endDate.toString().split(' ')[2]},
              ${values.endDate.toString().split(' ')[3]}, ${values.endDate
                  .toString()
                  .split(' ')[4]
                  .substring(0, 5)} ${endDateTemp.timezone}`
              : ''
          }
          //   error={!value.length ? undefined : 'End date is required!'}
        />
        <Popup
          trigger={
            <img
              aria-hidden="true"
              className="callendar__image"
              src={callendarIcon}
              alt="Callendar"
              //   onClick={() => setShowStartDate(true)}
            />
          }
        >
          {(close) => (
            <EndDateCalendar
              ref={endDateRef}
              monthNames={monthNames}
              values={values}
              setValues={setValues}
              endDateTemp={endDateTemp}
              setEndDateTemp={setEndDateTemp}
              setShowEndDate={setShowEndDate}
              onClose={close}
            />
          )}
        </Popup>
      </div>
    </div>
  );
};

export default EndDatePicker;
