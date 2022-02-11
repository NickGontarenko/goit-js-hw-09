const startBtnRef = document.querySelector('[data-start]');
// console.log(startBtnRef);
const stopBtnRef = document.querySelector('[data-stop]');
// console.log(stopBtnRef);
let isActiv = false;
let timerId = null;

startBtnRef.addEventListener('click', onStartChangeBodyBgc);
stopBtnRef.addEventListener('click', onStopChangeBodyBgc);
stopBtnRef.setAttribute('disabled', true);

function onStartChangeBodyBgc() {
  if (isActiv) {
    return;
  }

  startBtnRef.setAttribute('disabled', true);
  stopBtnRef.removeAttribute('disabled');
  timerId = setInterval(() => {
    const randomColor = getRandomHexColor();
    console.log(randomColor);
    document.body.style.backgroundColor = randomColor;
  }, 1000);
  isActiv = true;
}

function onStopChangeBodyBgc() {
  clearInterval(timerId);
  isActiv = false;
  startBtnRef.removeAttribute('disabled');
  stopBtnRef.setAttribute('disabled', true);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
