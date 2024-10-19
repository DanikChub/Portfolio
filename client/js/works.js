const block = document.querySelector('.block');

const request = new XMLHttpRequest();

request.open('GET', './js/databases/db.json');
request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
request.send();

request.addEventListener('load', () => {
    if (request.status === 200) {
        const data = JSON.parse(request.response);
        
        let str = ``;

        data.works_items.forEach(work_item => {
            str+= `<a href="./project.html?id=${work_item.id}" class="block_item" rel="noopener noreferrer">
                        <img class="block_img" src=${work_item.image_url} alt="">
                        <div class="block_ontitle">
                            <div class="block_price">${work_item.price}₽</div>
                            <div class="block_time">${work_item.work_time}</div>
                        </div>
                        
                        <div class="block_title">${work_item.title}</div>
                        
                    </a>`
        });
        

        block.innerHTML = str;

    } else {
        console.log('asd')
    }
});