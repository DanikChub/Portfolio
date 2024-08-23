const form = document.getElementById('form');
const inputs = document.querySelectorAll('#input');
const inputNumber = document.querySelector('.inputNumber');
const inputName = document.querySelector('.inputName');
const inputEmail = document.querySelector('.inputEmail');


// const body = document.body;

const requestURL = 'http://localhost:5000/api/form'

function validateNumber(numberInput) {

    if ((numberInput.value[0] + numberInput.value[1] == '+7' && !numberInput.value.slice(2).match(/\D/) && numberInput.value.length == 12) || (numberInput.value[0] == '8' && !numberInput.value.match(/\D/) && numberInput.value.length == 11) ) {
        return true;
    }

    return false;
}

function validateName(nameInput) {

    if (nameInput.value.match(/\d/) || nameInput.value == '' ) {
        return false;
    }

    return true;
}

function validateEmail(emailInput) {

    if (emailInput.value.match(/\w\@\w\w/)) {
        return true;
    }

    return false;
}
 


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

     formSend(e);
    
    
});


async function formSend(e) {
    e.preventDefault();

    let formData = getFormDate(inputs, ['name', 'email', 'number', 'message']);


    if (validateName(inputName) && validateEmail(inputEmail) && validateNumber(inputNumber)) {
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
        } else {
            alert('Что-то пошло не так...')
        }
    } else {
        if (!validateName(inputName)) {
            inputName.classList.add('dangerous');
        } else {
            inputName.classList.remove('dangerous');
        }
        if (!validateEmail(inputEmail)) {
            inputEmail.classList.add('dangerous');
        } else {
            inputEmail.classList.remove('dangerous');
        }
        if (!validateNumber(inputNumber)) {
            inputNumber.classList.add('dangerous');
        } else {
            inputNumber.classList.remove('dangerous');
        }
        alert('Пожалуйста, заполните корректно все поля!')
    }

    



}
    



