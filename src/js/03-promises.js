import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delay: Number(document.querySelector('input[name="delay"]').value),
  step: Number(document.querySelector('input[name="step"]').value),
  amount: Number(document.querySelector('input[name="amount"]').value),
}

const { form, delay, step, amount } = refs;

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  form.reset();

  for (let i = 0; i < amount; i += 1) {
    const position = i + 1;
    const currentDelay = delay + i * step;

    createPromise(position, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
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
