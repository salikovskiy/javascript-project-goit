import '../../styles.css';
import '../sideBar/sideBar.css';
import category from '../templates/menuList.hbs';
import services from '../../services/services';
import itemCard from '../../components/itemCard/itemCard';

const refs = {
  btnMenu: document.querySelector('.modal-menu'),
  modalka: document.querySelector('#modalka'),
  close: document.querySelector('.close'),
  ul: document.querySelector('.navigation__menu_list'),
  li: document.querySelector('.navigation__menu_list-item'),
  logIn: document.querySelector('.loginOnMobile'),
  logOut: document.querySelector('.logout'),
  categories: document.querySelector('.categories'),
};

// слушатели на кнопках

refs.btnMenu.addEventListener('click', () => {
  refs.modalka.setAttribute('class', 'menu-wrapper');
});

refs.close.addEventListener('click', () => {
  refs.modalka.setAttribute('class', 'menu-wrapper-none');
});

// выводим категории

// const state = {
//   categories: [],
// };

const getCategorys = async () => {
  await services.getAllProduct().then(data => {
    const string = category(data.categories);
    refs.ul.insertAdjacentHTML('beforeend', string);
  });
};
getCategorys();

// переход на категорию

const onHandleClick = async evt => {
  refs.categories.innerHTML = '';
  refs.categories.classList.add('sideContainer');
  // console.log(evt.target.id);
  // console.log('block', refs.categories);
  const getCategory = await services.getCategoriesWithNumberCategories(
    evt.target.id,
    services.page,
  );
  // console.log(getCategory);
  refs.categories.insertAdjacentHTML(
    'beforeend',
    getCategory
      .map(elem => `<li class="sideCard">${itemCard(elem)}</li>`)
      .join(''),
  );
};

refs.ul.addEventListener('click', onHandleClick);

//вывод входа в личный кабинет

const userLogin = localStorage.getItem('userName');

// if (localStorage.getItem('token')) {
//   const userName = localStorage.getItem('userName');
//   refs.userName.textContent = userName;
//   refs.accountBtn.textContent = userName[0];
// }

refs.logIn.addEventListener('click', event => {
  if (!localStorage.getItem('token')) {
    return;
  }
});

// if (localStorage.getItem('token')) {
//   refs.logIn.textContent = userLogin;
//   refs.logOut.setAttribute('style', 'display: block');
// }
