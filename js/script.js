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
//Disabling the "Color" <select element>
const color = document.querySelector('div[id="shirt-colors"]');
color.style.display = 'none'

//Listening for user changes for shirt-design
const design = document.querySelector('#design');
const colorSelection = document.querySelector('#color');
function designListener(e){
    let select = e.target;{
        if(select.value == "js puns"){
            color.style.display = 'block';
            colorSelection[1].style.display = 'block';
            colorSelection[2].style.display = 'block';
            colorSelection[3].style.display = 'block';
            colorSelection[4].style.display = 'none';
            colorSelection[5].style.display = 'none';
            colorSelection[6].style.display = 'none';
        } else if (select.value == "heart js" ) {
            color.style.display = 'block';
            colorSelection[1].style.display = 'none';
            colorSelection[2].style.display = 'none';
            colorSelection[3].style.display = 'none';
            colorSelection[4].style.display = 'block';
            colorSelection[5].style.display = 'block';
            colorSelection[6].style.display = 'block';
        }
    }
}
design.addEventListener('input',designListener);

/* "Register for Activies" Section */

let fieldset = document.querySelector('.activities');
let totalCost = document.getElementById('activities-cost');
let checkbox = document.querySelectorAll('input[type="checkbox"]');
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

const submit = document.querySelector('form');
const usernameInput = document.getElementById('name');
const emailInput = document.getElementById('email');


/* Validators */
function isValidUserName(username){
    return /^\w+$/.test(username)
}

/* Formatting function */

/* Setup events */
function showOrHideTip (show,element) {
    if(show){
        element.style.display = "inherit";
    } else {
        element.style.display = "none";
    }
}

function createListener(validator){
    return e => {
        const text = e.target.value;
        const valid = validator(text);
        const showtip = text !== "" && !valid;
        const tooltip = e.target.nextElementSibling;
        showOrHideTip(showtip ,tooltip);
    };
}
usernameInput.addEventListener("input", createListener(isValidUserName));


/* Email Validation */ 