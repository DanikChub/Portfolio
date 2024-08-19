const burger = document.querySelector('.burger'),
      nav_1    = document.querySelector('.nav'),
      dark   = document.querySelector('.dark');

let burger_active = false;

burger.addEventListener('click', () => {
    if (!burger_active) {
        burger.classList.add('active');
        nav_1.classList.add('active');
        dark.classList.add('active');
        burger_active = true;
        document.body.style.overflow = "hidden";
    } else {
        burger.classList.remove('active');
        burger_active = false;
        nav_1.classList.remove('active');
        dark.classList.remove('active');
        document.body.style.overflow = "scroll";
    }
    
})