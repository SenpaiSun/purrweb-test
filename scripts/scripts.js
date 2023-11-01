const buttonsSales = document.querySelectorAll('.header__button, .hero__button, .business__button, .popup__contacts-submit, .footer__button, .popup__burger-button');
const buttonsClosePopup = document.querySelectorAll('.popup__contacts-close, .popup__success-button, .popup__success-close');
const burgerOpened = document.querySelector('.header__menu-toggle')
const burgerClose = document.querySelector('.popup__burger-close')
const requiredInputs = document.querySelectorAll('.popup__contacts-input[required], .popup__contacts-phone[required]');
const errorElements = document.querySelectorAll('.popup__contacts-error');
const submitButton = document.querySelector('.popup__contacts-submit');
const submitForm = document.querySelector('.popup__contacts-form')
const successForm = document.querySelector('.popup_success')
const buttonBurger = document.querySelector('.popup__burger-button')
const headerMenu = document.querySelector('.header__menu');
const mainFixedMenu = document.querySelector('.main');
const mainError = document.querySelector('.popup__contacts-error-main');
const buttonsClosePopupCookies = document.querySelectorAll('.popup__cookie-close, .popup__cookie-accept, .popup__cookie-decline');
const popupPhone = document.querySelector('.popup__contacts-phone');

// Function for open contacts popup
function openPopup() {
  document.querySelector('.popup_contacts').classList.add('popup_opened');
  document.querySelector('.root').classList.add('root_scroll-disable');
  document.querySelector('.content').classList.add('content-inactive');
}

// Function for close all popups
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

// Function to check whether required fields
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
  })
});

// Event handler for changing input fields
requiredInputs.forEach((input) => {
  input.addEventListener('input', (event) => {
    if (validateForm()) {
      event.preventDefault()
      submitButton.classList.remove('popup__button-disabled');
      mainError.style.display = 'none'
    } else {
      submitButton.classList.add('popup__button-disabled');
      mainError.style.display = 'block'
    }
    if (input.value.trim() === '') {
      input.style.border = '1px solid #EC1211';
    } else {
      input.style.border = '1px solid #F1F1F1';
    }
  });
});

submitForm.addEventListener('submit', (event) => {
  event.preventDefault()
  closePopup()
  successForm.classList.add('popup_opened')
})

// Handler for fixed header menu
const scrollOffset = 80;

window.addEventListener('scroll', () => {
  if (window.scrollY >= scrollOffset) {
    headerMenu.classList.add('header__menu_fixed');
    mainFixedMenu.classList.add('main_active-fixed');
  } else {
    headerMenu.classList.remove('header__menu_fixed');
    mainFixedMenu.classList.remove('main_active-fixed');
  }
});

// Handlers for cookies buttons
buttonsClosePopupCookies.forEach((button) => {
  button.addEventListener('click', () => {
    const popupClosedCookie = document.querySelector('.popup_cookie')
    popupClosedCookie.classList.remove('popup_cookie_active')
  })
})

// Add mask for number input
popupPhone.addEventListener('input', (event) => {
  const value = event.target.value
  const regexValue = /^(\+7)/
  if(regexValue.test(value)) {
    popupPhone.classList.add('popup__contacts-phone_ru')
  } else {
    popupPhone.classList.remove('popup__contacts-phone_ru')
  }
})
