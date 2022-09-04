//Setting 'name' text field to be focused on load
const focusName = document.querySelector("input[type='text']");
focusName.focus();

//Selecting Job Role 'Other' will reveal text form
const title = document.querySelector('[name="user-title"]');
const hideOther = document.querySelector('.other-job-role');
hideOther.style.display = 'none';

/*
- - Title Event Listener - -
The user has 6 choices here. If the user selects "other", the function will unhide the input display. 
*/

title.addEventListener('input', (e) => {
        let select = e.target;
        if (select.value !== 'other'){
            hideOther.style.display = 'none';
        } else {
            hideOther.style.display = '';
        }
});

/* T-Shirt Info */
const design = document.querySelector('#design');
const color = document.querySelector('#color');
const colorOption = color.children; 
color.disabled = true; //Disabling the selection until the user selects a design

/* 

-- Design Event Listener -- 
The user has 2 choices here. Once the user selects a style, the color selection is enabled. The user then selects the color based on the design selected.

We loop through the color options and get the attribute value 'data-theme'
If the attribute, 'data-theme' is equal to the target selected value, then the color selection displays
If the attribute, does not match the target selected value, the color is hidden
*/
design.addEventListener('change', (e) => {
    color.disabled = false; 
    for (let i=0;i<colorOption.length;i++){
        let select = e.target.value
        let dataTheme = colorOption[i].getAttribute('data-theme');
        if (colorOption[i].getAttribute('data-theme') === select) {
            colorOption[i].hidden = false;
            select.hidden = true;
            colorOption[i].setAttribute('selected',true);
       } else {
            colorOption[i].hidden = true;
            select.hidden = false;
            colorOption[i].removeAttribute('selected');
       }
    }
})


/* "Register for Activies" Section */
let fieldset = document.querySelector('.activities');
let totalCost = document.getElementById('activities-cost');
let checkbox = document.querySelectorAll('input[type="checkbox"]');


/*
-- Accessibility for activity selection --
Here we loop through the checkboxes and create two event listeners.
The "focus" event listener adds the class "focus" to the parent element, label 
The "blur" event listener removes the class "focus" to the parent element, label
*/
for(let i=0;i<checkbox.length;i++){
    checkbox[i].addEventListener("focus", () => {
        checkbox[i].parentElement.classList.add("focus");
    })
    checkbox[i].addEventListener("blur", () => {
        checkbox[i].parentElement.classList.remove("focus");
    })
}
let finalTotal = 0; //Creating an integer to add or subtract the amount. 

/*
-- Fieldset Event Listener --

This event listener does two tasks. 
1) If the selected activity has a time conflict, then the checkbox is disabled.
2) Update on total price when activities are selected. 

For task 1:
    The attirbute 'data-cost' gives up the amount per activity. That number is a string that needs to be converted to an integer. 
    If that price that activity is selected, then the price gets added to the total. 
    If that price is un-selected, then the price gets subtracted from the toal. 
    That number is then converted back to a string. 
    Finally, located at the bottom of the event listener, we then create function that sets the innerHTML to a template literal with the updated cost. 

For tast 2: 
    We loop through the check box array. We search for the attribute 'data-day-and-time'
    If the 'data-day-and-time' are the same with the attribute selected and the selected value is not equal to the checkbox's HTML element
    If both of the logic is true, then disable the HTML element that has the same 'data-day-and-time'
*/
let activityTotal = 0; //Variable to count how activities selected from user.
fieldset.addEventListener('change', (e) => {
    let clicked = e.target;
    let clickedCost = clicked.getAttribute('data-cost');
    let price = parseInt(clickedCost);
        if (clicked.checked){
            finalTotal += price;
            activityTotal += 1; //adds 1 per selected
        } else {
            finalTotal -= price;
            activityTotal -= 1; //subtracts 1 when deselected
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
creditCard.style.display = ""; //Setting credit card to be selected by default
paypal.style.display = "none";
bitcoin.style.display = "none";



/* 
-- Payment Method Event Listener --

Listening to a change in payment method. 
If the selected value is either 'credit-card', 'paypal' or 'bitcoin', then it will not display the 2 not selected. 
*/
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




/* name validator */
function nameValidator(){
let nameValue = nameInput.value;
const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);
return nameIsValid;
}

/* email validator */
function emailValidator(){
const emailValue= emailInput.value;
const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
return emailIsValid;
}

/* activity validator */
function activityValidator() {
    const activtySectionIsValid = activityTotal > 0;
    return activtySectionIsValid;
}
/* credit card validator */
function creditCardValidator(){
    const creditCardValue = card.value;
    const creditCardIsValid = /^\d{13,16}/.test(creditCardValue);
    return creditCardIsValid;
}
/* zip validator */
function zipValidator(){
    const zipValue = zip.value;
    const zipIsValid = /^\d{5}$/.test(zipValue);
    return zipIsValid;
}

/* cvv validator */
function cvvValidator(){
    const cvvValue=cvv.value;
    const cvvIsValid = /^\d{3,4}/.test(cvvValue);
    return cvvIsValid;
}



/* 
-- Form Event Listener --
    Before the form could submit. The form needs to pass all validators. So we use conditionals here. 
    If a validator is false, then it will prevent the form from submitting. 
*/
form.addEventListener('submit', e => {
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
        activityTotalElement.parentElement.classList.remove('not-valid');
        activityTotalElement.parentElement.classList.add('valid');
        activityTotalElement.parentElement.lastElementChild.style.display = 'none';
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