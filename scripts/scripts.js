const buttonsSales = document.querySelectorAll('.header__button, .hero__button, .business__button, .popup__contacts-submit, .footer__button, .popup__burger-button');
const buttonsClosePopup = document.querySelectorAll('.popup__cookie-close, .popup__contacts-close, .popup__success-button, .popup__success-close');
const burgerOpened = document.querySelector('.header__menu-toggle')
const burgerClose = document.querySelector('.popup__burger-close')
const requiredInputs = document.querySelectorAll('.popup__contacts-input[required], .popup__contacts-phone[required]');
const errorElements = document.querySelectorAll('.popup__contacts-error');
const submitButton = document.querySelector('.popup__contacts-submit');
const submitForm = document.querySelector('.popup__contacts-form')
const successForm = document.querySelector('.popup_success')
const buttonBurger = document.querySelector('.popup__burger-button')

// Function open contacts popup
function openPopup() {
  document.querySelector('.popup_contacts').classList.add('popup_opened');
  document.querySelector('.root').classList.add('root_scroll-disable');
  document.querySelector('.content').classList.add('content-inactive');
}

// Function close cookie and contacts popup
function closePopup() {
  document.querySelector('.popup_success').classList.remove('popup_opened');
  document.querySelector('.popup_contacts').classList.remove('popup_opened');
  document.querySelector('.root').classList.remove('root_scroll-disable');
  document.querySelector('.content').classList.remove('content-inactive');
}

// Listeners for button sales, burger and close popup
buttonsSales.forEach(button => {
  button.addEventListener('click', openPopup);
});

buttonsClosePopup.forEach(button => {
  button.addEventListener('click', closePopup);
})

burgerOpened.addEventListener('click', () => {
  document.querySelector('.popup_burger').classList.add('popup_opened');
  document.querySelector('.root').classList.add('root_scroll-disable');
})

burgerClose.addEventListener('click', () => {
  document.querySelector('.popup_burger').classList.remove('popup_opened');
  document.querySelector('.root').classList.remove('root_scroll-disable');
})

buttonBurger.addEventListener('click', () => {
  document.querySelector('.popup_burger').classList.remove('popup_opened')
})

// Function to check whether required fields are filled in
function validateForm() {
  let formIsValid = true;

  requiredInputs.forEach((input, index) => {
    if (input.value.trim() === '') {
      errorElements[index].style.display = 'block';
      formIsValid = false;
    } else {
      errorElements[index].style.display = 'none';
    }
  });

  return formIsValid;
}

// Event handler for validation check in case of loss of focus
requiredInputs.forEach((input, index) => {
  input.addEventListener('blur', () => {
    if (input.value.trim() === '') {
      errorElements[index].style.display = 'block';
    } else {
      errorElements[index].style.display = 'none';
    }
  });
});

// Event handler for changing input fields
requiredInputs.forEach((input) => {
  input.addEventListener('input', (event) => {
    if (validateForm()) {
      event.preventDefault()
      submitButton.classList.remove('popup__button-disabled');
    } else {
      submitButton.classList.add('popup__button-disabled');
    }
  });
});

submitForm.addEventListener('submit', (event) => {
  event.preventDefault()
  closePopup()
  successForm.classList.add('popup_opened')
})

const headerMenu = document.querySelector('.header__menu');
const scrollOffset = 80;


window.addEventListener('scroll', () => {
  if (window.scrollY >= scrollOffset) {
    headerMenu.classList.add('header__menu_fixed');
  } else {
    headerMenu.classList.remove('header__menu_fixed');
  }
});