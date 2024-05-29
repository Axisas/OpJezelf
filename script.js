// 1000 is de standaard beginwaarde
let moneyValue = 1000;

// i is used in the Interval as a counter
let i = 0;
let changeMoney;

let moneyText = document.getElementById("money");
let moneyUpdateText = document.getElementById("moneychanged");

let moneyInputField = document.getElementById("changemoney");
let groceries = document.getElementById("groceries");
let income = document.getElementById("income");
let charges = document.getElementById("charges");
let submit = document.getElementById("submit");

function restartApp() {
  moneyValue = 1000;
  moneyText.innerHTML = moneyValue;
  // sets a placeholder value;
  moneyUpdateText.innerHTML = 100;
  moneyInputField.value = 0;
  checkBalance();
  clearInterval(changeMoney);
}

const restart = document
  .getElementById("restart")
  .addEventListener("pointerdown", restartApp);
document.addEventListener("DOMContentLoaded", restartApp);

const inkomstenValues = [600, 240, 120, 660];
// const inkomstenSources = [
//   "Studiefinanciering",
//   "Huurtoeslag",
//   "Zorgtoeslag",
//   "Bijbaan",
// ];

const lastenValues = [-260, -430, -130, -50, -60, -125, -20];
// const lastenSources = [
//   "Schoolgeld",
//   "Huur",
//   "Zorgverzekering",
//   "Wifi",
//   "Vervoer",
//   "Vrije Tijd",
//   "Telefoon",
// ];

// Adds eventlisteners to the buttons

groceries.addEventListener("pointerdown", function () {
  setTimeout(changeMoneyValueOnce, 300, -45);
  disableInteractables();
});

income.addEventListener("pointerdown", function () {
  i = 0;
  changeMoney = setInterval(changeBalance, 1000, inkomstenValues);
  disableInteractables();
});

charges.addEventListener("pointerdown", function () {
  i = 0;
  changeMoney = setInterval(changeBalance, 1000, lastenValues);
  disableInteractables();
});

submit.addEventListener("pointerdown", function () {
  setTimeout(changeMoneyValueOnce, 300, moneyInputField.value);
  disableInteractables();
});

function changeBalance(Values) {
  moneyUpdateText.innerHTML = "";
  if (Values[i]) {
    moneyUpdateText.style.visibility = "visible";
    if (Values[i] > 0) {
      moneyUpdateText.style.color = "green";
      moneyUpdateText.innerHTML = "+";
    } else {
      moneyUpdateText.style.color = "darkred";
    }
    moneyValue += Values[i];
    moneyUpdateText.innerHTML += Values[i];

    setTimeout(() => {
      moneyText.innerHTML = moneyValue;
      moneyUpdateText.style.visibility = "hidden";
    }, 500);

    i++;
  } else {
    clearInterval(changeMoney);
    checkBalance();
  }
}

function updateBalance(value) {}

function changeMoneyValueOnce(value) {
  // converts value into a number type if necessary
  value = value * 1;
  moneyValue += value;
  if (value > 0) {
    moneyText.style.color = "green";
  } else {
    moneyText.style.color = "darkred";
  }
  moneyText.innerHTML = moneyValue;
  setTimeout(checkBalance, 500);
}

// disables the buttons for a while after clicking something,
// this is to prevent breaking everything
function disableInteractables() {
  moneyInputField.disabled = true;
  submit.disabled = true;
  groceries.disabled = true;
  income.disabled = true;
  charges.disabled = true;
}

function enableInteractables() {
  moneyInputField.disabled = false;
  submit.disabled = false;
  groceries.disabled = false;
  income.disabled = false;
  charges.disabled = false;
}

// checks whether the balance is negative or not
function checkBalance() {
  if (moneyValue < 0) {
    moneyText.style.color = "darkred";
  } else {
    moneyText.style.color = "black";
  }
  enableInteractables();
}
