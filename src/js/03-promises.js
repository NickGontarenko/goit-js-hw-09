import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');
const formBtnRef = document.querySelector('.form button');

formRef.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();

  let firstDelayRef = evt.currentTarget.elements.delay.valueAsNumber;
  const delayStepRef = evt.currentTarget.elements.step.valueAsNumber;
  const amountRef = evt.currentTarget.elements.amount.valueAsNumber;

  for (let i = 1; i <= amountRef; i++) {
    let position = i;
    formBtnRef.disabled = true;

    createPromise(position, firstDelayRef)
      .then(({ position, delay }) => {
        // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    setTimeout(() => {
      if (position == amountRef) {
        formBtnRef.disabled = false;
        return;
      }
    }, firstDelayRef);

    firstDelayRef += delayStepRef;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
