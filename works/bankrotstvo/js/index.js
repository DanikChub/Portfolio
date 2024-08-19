const nav = document.querySelector('.nav');
const intro = document.querySelector('.intro');
const popupsButtons = document.querySelectorAll('#form_button');
const popup = document.getElementById('popup');
const popupClose = document.querySelector('.popup_close');
const body = document.body;



addEventListener('scroll', () => {
    if (window.pageYOffset > 900) {
        nav.classList.add('fixed');
    } else {
        nav.classList.remove('fixed');
    }

})

popupsButtons.forEach((popupsButton) => {
    popupsButton.addEventListener('click', () => {
        popup.classList.add('popup_block');
        body.classList.add('body_popup');
    })
})

popupClose.addEventListener('click', () => {
    popup.classList.remove('popup_block');
    body.classList.remove('body_popup');
})

popup.addEventListener('click', (e) => {
    if (!e.target.closest('.popup_content')) {
        popup.classList.remove('popup_block');
        body.classList.remove('body_popup');
    }
})