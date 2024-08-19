const intro_prices = document.querySelectorAll('.intro_price'),
      blocks       = document.querySelectorAll('.block'),
      part         = document.querySelector('.part'),
      dark1         = document.querySelector('.dark');

intro_prices.forEach((intro_price, i) => {
    
    intro_price.addEventListener('mouseenter', () => {
        blocks[i].classList.add('active');
    })
    intro_price.addEventListener('mouseleave', () => {
        blocks[i].classList.remove('active');
    })

    intro_price.addEventListener('click', () => {
        part.classList.add('active');
        dark1.classList.add('active');
    })
})

dark1.addEventListener('click', () => {
    part.classList.remove('active');
    dark1.classList.remove('active');
})