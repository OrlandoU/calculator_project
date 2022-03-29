
let lastNum;
let currentOperator = null;
let currentNum = '';



const terminal = document.querySelector('.terminal')
const numButton = document.querySelectorAll('.button');
const operatorButton = document.querySelectorAll('.button-alt')


numButton.forEach(node=>node.addEventListener('click',registerInput))
operatorButton.forEach(node=>node.addEventListener('click',registerOperator))


//Basic math operations
function add(num1,num2){  
    return num1 + num2;
}

function subtract(num1,num2){
    return num1 - num2;
}

function multiply(num1,num2){
    return num1 * num2;
}

function divide(num1,num2){
    return num1 / num2;
}

//Do the corresponding math operation depending on the operator given
function operate(operator,num1,num2){
    console.log(operator,num1,num2)
    switch(operator){
        case '+':
            return add(num1,num2);
            break;
        case '-':
            return subtract(num1,num2);
        case '/':
            return divide(num1,num2);
        case 'x':
            return multiply(num1,num2); 
    }
}
function clear(){
    currentOperator ='';
    lastNum ='';
    currentNum ='';
    terminal.textContent = '';
}

function registerInput(e){
    let currentInput = this.textContent;
    terminal.textContent += currentInput;

    currentNum += currentInput;
    if (currentInput == 'c'){
        clear()
    }
}


function registerOperator(){
    let currentInput = this.textContent;
    
    if(currentInput == '='){
        lastNum = operate(currentOperator,lastNum,+currentNum);
        currentNum = ''
        currentOperator = ''
        terminal.textContent = lastNum.toString().includes('.')?lastNum.toFixed(2):lastNum;
        console.log(lastNum)
    }
    else if (currentOperator){ 
        terminal.textContent += ` ${currentInput} `;  
        lastNum = operate(currentOperator,lastNum,+currentNum);
        currentOperator = currentInput;
        currentNum = '';
    }
    else if (lastNum){
        terminal.textContent += ` ${currentInput} `;  
        currentOperator = currentInput;
        currentNum = '';
    }
    else {
        terminal.textContent += ` ${currentInput} `;  
        currentOperator = currentInput;
        lastNum = +currentNum;
        currentNum = '';
    }
}
function registerKeyInput(e){
    let currentInput = e.key ;

    if (currentInput == '-' || currentInput == '+' || currentInput == '/' || currentInput == 'x' || currentInput == '='){
        registerKeyOperator(currentInput)
    }
    else if (+currentInput){
        terminal.textContent += currentInput
        currentNum += currentInput;
    }
    else {
        return
    }
}

function registerKeyOperator(key){
    let currentInput = key;
    
    if(currentInput == '='){
        lastNum = operate(currentOperator,lastNum,+currentNum);
        currentNum = ''
        currentOperator = ''
        terminal.textContent = lastNum.toString().includes('.')?lastNum.toFixed(2):lastNum;
        console.log(lastNum)
    }
    else if (currentOperator){ 
        terminal.textContent += ` ${currentInput} `;  
        lastNum = operate(currentOperator,lastNum,+currentNum);
        currentOperator = currentInput;
        currentNum = '';
    }
    else if (lastNum){
        terminal.textContent += ` ${currentInput} `;  
        currentOperator = currentInput;
        currentNum = '';
    }
    else {
        terminal.textContent += ` ${currentInput} `;  
        currentOperator = currentInput;
        lastNum = +currentNum;
        currentNum = '';
    }
}
window.addEventListener('keypress', registerKeyInput)
