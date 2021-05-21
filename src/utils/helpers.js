export const handleClickOutside = (event, className, ref, cb) => {
  if (!event.target.classList.contains(className)) {
    if (ref.current && !ref.current.contains(event.target)) {
      cb(false);
    }
  }
};

export const handleScroll = (website) => {
  if (window.scrollY > 0) {
    if (window.document.querySelector('header')) {
      window.document.querySelector('header').style.position = 'fixed';
      window.document.querySelector('header').classList.remove('dark');
    }
  } else if (window.scrollY <= 0) {
    if (window.document.querySelector('header')) {
      window.document.querySelector('header').style.position = 'relative';
      if (website) {
        window.document.querySelector('header').classList.add('dark');
      } else {
        window.document.querySelector('header').classList.remove('dark');
      }
    }
  }
};
