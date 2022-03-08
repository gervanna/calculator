let firstValue;
let secondValue;
let operatorUsed;

const calcDisplay = document.getElementById('calcDisplay');
const numberBtns = document.querySelectorAll('[data-number]');
const divideBtn = document.getElementById('divideBtn');
const multiplyBtn = document.getElementById('multiplyBtn');
const subtractBtn = document.getElementById('subtractBtn');
const addBtn = document.getElementById('addBtn');
const decimalBtn = document.getElementById('decimalBtn');
const equalBtn = document.getElementById('equalBtn');
const clearBtn = document.getElementById('clearBtn');
const deleteBtn = document.getElementById('deleteBtn');

numberBtns.forEach(button => 
    button.addEventListener('click', () => displayNumber(button.textContent)));

function displayNumber(btnValue) {
    if (firstValue === undefined) {
        firstValue = btnValue;
        calcDisplay.value = firstValue;
        
    } else if (operatorUsed === undefined) {
        firstValue += btnValue
        calcDisplay.value = firstValue;
    } else if (secondValue === undefined) {
        secondValue = btnValue
        calcDisplay.value = secondValue;
    } else {
        secondValue += btnValue
        calcDisplay.value = secondValue;
    }    
};

function add(num1, num2) {
    return num1 + num2
};

function subtract(num1, num2) {
    return num1 - num2
};

function multiply(num1, num2) {
    return num1 * num2
};

function divide(num1, num2) {
    return num1 / num2
};

function operate(operator, num1, num2) {
    num1 = Number(num1)
    num2 = Number(num2)
    switch(operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/': 
            if (num2 === 0) {
                return 'Really?';
            } else {
                return divide(num1, num2)}
    };
};

divideBtn.addEventListener('click', () => handleButtonValue('/'));
multiplyBtn.addEventListener('click', () => handleButtonValue('*'));
subtractBtn.addEventListener('click', () => handleButtonValue('-'));
addBtn.addEventListener('click', () => handleButtonValue('+'));
decimalBtn.addEventListener('click', addDecimal);
equalBtn.addEventListener('click', showResults);

function handleButtonValue(operatorValue) {
    if (secondValue === undefined) {
       operatorUsed = operatorValue;
    }  else {
        const result = operate(operatorUsed, firstValue, secondValue)
        calcDisplay.value = result
        firstValue = result
        operatorUsed = operatorValue
        secondValue = undefined
    }
};

function showResults() {
    if (secondValue === undefined) {
        return
    }
    const result = operate(operatorUsed, firstValue, secondValue)
    let roundResults;
    if (typeof result === 'number') {
        roundResults = Math.round(result * 1000) / 1000;
        firstValue = roundResults
    } else {
        roundResults = result
        firstValue = undefined
    }
    calcDisplay.value = roundResults
    
    operatorUsed = undefined
    secondValue = undefined
};

function addDecimal() {
    if (!firstValue) {
        firstValue = "0."
        calcDisplay.value = firstValue
    } else if (firstValue && !operatorUsed && !firstValue.includes(".")) {
        firstValue += "."
        calcDisplay.value = firstValue
    } else if (!secondValue && operatorUsed) {
        secondValue = "0."
        calcDisplay.value = secondValue
    } else if (!secondValue.includes(".") && operatorUsed) {
        secondValue += "."
        calcDisplay.value = secondValue
    }
};

function deleteNumber() {
    if (secondValue !== undefined) {
        secondValue = secondValue.toString().slice(0, -1)
        calcDisplay.value = secondValue
    } else if (firstValue !== undefined) {
        firstValue = firstValue.toString().slice(0, -1)
        calcDisplay.value = firstValue;
    }
};
deleteBtn.addEventListener('click', deleteNumber);

function clear() {
    calcDisplay.value = '0';
    firstValue = undefined;
    secondValue = undefined;
    operatorUsed = undefined;
};
clearBtn.addEventListener('click', clear);

document.addEventListener('keydown', (event) => {
    if (!isNaN(event.key)) {
        displayNumber(event.key)
    } else if (event.key === '.'){
        addDecimal()
    } else if (['*', '/', "+", "-"].includes(event.key)) {
        handleButtonValue(event.key)
    } else if (event.key === 'Enter') {
        showResults()
    } else if (event.key === 'Delete' || event.key === 'Backspace') {
        deleteNumber()
    } else if (event.key === 'Escape') {
        clear()
    }
})