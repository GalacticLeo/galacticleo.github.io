

let timespan = document.querySelector('#time');
function updateTime() {
  let date = getUTC8Date();
  let hours = date.getHours().toString().padStart(2, '0');
  let minutes = date.getMinutes().toString().padStart(2, '0');
  let seconds = date.getSeconds().toString().padStart(2, '0');
  let time = hours + ":" + minutes + ":" + seconds;
  timespan.innerHTML = time;
}

function getUTC8Date() {
  let utcDate = new Date();
  utcDate.setHours(utcDate.getHours() + 3);
  return utcDate;
}

setInterval(updateTime, 1000);



document.querySelector("#ManualXPKill").addEventListener('click', onManualInteract);

let kills = 0;
let startTime;
let elapsedTime;

let reset = false;

function onManualInteract() {
  if(!startTime) {
    startTime = new Date();
  }

	kills++;
	elapsedTime = new Date().getTime() - startTime;
	
	minutes = elapsedTime / 60 / 1000;
	
	killsPerMinute = kills / minutes;

  if(minutes > 2) {
    document.querySelector("#ManualXPKill").classList.add("btn-success");
    /*if(!reset){
      document.querySelector("#manual-group").appendChild(createButtonBootstrap());
      reset = true;
    }*/
  }
	
	updateKillsPerMinute(killsPerMinute);
  inputHandler();
}

function updateKillsPerMinute(killsPerMinute){
  document.querySelector("#kill-per-minute").value = killsPerMinute.toFixed(2);
}

document.querySelector("#kill-per-minute").addEventListener('input', inputHandler);
document.querySelector("#xp-per-kill").addEventListener('input', inputHandler);


function inputHandler() {
  let kps = parseFloat(document.querySelector("#kill-per-minute").value);
  let xpk = parseInt(document.querySelector("#xp-per-kill").value);
  
  if(kps && xpk) {
    updateXpPerMinute(kps * xpk);
  }
}

function updateXpPerMinute(xpPerMinute) {

  var visualMinute = document.querySelector('#xp-minute');
  var visualHour = document.querySelector('#xp-hour');
  var visual8Hour = document.querySelector('#xp-8hour');
  var visual24Hour = document.querySelector('#xp-24hour');
  // Change the data

  visualMinute.value = nFormatter(xpPerMinute);
  visualHour.value = nFormatter(xpPerMinute * 60);
  visual8Hour.value = nFormatter(xpPerMinute * 60 * 8);
  visual24Hour.value = nFormatter(xpPerMinute * 60 * 24);
}

function nFormatter(number) {
  var SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

  var tier = Math.log10(Math.abs(number)) / 3 | 0;
  if(tier == 0) return number;

  var suffix = SI_SYMBOL[tier];
  var scale = Math.pow(10, tier * 3);
  var scaled = number / scale;

  return scaled.toFixed(1) + suffix;
}


function createButtonBootstrap() {
  let button = document.createElement('button');
  button.classList = 'btn btn-outline-secondary';

  button.innerHTML = 'R';
  button.addEventListener('click', () => {
    kills = 0;
    startTime = undefined;
    document.querySelector("#manual-group").removeChild(button);
    document.querySelector("#ManualXPKill").classList.remove("btn-success");
    reset = false;
  });

  return button;
}
