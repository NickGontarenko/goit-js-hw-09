import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputRef = document.querySelector('input#datetime-picker');
// console.dir(inputRef);
const startBtnRef = document.querySelector('[data-start]');
console.dir(startBtnRef);
const daysTimerRef = document.querySelector('[data-days]');
const hoursTimerRef = document.querySelector('[data-hours]');
const minutesTimerRef = document.querySelector('[data-minutes]');
const secondsTimerRef = document.querySelector('[data-seconds]');
let timerId = null;
let selectedDate = null;
let isActiv = false;

startBtnRef.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0].getTime());
    if (selectedDates[0].getTime() < options.defaultDate.getTime()) {
      startBtnRef.disabled = true;
      return Notify.failure('Please choose a date in the future');
    } else {
      selectedDate = selectedDates[0].getTime();
      startBtnRef.disabled = false;
      console.dir(selectedDate);
      return Notify.success('viridi lux');
    }
  },
};

flatpickr(inputRef, options);
startBtnRef.addEventListener('click', onСountdown);

function onСountdown() {
  timerId = setInterval(() => {
    const currentTime = Date.now();
    const countTime = selectedDate - currentTime;
    console.log(countTime);
    const { days, hours, minutes, seconds } = convertMs(countTime);
    uptadaClockface({ days, hours, minutes, seconds });

    if (countTime < 1000) {
      clearInterval(timerId);
    }
  }, 1000);

  startBtnRef.disabled = true;
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function uptadaClockface({ days, hours, minutes, seconds }) {
  daysTimerRef.textContent = `${days}`;
  hoursTimerRef.textContent = `${hours}`;
  minutesTimerRef.textContent = `${minutes}`;
  secondsTimerRef.textContent = `${seconds}`;
}
