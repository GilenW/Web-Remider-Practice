// need to fix shift select option. Can not define checkboxes


const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.items');
let items = [];
function addItem(e){
    e.preventDefault();
    const text = (this.querySelector('[name=item]')).value;
    console.log(text);
    const item = {
        text,
        done:false
    }
    items.push(item);
    populateList(items,itemsList);
    this.reset();
}

function populateList(items = [], itemsList){
    itemsList.innerHTML = items.map((item,i)=>{
        return `
            <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${item.done ? 'checked' : ''}/>
                <label for="item${i}">${item.text}</label>
            </li>
        `
    }).join('');
}

addItems.addEventListener('submit', addItem);




const checkboxes = itemsList.querySelectorAll('input[type=checkbox]');
const inputs = itemsList.querySelectorAll('label');

let lastChecked;
let inbetween;
function handleChange(e){
    const checkboxes = itemsList.querySelectorAll('[type=checkbox]');
    if(e.shiftKey && this.checked){
        checkboxes.forEach(element => {

            if(element === this || element === lastChecked){
                inbetween = !inbetween;
                console.log('these are inbetween items');
            }
            if(inbetween){
                element.checked = true;
            }
            console.log(element);
        });
    }
    lastChecked = this;
}

checkboxes.forEach(element => {
    element.addEventListener('click', handleChange);
});

//buttons function

const completeButton = document.querySelector('#completeAll');
const cleanButton = document.querySelector('#clean');
completeButton.addEventListener('click',()=>{
    const checkboxes = itemsList.querySelectorAll('[type=checkbox]');
    console.log(checkboxes);
    checkboxes.forEach(item => {
        item.checked = true;
    })
});

cleanButton.addEventListener('click',()=>{
    const checkboxes = itemsList.querySelectorAll('[type=checkbox]');
    const inputs = itemsList.querySelectorAll('label');
    
    checkboxes.forEach(item => {
        item.checked = false;
    })
    inputs.forEach(item =>{
        item.textContent = '';
    })
    itemsList.innerHTML = '';
    items = [];
})