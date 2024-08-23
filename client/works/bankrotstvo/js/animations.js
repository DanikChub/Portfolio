const animatedBlocks = document.querySelectorAll('.animClass');

scrollAnimation();
addEventListener('scroll', () => {
    scrollAnimation();
})

function scrollAnimation() {
    let windowCenter = (innerHeight / 2) + scrollY;
    animatedBlocks.forEach(el => {
        let scrollOffset = el.offsetTop - el.offsetHeight*1.5;
        if (windowCenter >= scrollOffset) {

            el.classList.add('anim');
        } 
    })
}