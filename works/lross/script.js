const body = document.querySelector('body'),
      nav = document.querySelector('.nav'),
      navItems = document.querySelectorAll('.nav__item'),
      catalog = document.querySelector('.catalog'),
      intro = document.querySelector('.intro'),
      footer = document.querySelector('.footer');


window.addEventListener('scroll', (e) => {
    if(window.pageYOffset > 100) {

        nav.classList.add('scrolling');

        navItems.forEach((navItem) => {
            navItem.classList.add('item__scrolling');
        });

    } else {

        nav.classList.remove('scrolling');

        navItems.forEach((navItem) => {
            navItem.classList.remove('item__scrolling');
        });

    }
    
});

navItems.forEach((navItem) => {
    navItem.addEventListener('click', () => {
        nav.classList.toggle('active');
        navToggle.classList.toggle('active');
        if (navItem.textContent == 'О нас') {
            window.scrollTo({
                top: intro.offsetTop,
                behavior: "smooth"
            });
        } else if (navItem.textContent == 'Каталог') {
            window.scrollTo({
                top: catalog.offsetTop,
                behavior: "smooth"
            });
        } else if (navItem.textContent == 'Контакты') {
            window.scrollTo({
                top: footer.offsetTop,
                behavior: "smooth"
            });
        }
    });
});

//nav-toggle

const navToggle = document.querySelector('.nav-toggle');

navToggle.addEventListener('click', (e) => {
    e.preventDefault();

    navToggle.classList.toggle('active');
    nav.classList.toggle('active');
});

// input

const inputs = document.querySelectorAll('.input'),
      formButt = document.querySelector('.form__button'),
      form = document.getElementById('form');

let err = false;

formButt.addEventListener('click', () => {
    inputs.forEach((input) => {
        if (input.value == '') {
            input.classList.add('err');
            err = true;
        }  else {
            err = false;
        }

    });

});



form.addEventListener('submit', formSend);


async function formSend(e) {
    e.preventDefault();

    let formData = new FormData(form);

    if (!err) {
        form.classList.add('_sending');
        let response = await fetch('sendmail.php', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            let result = await response.json();
            alert(result.message)
            inputs.forEach((input) => {
                input.textContent = '';
            })
            form.reset();
            form.classList.remove('_sending');
            form.classList.add('_down');
        } else {
            alert('Ошибка');
            form.classList.remove('_sending');
        }
    } else {
        alert('Заполните все пункты!')
    }
}
    




