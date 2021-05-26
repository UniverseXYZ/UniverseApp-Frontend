export const handleClickOutside = (event, className, ref, cb) => {
  if (!event.target.classList.contains(className)) {
    if (ref.current && !ref.current.contains(event.target)) {
      cb(false);
    }
  }
};

export const handleScroll = (website) => {
  if (window.scrollY > 0) {
    if (document.querySelector('header')) {
      document.querySelector('header').style.position = 'fixed';
      document.querySelector('header').classList.remove('dark');
    }
  } else if (window.scrollY <= 0) {
    if (document.querySelector('header')) {
      document.querySelector('header').style.position = 'relative';
      if (website) {
        document.querySelector('header').classList.add('dark');
      } else {
        document.querySelector('header').classList.remove('dark');
      }
    }
  }
};
