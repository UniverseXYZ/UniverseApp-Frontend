const errors = {
    VALID_TIME: 'Please, set a valid time',
    VALID_START_TIME: 'Please, set a valid start time'
}

export const listingValidation = (date: Date, isValid: boolean, hours: string, minutes: string, touched: any, setState: Function) => {
    const isToday = date && date.getDate() === new Date().getDate();

    if(!isValid && (touched.hours || touched.minutes)) {
       setState(errors.VALID_TIME);
       return;
    }

    if(isToday && hours && minutes) {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const date = now.getDate();

      const start = new Date(year, month, date, Number(hours), Number(minutes));
      const startTimeTimestamp = Math.floor(start.getTime() / 1000);
      const nowTimestamp = Math.floor(new Date().getTime() / 1000);

      if((startTimeTimestamp < nowTimestamp || !isValid)) {
        setState(errors.VALID_START_TIME);
      } else {
        setState('')
      }
    } else {
        if(!isValid && (touched.hours || touched.minutes)) {
          setState(errors.VALID_TIME);
      } else {
          setState('')
      }
    }
}