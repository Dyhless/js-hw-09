import Notiflix from "notiflix";

const refs = {
  form: document.querySelector("[form]"),
  delay: document.querySelector("[delay]"),
  step: document.querySelector("[step]"),
  amount: document.querySelector("[amount]"),
  submit: document.querySelector("submit[submit]"),
};

const { form, delay, step, amount, submit } = refs;

const shouldResolve = true;

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}

createPromise(2, 1500)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });