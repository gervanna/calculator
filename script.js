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
    if (num1 === 0) {
        return 'No division by zero';
    } else {
        return num1 / num2}
};

function operate(operater, num1, num2) {
    switch(operater) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2)
    };
};

console.log(operate('+', 5, 5));
console.log(operate('*', 5, 5));
console.log(operate('/', 25, 5));
console.log(operate('/', 0, 5));
console.log(operate('-', 15, 5));