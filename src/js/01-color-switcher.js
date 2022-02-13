const startBtnRef = document.querySelector('[data-start]');
const stopBtnRef = document.querySelector('[data-stop]');
// console.log(stopBtnRef);
let timerId = null;

startBtnRef.addEventListener('click', onStartChangeBodyBgc);
stopBtnRef.addEventListener('click', onStopChangeBodyBgc);
stopBtnRef.disabled = true;

function onStartChangeBodyBgc() {
  startBtnRef.disabled = true;
  stopBtnRef.disabled = false;
  timerId = setInterval(() => {
    const randomColor = getRandomHexColor();
    console.log(randomColor);
    document.body.style.backgroundColor = randomColor;
  }, 1000);
}

function onStopChangeBodyBgc() {
  clearInterval(timerId);
  startBtnRef.disabled = false;
  stopBtnRef.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
