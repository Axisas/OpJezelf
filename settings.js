const settingsPopUp = document.getElementById("settingspopup");
const popupBG = document.getElementById("popupbg");

function restartApp() {
  moneyValue = startingMoney;
  moneyText.innerHTML = moneyValue;
  moneyInputField.value = 0;
  checkBalance();
  clearInterval(changeMoney);
}

document.addEventListener("DOMContentLoaded", restartApp);

function changeSettings() {
  // do stuff
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
