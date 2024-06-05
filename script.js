// 1000 is de standaard beginwaarde
let moneyValue;

let moneyHasChanged = false;
// i is used in the Interval as a counter
let i = 0;
let o = 0;
let changeMoney;
let startingMoney = 1100;
let pastPurchases = ["1100 : Spaargeld"];

let moneyText = document.getElementById("money");
let moneyUpdateText = document.getElementById("moneychanged");

let inputField = document.getElementById("inputfield");
let submitInput = document.getElementById("submit");

// EventListener for the restart button, enable if that button is enabled

let incomeValues = [600, 240, 120, 660];
const incomeSources = [
  "Studiefinanciering",
  "Huurtoeslag",
  "Zorgtoeslag",
  "Bijbaan",
];

let chargesValues = [-260, -430, -130, -50, -60, -125, -20];
const chargesSources = [
  "Schoolgeld",
  "Huur",
  "Zorgverzekering",
  "Wifi",
  "Vervoer",
  "Vrije Tijd",
  "Telefoon",
];

const actionsInMonth = [
  "income",
  "groceries",
  "buy",
  "event",
  "groceries",
  "buy",
  "event",
  "groceries",
  "buy",
  "event",
  "groceries",
  "buy",
  "event",
  "charges",
];

function changeBalance(values, sources) {
  moneyHasChanged = true;
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
    buttonEnable(this);
    clearInterval(changeMoney);
  }
}

function changeMoneyValueOnce(value, source) {
  moneyHasChanged = true;
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
    clearInterval(changeMoney);
    buttonEnable(this);

    moneyUpdateText.style.visibility = "hidden";
  }, 500);

  pastPurchases.push(`${moneyUpdateText.innerHTML},- : ${source}`);
  updateHistory(moneyUpdateText.innerHTML, source);
}

// NEED TO FIX BELOW: //

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
  let listElement = document.createElement("li");
  listElement.appendChild(
    document.createTextNode(`${lastPurchase} : ${source}`)
  );
  if (lastPurchase > 0) {
    listElement.style.color = "green";
  }
  if (lastPurchase < 0) {
    listElement.style.color = "darkred";
  }
  listElement.setAttribute("id", "listelement");
  purchaseHistory.insertBefore(listElement, purchaseHistory.firstChild);
}

function nextStep() {
  inputField.style.visibility = "hidden";
  submitInput.style.visibility = "hidden";
  console.log(actionsInMonth[o]);
  if (actionsInMonth[o] == "income") {
    i = 0;
    changeMoney = setInterval(changeBalance, 1000, incomeValues, incomeSources);
  }
  if (actionsInMonth[o] == "buy") {
    buttonEnable();
    setTimeout(function () {
      inputField.style.visibility = "visible";
      submitInput.style.visibility = "visible";
    }, 200);
  }
  if (actionsInMonth[o] == "groceries") {
    setTimeout(changeMoneyValueOnce, 300, -45, "Boodschappen");
  }
  if (actionsInMonth[o] == "event") {
    buttonEnable();

    setTimeout(function () {
      inputField.style.visibility = "visible";
      submitInput.style.visibility = "visible";
    }, 200);
  }
  if (actionsInMonth[o] == "charges") {
    i = 0;
    changeMoney = setInterval(
      changeBalance,
      1000,
      chargesValues,
      chargesSources
    );
  }
  o++;
  if (o > 13) {
    o = 0;
    console.log("next month");
  }
}

function buttonDisable() {
  document.querySelector(`#inputfield`).style.pointerEvents = "none";
  document.querySelector(`#submit`).style.pointerEvents = "none";
  document.querySelector(`#nextstep`).style.pointerEvents = "none";
}

function buttonEnable() {
  document.querySelector(`#inputfield`).style.pointerEvents = "auto";
  document.querySelector(`#submit`).style.pointerEvents = "auto";
  document.querySelector(`#nextstep`).style.pointerEvents = "auto";
}

function submitValue() {
  let inputValue = document.querySelector(`#inputfield`).value;
  if (actionsInMonth[o] == "buy") {
    changeMoneyValueOnce(inputValue, "Aankopen");
  }
  if (actionsInMonth[o] == "event") {
    changeMoneyValueOnce(inputValue, "Event");
  }
}
