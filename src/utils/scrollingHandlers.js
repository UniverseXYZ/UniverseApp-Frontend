export const handleTabRightScrolling = () => {
  let scrollAmount = 0;
  const slideTimer = setInterval(() => {
    document.querySelector('.tabs').scrollLeft += 10;
    scrollAmount += 10;
    if (scrollAmount >= 100) {
      window.clearInterval(slideTimer);
      document.querySelector('.tab__left__arrow').style.display = 'flex';
      if (document.querySelector('.tabs').scrollLeft > 200) {
        document.querySelector('.tab__right__arrow').style.display = 'none';
      }
    }
  }, 25);
};

export const handleTabLeftScrolling = () => {
  let scrollAmount = 100;
  const slideTimer = setInterval(() => {
    document.querySelector('.tabs').scrollLeft -= 10;
    scrollAmount -= 10;
    if (scrollAmount <= 0) {
      window.clearInterval(slideTimer);
      document.querySelector('.tab__right__arrow').style.display = 'flex';
      if (document.querySelector('.tabs').scrollLeft <= 0) {
        document.querySelector('.tab__left__arrow').style.display = 'none';
      }
    }
  }, 25);
};
