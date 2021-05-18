let currentScreenText = document.querySelector(".current-screen");
let previousScreenText = document.querySelector(".previous-screen");
const numberBtns = document.querySelectorAll("[data-num]");
const operationBtns = document.querySelectorAll("[data-operation]");
const clearBtn = document.querySelector("[data-clear]");
const deleteBtn = document.querySelector("[data-delete]");
const equalBtn = document.querySelector('[data-equals');
let currentScreen = '';
let previousScreen = '';
let operation = undefined;


// selecting all the number buttons-1
numberBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    appendNumber(btn.innerText);
    updateDisplay();
  });
});
// selecting all the operation buttons-2
operationBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    chooseOperation(btn.innerText);
    updateDisplay();
  });
});
// selecting the equal button -3
equalBtn.addEventListener('click',()=>{
    compute();
    updateDisplay();
});
// selecting the clear button-4 
clearBtn.addEventListener('click', ()=>{
    clear();
    updateDisplay();
});
// selecting the delete button-5
deleteBtn.addEventListener('click', ()=>{
  
    deleteNum();
    updateDisplay();
})
// functions for different button elements
function appendNumber(number) {
  if (number === "." && currentScreen.includes(".")){
      return;
  }
  currentScreen = currentScreen.toString() + number.toString();
}

function getDisplayNumber(number) {
  const stringNumber = number.toString();
  const integerDigits = parseFloat(stringNumber.split(".")[0]);
  const decimalDigits = stringNumber.split('.')[1];
  let integerDisplay;
  if(isNaN(integerDigits)) {
      integerDisplay = '';
  } else {
      integerDisplay = integerDigits.toLocaleString('en',{maximumFractionDigits: 0});
  }
  if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
  } else {
      return integerDisplay;
  }
}

function updateDisplay() {
  currentScreenText.innerText = getDisplayNumber(currentScreen);
  if(operation != null) {
      previousScreenText.innerText = `${getDisplayNumber(previousScreen)} ${operation}`;
  } else {
      previousScreenText.innerText = '';
  }
}

function chooseOperation(operand) {
  if (this.currentScreen === "") return;
  if (this.previousScreen !== "") {
    compute();
  }
  operation = operand;
  previousScreen = currentScreen;
  currentScreen = "";
}

function compute() {
  let computation;
  const prev = parseFloat(previousScreen);
  const current = parseFloat(currentScreen);
  if ( isNaN(prev) || isNaN(current)) return;
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "X":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
      break;
    case "%":
      computation = prev % current;
      break;
    default:
      return;
  }
  currentScreen = computation;
  operation = undefined;
  previousScreen = '';
}
function clear() {
    previousScreen = '';
    currentScreen = '';
    operation = undefined;
}
function deleteNum() {
    currentScreen = currentScreen.toString().slice(0,-1);
}