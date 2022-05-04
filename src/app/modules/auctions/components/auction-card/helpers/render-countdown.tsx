import { CountdownRendererFn, zeroPad } from 'react-countdown';

export const renderCountdown: CountdownRendererFn = ({ days, hours, minutes, seconds }) => {
  if (!days && !hours && !minutes) {
    return [
      seconds || minutes ? `${zeroPad(seconds)}s` : '',
    ].filter(Boolean).join(' : ');
  }
  return [
    days ? `${days}d` : '',
    hours ? `${zeroPad(hours)}h` : '',
    minutes ? `${zeroPad(minutes)}m` : '',
  ].filter(Boolean).join(' : ');
};
