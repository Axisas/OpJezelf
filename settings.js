const settingsPopUp = document.getElementById("settingspopup");
const popupBG = document.getElementById("popupbg");

popupBG.addEventListener("pointerdown", togglePopUp);

const settingsButton = document
  .getElementById("settingsbutton")
  .addEventListener("pointerdown", togglePopUp);

const restart = document
  .getElementById("restart")
  .addEventListener("pointerdown", restartApp);

function restartApp() {
  moneyValue = startingMoney;
  moneyText.innerHTML = moneyValue;
  moneyInputField.value = 0;
  checkBalance();
  clearInterval(changeMoney);
  togglePopUp();
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
