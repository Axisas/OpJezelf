// 1000 is de standaard beginwaarde
let moneyValue = 1000;

// i is used in the Interval as a counter
let i = 0;
let changeMoney;

let moneyText = document.getElementById("money");

moneyText.innerHTML = moneyValue;

const inkomstenValues = [600, 240, 120, 660];
const inkomstenSources = [
  "Studiefinanciering",
  "Huurtoeslag",
  "Zorgtoeslag",
  "Bijbaan",
];

const lastenValues = [-260, -430, -130, -50, -60, -125, -20];
const lastenSources = [
  "Schoolgeld",
  "Huur",
  "Zorgverzekering",
  "Wifi",
  "Vervoer",
  "Vrije Tijd",
  "Telefoon",
];

const moneyInputField = document.getElementById("changemoney");
// ensures the input field is empty on refresh
moneyInputField.value = 0;

// Adds eventlisteners to the buttons
const restart = document
  .getElementById("restart")
  .addEventListener("pointerdown", function () {
    moneyValue = 1000;
    moneyText.innerHTML = moneyValue;
    moneyInputField.value = 0;
    checkBalance();
    clearInterval(changeMoney);
  });

const groceries = document.getElementById("groceries");

groceries.addEventListener("pointerdown", function () {
  setTimeout(changeMoneyValueOnce, 300, -45);
  disableInteractables();
});

const income = document.getElementById("income");

income.addEventListener("pointerdown", function () {
  i = 0;
  changeMoney = setInterval(changeBalance, 1000, inkomstenValues);
  disableInteractables();
});

const charges = document.getElementById("charges");

charges.addEventListener("pointerdown", function () {
  i = 0;
  changeMoney = setInterval(changeBalance, 1000, lastenValues);
  disableInteractables();
});

const submit = document.getElementById("submit");

submit.addEventListener("pointerdown", function () {
  setTimeout(changeMoneyValueOnce, 300, moneyInputField.value);
  disableInteractables();
});

// checks whether the balance is negative or not
function checkBalance() {
  if (moneyValue < 0) {
    moneyText.style.color = "darkred";
  } else {
    moneyText.style.color = "black";
  }
  enableInteractables();
}

function changeBalance(Values) {
  if (Values[i]) {
    if (Values[i] > 0) {
      moneyText.style.color = "green";
    } else {
      moneyText.style.color = "darkred";
    }
    moneyValue += Values[i];
    moneyText.innerHTML = moneyValue;
    i++;
  } else {
    clearInterval(changeMoney);
    checkBalance();
  }
}

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
