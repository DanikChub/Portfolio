const request = new XMLHttpRequest();

request.open('GET', 'db.json');
request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
request.send();

request.addEventListener('load', () => {
    if (request.status === 200) {
        console.log(request.response);
        const data = JSON.parse(request.response);
        console.log(data.works_items);
     
    } else {
        console.log('asd')
    }
});