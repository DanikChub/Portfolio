const block_items = document.querySelectorAll('.block_item');

block_items.forEach((block_item) => {
    block_item.addEventListener('mouseenter', () => {
        block_items.forEach((block) => {
            block.style.filter = "blur(2px) grayscale(1)";
            block_item.style.filter = "blur(0) grayscale(0)";
        })
    })

    block_item.addEventListener('mouseleave', () => {
        block_items.forEach((block) => {
            block.style.filter = "blur(0px) grayscale(1)";
            block_item.style.filter = "blur(0) grayscale(1)";
        })
    })
})