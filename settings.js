const settingsPopUp = document.getElementById("settingspopup");
const popupBG = document.getElementById("popupbg");

function startApp() {
  moneyValue = startingMoney;
  moneyText.innerHTML = moneyValue;
  moneyInputField.value = 0;
  checkBalance();
  clearInterval(changeMoney);
}

const startInput = document.getElementById("changeStartValue");
const incomeInput = document.getElementById("changeIncome");
incomeInput.value = incomeValues[0];

const chargesInput = document.getElementById("changeCharges");
chargesInput.value = chargesValues[0];

startInput.value = startingMoney;
for (let i = 1; i < incomeValues.length; i++) {
  incomeInput.value += ", " + incomeValues[i];
}

for (let i = 1; i < chargesValues.length; i++) {
  chargesInput.value += ", " + chargesValues[i];
}
document.addEventListener("DOMContentLoaded", startApp);

function changeSettings() {
  if (!moneyHasChanged) {
    startingMoney = startInput.value * 1;
    moneyValue = startingMoney;
    moneyText.innerHTML = moneyValue;
  }

  incomeValues = [];
  chargesValues = [];

  let tempIncomeArray = incomeInput.value.split(", ");
  let tempChargesArray = chargesInput.value.split(", ");

  for (let i = 0; i < tempIncomeArray.length; i++) {
    incomeValues.push(tempIncomeArray[i] * 1);
  }

  for (let i = 0; i < tempChargesArray.length; i++) {
    chargesValues.push(tempChargesArray[i] * 1);
  }

  console.log(incomeValues);
  console.log(chargesValues);
}

function togglePopUp() {
  if (settingsPopUp.style.display == "block") {
    settingsPopUp.style.display = "none";
    popupBG.style.display = "none";
  } else {
    settingsPopUp.style.display = "block";
    popupBG.style.display = "block";
  }
}
