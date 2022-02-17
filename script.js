setInterval(() => {
  let curentTime = new Date();
  let curentDate = new Date()
  let houres = curentTime.getHours();
  let minutes = curentTime.getMinutes();
  let seconds = curentTime.getSeconds();
  let years = curentDate.getFullYear();
  let monthes = curentDate.getUTCMonth();
  let days = curentDate.getUTCDate();
  if (houres < 10) houres = '0' + houres;
  if (minutes < 10) minutes = '0' + minutes;
  if (seconds < 10) seconds = '0' + seconds;
  if (monthes < 10) monthes = `0${monthes+1} `;
  if (days < 10) days = `0${days}`;
  document.querySelector('.time').innerHTML = `${houres} : ${minutes} : ${seconds}`
  document.querySelector('.date').innerHTML = `${days} : ${monthes} : ${years}`
});


let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timerRef = document.querySelector('.stopwatch');
let int = null;

document.getElementById('start').addEventListener('click', () => {

  if (int !== null) {
      clearInterval(int);
  }
  int = setInterval(displayTimer, 10);

});

document.getElementById('stop').addEventListener('click', () => {
  clearInterval(int);

});

document.getElementById('reset').addEventListener('click', () => {
  clearInterval(int);
  [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  timerRef.innerHTML = '00:00:00:000 ';
  document.querySelector('.loopWindow').innerHTML = ''
});

function displayTimer() {
  milliseconds += 10;
  if (milliseconds == 1000) {
      milliseconds = 0;
      seconds++;
      if (seconds == 60) {
          seconds = 0;
          minutes++;
          if (minutes == 60) {
              minutes = 0;
              hours++;
          }
      }
  }

  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;

  timerRef.innerHTML = ` ${h}:${m}:${s}:${ms}`;


}
document.querySelector('#loop').addEventListener('click', addLoop)

function addLoop() {

  document.querySelector('.loopWindow').innerHTML += `<div> ${timerRef.innerHTML} </div>`
}
document.querySelector('#btnPlus').addEventListener('click', btnIncrement);
document.querySelector('#btnMinus').addEventListener('click', btnDecrement);

let countdownMinutes = 25;
let countdownSeconds = 0;

function btnIncrement() {
  document.querySelector('.countdown').innerHTML = Number(document.querySelector('.countdown').innerHTML) + 1;
  countdownMinutes = document.querySelector('.countdown').innerHTML;

}

function btnDecrement() {
  if (Number(document.querySelector('.countdown').innerHTML) > 0) {
      document.querySelector('.countdown').innerHTML = Number(document.querySelector('.countdown').innerHTML) - 1;
      countdownMinutes = document.querySelector('.countdown').innerHTML

  }
}

let countdownRef = document.querySelector('.countdownTimer');
let intID = null;

document.getElementById('startCountdown').addEventListener('click', () => {

  document.getElementById('startCountdown').disabled = true;
  document.getElementById('stopCountdown').disabled = false;
  if (intID !== null) {
      clearInterval(intID);
  }
  countdownMinutes = countdownMinutes - 1;
  countdownSeconds = 60;
  countdownRef.innerHTML = `${countdownMinutes} : ${countdownSeconds}`
  intID = setInterval(displayCountdown, 1000);


});

document.getElementById('stopCountdown').addEventListener('click', () => {
  document.getElementById('startCountdown').disabled = false;
  document.getElementById('stopCountdown').disabled = true;
  clearInterval(intID);

});

document.getElementById('resetCountdown').addEventListener('click', () => {
  clearInterval(intID);
  [countdownMinutes, countdownSeconds] = [0, 0];
  countdownRef.innerHTML = '00:00';

});


function displayCountdown() {

  countdownSeconds--;
  
  if (countdownSeconds == 0) {
      countdownSeconds = 60;
      countdownMinutes--;
      if (countdownMinutes == 0) {
          clearInterval(intID);
      }
  }

  let cdm = countdownMinutes < 10 ? "0" + countdownMinutes : countdownMinutes;
  let cds = countdownSeconds < 10 ? "0" + countdownSeconds : countdownSeconds;
  countdownRef.innerHTML = `${cdm} : ${cds}`;
}