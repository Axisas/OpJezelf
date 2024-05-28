// 1000 is de standaard beginwaarde
let moneyValue = 1000;

// i is used in the Interval as a counter
let i = 0;
let changeMoney;
let groceries;
let income;
let charges;

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

// restart is not part of the function since this one will always be available
const restart = document
  .getElementById("restart")
  .addEventListener("click", function () {
    moneyValue = 1000;
    moneyText.innerHTML = moneyValue;
    checkBalance();
  });

// adds the eventlisteners, since these will be disabled at certain times
function addEventListeners() {
  groceries = document
    .getElementById("groceries")
    .addEventListener("click", function () {
      setTimeout(boodschappen, 300);
    });

  income = document
    .getElementById("income")
    .addEventListener("click", function () {
      i = 0;
      changeMoney = setInterval(changeBalance, 1000, inkomstenValues);
    });

  charges = document
    .getElementById("charges")
    .addEventListener("click", function () {
      i = 0;
      changeMoney = setInterval(changeBalance, 1000, lastenValues);
    });
}

addEventListeners();

// checks whether the balance is negative or not
function checkBalance() {
  if (moneyValue < 0) {
    moneyText.style.color = "red";
  } else {
    moneyText.style.color = "black";
  }
}

function changeBalance(Values) {
  if (Values[i]) {
    if (Values[i] > 0) {
      moneyText.style.color = "green";
    } else {
      moneyText.style.color = "red";
    }
    moneyValue += Values[i];
    moneyText.innerHTML = moneyValue;
    i++;
  } else {
    clearInterval(changeMoney);
    checkBalance();
  }
}

function boodschappen() {
  moneyValue -= 45;
  moneyText.style.color = "red";
  moneyText.innerHTML = moneyValue;
  setTimeout(checkBalance, 500);
}
