// Импорт библиотеки Notiflix
import Notiflix from 'notiflix';

// Получение ссылки на форму
const form = document.querySelector('.form');

// Назначение обработчика события отправки формы
form.addEventListener('submit', handleSubmit);

// Callback-функция для обработки отправки формы
function handleSubmit(event) {
  // Предотвращение обновления страницы
  event.preventDefault();

  // Получение значений из полей формы
  const delay = Number(document.querySelector('input[name="delay"]').value);
  const step = Number(document.querySelector('input[name="step"]').value);
  const amount = Number(document.querySelector('input[name="amount"]').value);

  // Сброс значений полей формы после отправки
  form.reset();

  // Создание промисов и их обработка
  for (let i = 0; i < amount; i += 1) {
    const position = i + 1;
    const currentDelay = delay + i * step;

    createPromise(position, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Promise ${position} выполнен за ${delay}мс`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Promise ${position} отклонен за ${delay}мс`);
      });
  }
}

// Функция для создания промиса
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    // Определение, успешно ли выполнится промис
    const shouldResolve = Math.random() > 0.3;

    // Установка таймера для имитации асинхронной операции
    setTimeout(() => {
      // Решение или отклонение промиса в зависимости от условия
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
