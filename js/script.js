//Setting 'name' text field to be focused on load
const focusName = document.querySelector("input[type='text']");
focusName.focus();

//Selecting Job Role 'Other' will reveal text form
const title = document.querySelector('[name="user-title"]');
const hideOther = document.querySelector('.other-job-role');
hideOther.style.display = 'none';

function selectJobRole (e){
    let select = e.target;
    if (select.value !== 'other'){
        hideOther.style.display = 'none';
    } else {
        hideOther.style.display = '';
    }
}

title.addEventListener('input', selectJobRole);

/* T-Shirt Info */
const design = document.querySelector('#design');
const color = document.querySelector('#color');
const colorOption = color.children; 
color.disabled = true;

design.addEventListener('change', (e) => {
    color.disabled = false; 
    for (let i=0;i<colorOption.length;i++){
        let select = e.target.value
        let dataTheme = colorOption[i].getAttribute('data-theme');
        if (colorOption[i].getAttribute('data-theme') === select) {
            colorOption[i].hidden = false;
            select.hidden = true;
       } else {
            colorOption[i].hidden = true;
            select.hidden = false;
       }
    }
})

/* "Register for Activies" Section */
let fieldset = document.querySelector('.activities');
let totalCost = document.getElementById('activities-cost');
let checkbox = document.querySelectorAll('input[type="checkbox"]');


for(let i=0;i<checkbox.length;i++){
    checkbox[i].addEventListener("focus", () => {
        checkbox[i].parentElement.classList.add("focus");
        checkbox[i].parentElement.classList.add("blur");
    })

    checkbox[i].addEventListener("blur", () => {
        checkbox[i].parentElement.classList.remove("focus");
        checkbox[i].parentElement.classList.add("blur");
    })
}

let finalTotal = 0;
fieldset.addEventListener('change', (e) => {
    let clicked = e.target;
    let clickedCost = clicked.getAttribute('data-cost');
    let price = parseInt(clickedCost);
        if (clicked.checked){
            finalTotal += price;
        } else {
            finalTotal -= price;
        }
        let total = finalTotal.toString();

        for (let i=0; i<checkbox.length;i++){
            let checkboxType = checkbox[i].getAttribute('data-day-and-time');
            let clickedDayAndTime = clicked.getAttribute('data-day-and-time');
            if (checkboxType === clickedDayAndTime && clicked !==checkbox[i]){
                if (clicked.checked){
                checkbox[i].disabled = true;
            } else {
                checkbox[i].disabled = false;
            }
            }
        }
    function updateCost(total){
        totalCost.innerHTML = `Total: $${total}`;
    }
    updateCost(finalTotal);
})


/* Payment Info Section */ 
const paymentMethod = document.querySelector('#payment');
const creditCard = document.querySelector('div [id="credit-card"]');
const paypal = document.querySelector('div [id="paypal"]');
const bitcoin = document.querySelector('div [id="bitcoin"]');
creditCard.style.display = "none";
paypal.style.display = "none";
bitcoin.style.display = "none";

paymentMethod.addEventListener('change', (e) => {
    let select = e.target;
    if (select.value === 'credit-card'){
        creditCard.style.display = "";
        paypal.style.display = "none";
        bitcoin.style.display = "none";
    } else if (select.value === 'paypal'){
        creditCard.style.display = "none";
        paypal.style.display = "";
        bitcoin.style.display = "none";
    } else if (select.value === 'bitcoin') {
        creditCard.style.display = "none";
        paypal.style.display = "none";
        bitcoin.style.display = "";
    }
})

/* Form Validation Part */

const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const card = document.querySelector('input[id="cc-num"]');
const zip = document.querySelector('input[id="zip"]');
const cvv = document.querySelector('input[id="cvv"]');

const activityTotalElement = document.querySelector('#activities-total')
let activityTotal = 0;

document.querySelector('#activities').addEventListener('change', e => {
    (e.target.checked) ? activityTotal++ : activityTotal--;
  });


/* Validators */
function nameValidator(){
let nameValue = nameInput.value;
const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);
return nameIsValid;
}
function emailValidator(){
const emailValue= emailInput.value;
const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
return emailIsValid;
}

function activityValidator() {
    const activtySectionIsValid = activityTotal > 0;
    return activtySectionIsValid;
}

function creditCardValidator(){
    const creditCardValue = card.value;
    const creditCardIsValid = /^\d{13,16}/.test(creditCardValue);
    return creditCardIsValid;
}

function zipValidator(){
    const zipValue = zip.value;
    const zipIsValid = /^\d{5}$/.test(zipValue);
    return zipIsValid;
}

function cvvValidator(){
    const cvvValue=cvv.value;
    const cvvIsValid = /^\d{3,4}/.test(cvvValue);
    return cvvIsValid;
}


form.addEventListener('submit', e => {
    e.preventDefault();
    if (!nameValidator()){
        e.preventDefault();
        nameInput.parentElement.classList.add('not-valid');
        nameInput.parentElement.classList.remove('valid');
        nameInput.parentElement.lastElementChild.style.display = 'block';
     } else {
        nameInput.parentElement.classList.remove('not-valid');
        nameInput.parentElement.classList.add('valid');
        nameInput.parentElement.lastElementChild.style.display = 'none';
     }


    if (!emailValidator()){
        e.preventDefault();
        emailInput.parentElement.classList.add('not-valid');
        emailInput.parentElement.classList.remove('valid');
        emailInput.parentElement.lastElementChild.style.display = 'block';
    } else {
        emailInput.parentElement.classList.remove('not-valid');
        emailInput.parentElement.classList.add('valid');
        emailInput.parentElement.lastElementChild.style.display = 'none';
    }

    if(!activityValidator()){
      e.preventDefault();
        activityTotalElement.parentElement.classList.add('not-valid');
        activityTotalElement.parentElement.classList.remove('valid');
        activityTotalElement.parentElement.lastElementChild.style.display = 'block';
    } else {
        emailInput.parentElement.classList.remove('not-valid');
        emailInput.parentElement.classList.add('valid');
        emailInput.parentElement.lastElementChild.style.display = 'none';
    }


    if(!creditCardValidator()){
        e.preventDefault();
        card.parentElement.classList.add('not-valid');
        card.parentElement.classList.remove('valid');
        card.parentElement.lastElementChild.style.display = 'block';
    } else {
        card.parentElement.classList.remove('not-valid');
        card.parentElement.classList.add('valid');
        card.parentElement.lastElementChild.style.display = 'none';
    }


    if(!zipValidator()){
        e.preventDefault();
        zip.parentElement.classList.add('not-valid');
        zip.parentElement.classList.remove('valid');
        zip.parentElement.lastElementChild.style.display = 'block';
    } else {
        zip.parentElement.classList.remove('not-valid');
        zip.parentElement.classList.add('valid');
        zip.parentElement.lastElementChild.style.display = 'none';
    }


    if (!cvvValidator()){
        e.preventDefault();
        cvv.parentElement.classList.add('not-valid');
        cvv.parentElement.classList.remove('valid');
        cvv.parentElement.lastElementChild.style.display = 'block';
    } else {
        cvv.parentElement.classList.remove('not-valid');
        cvv.parentElement.classList.add('valid');
        cvv.parentElement.lastElementChild.style.display = 'none';
    }

});