let notif_txt = document.getElementById("notification");
let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let btn3 = document.getElementById("btn3");
let minerals = 0;
let minerals_text = document.getElementById("minerals-text");
let money = 0;
let money_text = document.getElementById("money-text");
const pickaxe_levels = ["wood", "stone", "iron", "gold", "diamond"];
let pickLvl = 0;
let pickaxe = pickaxe_levels[pickLvl];
let multiplier = 1;

function setBtnText(button, text) {
  button.innerText = text;
}

function mine(pick) {
  let amount;

  switch(pick) {
    case "wood":
      amount = 1;
      multiplier = 1;
      break;
    case "stone":
      amount = 5;
      multiplier = 1.5;
      break;
    case "iron":
      amount = 10;
      multiplier = 2;
      break;
    case "gold":
      amount = 20;
      multiplier = 2.5;
      break;
    case "diamond":
      amount = 35;
      multiplier = 3;
      break;
    default:
      break;
  }

  minerals += amount;
  minerals_text.innerHTML = minerals;
  console.log(minerals);
}

function goMining(){
  setBtnText(btn1, "To Town");
  btn1.onclick = function() { toTown() };
  setBtnText(btn2, "Mine");
  btn2.onclick = function() { mine(pickaxe) };
  btn3.style.display = "none";
  document.title = "Mine"
}

function goShopping() {
  setBtnText(btn1, "buy");
  setBtnText(btn2, "sell");
  setBtnText(btn3, "Leave");
  btn3.onclick = function() { toTown() };
  btn2.onclick = function() { sell() };
  btn1.onclick = function() { openBuyMenu() };
  document.title = "Shop"
}

function sell() {
  money += minerals * multiplier;
  console.log(money);
  minerals = 0;
  minerals_text.innerHTML = minerals;
  money_text.innerHTML = money;
}

function openBuyMenu() {
  setBtnText(btn1, "Pickaxe");
  setBtnText(btn2, "Sword");
  setBtnText(btn3, "Back");
  btn3.onclick = function() { goShopping() };

  btn1.onclick = function() { upgradePick() };
}

function upgradePick() {
  let cost = 10;
  if (money >= cost && pickLvl < 5) {
    money -= cost;
    cost = Math.round(cost*1.5);
    pickLvl += 1;
    pickaxe = pickaxe_levels[pickLvl];
    money_text.innerHTML = money;
  }else if(pickLvl >= 5) {
    sendNotification("pickaxe level already at maximum");
  }else if(cost > money) {
    sendNotification(`not enough, you need ${cost} coins`);
  }
}

function toTown() {
  setBtnText(btn1, "Shopping")
  setBtnText(btn2, "Mining");
  setBtnText(btn3, "Fighting")
  btn1.onclick = function() { goShopping() };
  btn2.onclick = function() { goMining() };
  btn3.style.display = "inline";
  btn3.onclick = function() { setBtnText(btn3, "clicked") };
  document.title = "Town"
}

function sendNotification(notification) {
  notif_txt.innerHTML = notification;
  notif_txt.style.display = "inline";
  setTimeout(function(){
    notif_txt.style.display = "none";
  }, 5000)
}

btn1.onclick = function() { goShopping() };
btn2.onclick = function() { goMining() };
btn3.onclick = function() { setBtnText(btn3, "clicked") };
