import Notiflix from 'notiflix';

// Находим форму по классу и добавляем обработчик события submit
const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);

// Обработчик события submit формы
function handleSubmit(event) {
  event.preventDefault();

  // Получаем значения полей ввода и преобразуем их в числа
  const delay = Number(document.querySelector('input[name="delay"]').value);
  const step = Number(document.querySelector('input[name="step"]').value);
  const amount = Number(document.querySelector('input[name="amount"]').value);

  // Создаем промисы с заданными параметрами
  createPromises(position, delay)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}

// Создание промисов
function createPromises(position, delay) {

  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay});
      } else {
        reject({ position, delay});
      }
    }, delay);
  });
}

