const container = document.querySelector('.project_info_inner');




var params = (function() {
    var a = window.location.search;
    var b = new Object();
    a = a.substring(1).split("&");
    for (var i = 0; i < a.length; i++) {
  	c = a[i].split("=");
        b[c[0]] = c[1];
    }
    return b;
})();

const request = new XMLHttpRequest();

request.open('GET', './js/databases/db.json');
request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
request.send();

request.addEventListener('load', () => {
    if (request.status === 200) {
        const data = JSON.parse(request.response);
        
        let filteredArray = data.works_items.filter(el => el.id == params.id)
        let str = ``;

        str += `
            <div class="project_info_text">
                <div class="project_info_ontitle">${filteredArray[0].tools}</div>
                <div class="project_info_title">${filteredArray[0].title}</div>
               
                
                <div class="project_info_description">${filteredArray[0].description}</div>
            
                <table class="project_info_table">
                    <tbody>
                        <tr>
                            <th>стоимость: </th>
                            <td>${filteredArray[0].price}₽</td>
                        </tr>
                        <tr>
                            <th>примерный срок: </th>
                            <td>${filteredArray[0].work_time}</td>
                        </tr>
                        <tr>
                            <th>сложность: </th>
                            <td>${filteredArray[0].complexity}/10</td>
                        </tr>
                        <tr>
                            <th>биржа: </th>
                            <td>${filteredArray[0].burse}</td>
                        </tr>
                       
                    </tbody>
                </table>
            </div>
            
           
            <div class="project_info_video_container">
                <video class="project_info_video" src=${filteredArray[0].video_url} autoplay muted loop>
                    
                </video>
                <a href=${filteredArray[0].url} target="_blank" class="project_info_video_link">смотреть сайт</a>
            </div>
        `
        
        console.log(str);
        container.innerHTML = str;

    } else {
        console.log('asd')
    }
});