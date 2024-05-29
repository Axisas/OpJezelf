// 1000 is de standaard beginwaarde
let moneyValue;

// i is used in the Interval as a counter
let i = 0;
let changeMoney;

let pastPurchases = [];

let moneyText = document.getElementById("money");
let moneyUpdateText = document.getElementById("moneychanged");

let moneyInputField = document.getElementById("changemoney");
let groceries = document.getElementById("groceries");
let income = document.getElementById("income");
let charges = document.getElementById("charges");
let submit = document.getElementById("submit");

function restartApp() {
  moneyValue = 1100;
  moneyText.innerHTML = moneyValue;
  // sets a placeholder value;
  moneyUpdateText.innerHTML = 100;
  moneyInputField.value = 0;
  checkBalance();
  clearInterval(changeMoney);
}

restartApp();
// EventListener for the restart button, enable if that button is enabled
// const restart = document
//   .getElementById("restart")
//   .addEventListener("pointerdown", restartApp);
// document.addEventListener("DOMContentLoaded", restartApp);

const incomeValues = [600, 240, 120, 660];
const incomeSources = [
  "Studiefinanciering",
  "Huurtoeslag",
  "Zorgtoeslag",
  "Bijbaan",
];

const chargesValues = [-260, -430, -130, -50, -60, -125, -20];
const chargesSources = [
  "Schoolgeld",
  "Huur",
  "Zorgverzekering",
  "Wifi",
  "Vervoer",
  "Vrije Tijd",
  "Telefoon",
];

// Adds eventlisteners to the buttons
groceries.addEventListener("pointerdown", function () {
  setTimeout(changeMoneyValueOnce, 300, -45, "Groceries");
  disableButtons();
});

income.addEventListener("pointerdown", function () {
  i = 0;
  changeMoney = setInterval(changeBalance, 1000, incomeValues, incomeSources);
  disableButtons();
});

charges.addEventListener("pointerdown", function () {
  i = 0;
  changeMoney = setInterval(changeBalance, 1000, chargesValues, chargesSources);
  disableButtons();
});

submit.addEventListener("pointerdown", function () {
  setTimeout(changeMoneyValueOnce, 300, moneyInputField.value, "Other");
  disableButtons();
});

function changeBalance(values, sources) {
  if (values[i]) {
    moneyUpdateText.style.visibility = "visible";
    if (values[i] > 0) {
      moneyUpdateText.style.color = "green";
      moneyUpdateText.innerHTML = "+";
    } else {
      moneyUpdateText.style.color = "darkred";
      moneyUpdateText.innerHTML = "";
    }
    moneyValue += values[i];
    moneyUpdateText.innerHTML += values[i];

    pastPurchases.push(`${moneyUpdateText.innerHTML},- : ${sources[i]}`);

    setTimeout(() => {
      moneyText.innerHTML = moneyValue;

      checkBalance();

      moneyUpdateText.style.visibility = "hidden";
    }, 500);

    i++;
  } else {
    checkBalance();
    clearInterval(changeMoney);
    enableButtons();
  }
}

function changeMoneyValueOnce(value, source) {
  // converts value into a number type if necessary
  value = value * 1;
  moneyUpdateText.style.visibility = "visible";
  if (value > 0) {
    moneyUpdateText.style.color = "green";
    moneyUpdateText.innerHTML = "+";
  } else {
    moneyUpdateText.style.color = "darkred";
    moneyUpdateText.innerHTML = "";
  }
  moneyUpdateText.innerHTML = value;

  moneyValue += value;

  setTimeout(() => {
    moneyText.innerHTML = moneyValue;

    checkBalance();
    enableButtons();
    clearInterval(changeMoney);

    moneyUpdateText.style.visibility = "hidden";
  }, 500);

  pastPurchases.push(`${moneyUpdateText.innerHTML},- : ${source}`);
}

// NEED TO FIX BELOW: //

function disableButtons() {
  moneyInputField.style.pointerEvents = "none";
  submit.style.pointerEvents = "none";
  groceries.style.pointerEvents = "none";
  income.style.pointerEvents = "none";
  charges.style.pointerEvents = "none";
}

function enableButtons() {
  moneyInputField.style.pointerEvents = "auto";
  submit.style.pointerEvents = "auto";
  groceries.style.pointerEvents = "auto";
  income.style.pointerEvents = "auto";
  charges.style.pointerEvents = "auto";

  // Logs past purchases, is run in this function
  // since this one runs at the end of all the balance changes
  console.log(pastPurchases);
}

// checks whether the balance is negative or not
function checkBalance() {
  if (moneyValue < 0) {
    moneyText.style.color = "darkred";
  } else {
    moneyText.style.color = "black";
  }
}
