const terminal = document.querySelector('.upper-ter')
const terLog = document.querySelector('.lower-ter')

//Basic math operations
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

//Do the corresponding math operation depending on the operator given
function operate(operator, num1, num2) {
    console.log(num1, num2)
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '/':
            return divide(num1, num2);
        case 'x':
            return multiply(num1, num2);
        default:
            return false
            break;
    }
}

//light / dark theme activation
const themeButton = document.querySelector('.theme-toggle')
themeButton.addEventListener('click', () => {
    document.documentElement.classList.toggle('toggle')
})


const buttons = document.querySelectorAll('.button')
buttons.forEach(button => {
    button.addEventListener('click', identify)
})



let accNumber;
let currentNumber = '';
let currentOperator;
let once = false;

setInterval(format,100)

function format() {
    let s = terminal.textContent.replace(/(\d{3})/g, '$1 ').replace(/(^\s+|\s+$)/,'')
    terminal.textContent = s
}

function identify(e) {
    let input;
    if(e.target){
        input = e.target.textContent
    }
    else{
        input = e;
    }

    if(input == 'C'){
        currentNumber = '';
        terminal.textContent = currentNumber
    }
    else if(input == 'CE'){
        clear()
    }
    else if(input == 'DEL'){
        currentNumber = currentNumber.slice(0,currentNumber.length-1)
        terminal.textContent = currentNumber
    }
    else if(input == '+/-'){
        if(accNumber){
            accNumber = -accNumber
            terminal.textContent = accNumber
            return
        }
        currentNumber = -currentNumber
        terminal.textContent = currentNumber
    }
    else if(input == '.'){
        decimal()
        terminal.textContent = currentNumber
    }
    else if (isNaN(input)) {
        registerOperator(input)
    }
    else{
        registerNumber(input)
    }
}
function registerKey(e){
    if(!isNaN(e.key)){
        identify(e.key)
    }
    switch(e.key){
        case '+':
        case '-':
        case '=':
        case '/':
        case 'x':
            identify(e.key)
            break;
        case 'c':
        case 'C':
            identify('CE')
            break;
        case 'Enter':
            identify('=')
        case '.':
            identify(e.key)
            break;
        case 'Backspace':
            identify('DEL')
        default:
            return
    }
}

function registerNumber(num) {
    currentNumber += num;
    terminal.textContent = currentNumber;
}


function registerOperator(operator) {
    if (operator == '=') {
        if(!operate(currentOperator, +accNumber, +currentNumber)){
            displayError()
            return
        }
        accNumber = operate(currentOperator, +accNumber, +currentNumber);
        once = true;
        currentOperator = ''
        terminal.textContent = accNumber
        terLog.textContent = '';
    }
    else if (currentOperator) {
        terLog.textContent += ` ${currentNumber} ${operator}`
        accNumber = operate(currentOperator, +accNumber, +currentNumber)

        terminal.textContent = '';
        currentNumber = '';
        currentOperator = operator;
    }
    else {
        if (once) {
            terLog.textContent += ` ${accNumber} ${operator}`
        }
        else {
            terLog.textContent += ` ${currentNumber} ${operator}`
            accNumber = currentNumber;
        }


        terminal.textContent = ''
        currentNumber = ''
        currentOperator = operator;
    }
    console.log(accNumber)
}
function displayError() {
    let errorMessage = document.querySelector(".error")
    errorMessage.addEventListener('transitionend', () => {
        errorMessage.classList.remove('show')
    })
    errorMessage.classList.add('show')
    clear()

}
function clear(){
    terLog.textContent = ''
    terminal.textContent = ''
   accNumber = null;
   currentNumber = '';
   currentOperator = '';
   once = false;
}
function decimal(){
    let arr = currentNumber.split('')
    if(arr.includes('.'))return 
    else if(!currentNumber){
        arr.push('0')
        arr.push('.')
    }
    else{
        arr.push('.')
    }
    currentNumber = arr.join('')
}
const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--mobileHeight', `${vh}px`)

window.addEventListener('keydown', registerKey)