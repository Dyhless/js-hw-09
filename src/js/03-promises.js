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
  createPromises(amount, delay, step);
}

// Создание промисов
function createPromises(amount, delay, step) {
  for (let i = 1; i <= amount; i++) {
    const position = i;
    const currentDelay = delay + (i - 1) * step;

    // Создаем промис с задержкой
    const promise = new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;

      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay: currentDelay });
        } else {
          reject({ position, delay: currentDelay });
        }
      }, currentDelay);
    });

    // Обрабатываем результат промиса
    promise
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
