//global variables

let operator = '';
let previousValue = '';
let currentValue = '';

let currentDisplay = "0"; 

document.addEventListener("DOMContentLoaded", function(){
  //store all components of html in our js
let clear = document.querySelector('#clear');
let del = document.querySelector('#del');
let equals = document.querySelector('.equals');
let dec = document.querySelector('.dec');
let numbers = document.querySelectorAll('.number');
let operators = document.querySelectorAll('.operator');

let previousScreen = document.querySelector('.previous');
let currentScreen = document.querySelector('.current');

//add event listeners

numbers.forEach((number) => number.addEventListener('click', function(e){
  handleNum(e.target.textContent)
  currentScreen.textContent = currentValue;

}))

operators.forEach((op) => op.addEventListener('click', function(e){
  handleOperator(e.target.textContent)
  previousScreen.textContent = previousValue + " " + operator;
  currentScreen.textContent = currentValue;
  
}))

clear.addEventListener('click', function(){
  previousValue = '';
  currentValue = '';
  operator = '';
  previousScreen.textContent = currentValue;
  currentScreen.textContent = currentValue;

})

equals.addEventListener('click', function(){
  if(currentValue != '' && previousValue != ''){
  calculate()
  previousScreen.textContent = '';
  if (previousValue.length <= 5){
  currentScreen.textContent = previousValue;
} else {
  currentScreen.textContent = previousValue.slice(0,5) + "...";
}
  }
})

dec.addEventListener('click', function(){
  addDecimal()
})



//del/back button -- requires fixing
del.addEventListener('click', function(){
  currentValue = '';
  
  currentScreen.textContent = currentScreen.textContent.slice(0, -1);
  
  
  if (currentScreen === "") {
    currentValue = Number(currentValue);
    currentScreen = "0";

    previousScreen.textContent = currentValue;
    currentScreen.textContent = currentValue;
    }
 
})

})

function handleNum(num){
  if(currentValue.length <= 5){
  currentValue += num;
}}

// function handleOperator(op) {
//   operator = op;
//   previousValue = currentValue;
//   currentValue = '';
// }

function handleOperator(op){
  previousOperator = operator;
  operator = op;
  if(previousValue != ""  &&  currentValue != ""){
      calculate(previousOperator);
  };
      previousValue = currentValue;
      currentValue = "";
}

function calculate(){
  previousValue = Number(previousValue);
  currentValue = Number(currentValue);

  if (operator === "+"){
    previousValue += currentValue;
  }
  else if (operator === "-"){
    previousValue -= currentValue;
  }
  else if (operator === "*"){
    previousValue *= currentValue;
  }
  else {
    previousValue /= currentValue;
  }
previousValue = roundNum(previousValue);
previousValue = previousValue.toString();
currentValue = previousValue.toString();
}

function roundNum(num){
  return Math.round(num*1000) / 1000;
}

function addDecimal(){
  if(!currentValue.includes(".")){
    currentValue += '.';
  }
}