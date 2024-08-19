const form = document.getElementById('form');
const inputs = document.querySelectorAll('#input');

// const body = document.body;


function getFormDate(inputs, names) {
    
    const formDate = {};
    
    for (let i = 0; i < inputs.length; i++) {
        for (let j = 0; j < inputs.length; j++) {
            inputs[i].name == names[j] ? formDate[names[j]] = inputs[i].value : null;
        }
    }

    
    return formDate;
    
}

form.addEventListener('submit', (e) => {
    formSend(e)
});


async function formSend(e) {
    e.preventDefault();

    let formData = getFormDate(inputs, ['name', 'message']);
    formData['doc'] = Math.ceil(Math.random() * 10000);

    const headers = {
        'Content-Type': 'application/json'
    }
    
    let res = await fetch(requestURL, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: headers
    });

    if (res.ok) {
        popup.classList.remove('popup_block');
        body.classList.remove('body_popup');

    }

}
    



