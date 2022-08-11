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

/*

    T-Shirt Info
*/
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

let fieldset = document.querySelector('#activities-box');
let totalCost = document.getElementById('activities-cost');
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
})

console.log(totalCost.innerHTML);

// regex the totalCost.innerHTML and input the total amount 