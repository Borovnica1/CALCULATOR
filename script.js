const numbersBtns = document.querySelectorAll('.calculator__number');
const operatorBtns = document.querySelectorAll('.calculator__operator');
const display = document.querySelector('.calculator__display');
const deleteBtn = document.querySelector('.calculator__delete');
const clearBtn = document.querySelector('.calculator__clear');

let firstNumber = 0;
let sign = '';

function add(n, m) {
  return n + m;
}

function subtract(n, m) {
  return n - m;
}

function multiply(n, m) {
  return n * m;
}

function divide(n, m) {
  return n / m;
}

function operator(o, n, m) {
  switch (o) {
    case '+': return add(n, m);
    case '-': return subtract(n, m);
    case 'x': return multiply(n, m);
    case '/': return divide(n, m);
  }
}

function displayNumber() {
  if (display.textContent === '0') display.textContent = '';

  if (this.textContent === '.' && display.textContent.includes('.')) return 1
  display.textContent += this.textContent;
}

function doOperation() {
  if (this.textContent === '=' && sign !== '') {
    firstNumber = operator(sign, firstNumber, Number(display.textContent));
    sign = ''
    display.textContent = firstNumber.toFixed(2);
    return;
  } else if (this.textContent !== '=') {
    firstNumber = Number(display.textContent);
    sign = this.textContent;
    display.textContent = '0'
  }
  
}

function deleteLastDigit() {
  display.textContent = display.textContent.slice(0,-1);
}

function clearAllDigits() {
  display.textContent = '';
  firstNumber = 0;
  sign = '';
}

function keyPressed(e) {
  if (display.textContent === '0') display.textContent = '';
  if (e.keyCode === 8) {
    deleteLastDigit();
  } else if (Number(e.key) || e.key === '0') {
    display.textContent += e.key
  } else if (e.key === '.' && !display.textContent.includes('.')) {
    display.textContent += e.key
  } else if ((e.key === 'Enter' ||  e.key === '=') && sign !== '') {
    firstNumber = operator(sign, firstNumber, Number(display.textContent));
    sign = ''
    display.textContent = firstNumber.toFixed(2);
    return;
  } else if (e.key === '+' || e.key === '-' || 
            e.key === '/' || e.key === '*') {
    firstNumber = Number(display.textContent);
    sign = e.key;
    display.textContent = '0'
  }
}


numbersBtns.forEach(btn => btn.addEventListener('click', displayNumber));
operatorBtns.forEach(operator => operator.addEventListener('click', doOperation));
deleteBtn.addEventListener('click', deleteLastDigit);
clearBtn.addEventListener('click', clearAllDigits);
window.addEventListener('keydown', keyPressed)