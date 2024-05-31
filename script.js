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

let toggler = document.getElementById("toggler");

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

toggler.addEventListener("pointerdown", function () {
  if (toggler.style.bottom == "0px") {
    toggler.style.bottom = "218px";
    for (const child of toggler.children) {
      child.style.transform = "rotate(180deg)";
    }
    document.getElementById("inputwrapper").style.visibility = "visible";
  } else {
    toggler.style.bottom = "0px";
    for (const child of toggler.children) {
      child.style.transform = "rotate(0deg)";
    }
    document.getElementById("inputwrapper").style.visibility = "hidden";
  }
});

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
    updateHistory(moneyUpdateText.innerHTML, sources[i]);

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
  updateHistory(moneyUpdateText.innerHTML, source);
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
}

// checks whether the balance is negative or not
function checkBalance() {
  if (moneyValue < 0) {
    moneyText.style.color = "darkred";
  } else {
    moneyText.style.color = "black";
  }
}

// Function for displaying purchase history
let purchaseHistory = document.getElementById("history");

function updateHistory(lastPurchase, source) {
  console.log(pastPurchases);

  let listElement = document.createElement("li");
  listElement.appendChild(
    document.createTextNode(`${lastPurchase} : ${source}`)
  );
  listElement.setAttribute("id", "listelement");
  purchaseHistory.appendChild(listElement);
}
