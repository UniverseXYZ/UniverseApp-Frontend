import { formatDuration, intervalToDuration } from 'date-fns';

export const getTimeLeft = (date) => {
  const now = new Date();
  const endDate = new Date(date);
  const duration = intervalToDuration({
    start: now,
    end: endDate,
  });
  formatDuration(duration, {
    delimiter: ', ',
  });

  const timeLeft = [];
  Object.keys(duration).forEach((key, index) => {
    const currentValue = Object.values(duration)[index];
    if (currentValue) {
      let currentValueText = currentValue.toString();
      timeLeft.push((currentValueText += key.charAt(0)));
    }
  });
  return timeLeft;
};

export const getPromoImageProps = (imageUrl) => {
  const promoImageProps = {
    class: 'artist__image',
    src: '',
  };
  if (imageUrl) {
    promoImageProps.class = 'original';
    promoImageProps.src = imageUrl;
  }

  return promoImageProps;
};
