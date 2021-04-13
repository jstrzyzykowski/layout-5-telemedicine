const menuButton = document.getElementById('mobile-menu');
const menu = document.querySelector('.navbar__menu');

menuButton.addEventListener('click', () => {
  menu.classList.toggle('menu-active');
});

const cards = document.querySelectorAll('.recommend__specialist-box');

cards.forEach((card) => {
  const hoursItems = card.querySelectorAll('.date-hours a').length;
  const moreBtn = card.querySelector('.more-btn');

  if(hoursItems > 4) {
    moreBtn.classList.add('active');
    const hoursContainer = card.querySelector('.date-hours');

    moreBtn.addEventListener('click', () => {
      const isExpanded = hoursContainer.getAttribute('data-expanded');
      if(isExpanded == 'true') {
        hoursContainer.style.height = '35px';
        hoursContainer.setAttribute('data-expanded', "false");
        moreBtn.style.transform = "translate(-50%, 50%) rotate(0deg)";
      }
      else {
        hoursContainer.style.height = '120px';
        hoursContainer.setAttribute('data-expanded', "true");
        moreBtn.style.transform = "translate(-50%, 50%) rotate(180deg)";
      }
    });
  }
});

const showToggler = document.querySelector('.show-toggler');
const theme = document.querySelector('.theme');
const darkMode = document.getElementById('dark-mode');
const body = document.querySelector('.body');

showToggler.addEventListener('click', () => {
  showToggler.classList.toggle('active');
  theme.classList.toggle('active');
});

darkMode.addEventListener('change', () => {
  body.classList.toggle('dark');
});