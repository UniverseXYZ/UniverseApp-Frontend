export const handleClickOutside = (event, className, ref, cb) => {
  if (!event.target.classList.contains(className)) {
    if (ref.current && !ref.current.contains(event.target)) {
      cb(false);
    }
  }
};
