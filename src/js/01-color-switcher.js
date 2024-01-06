// Функция для генерации случайного цвета в формате HEX
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

// Объект с ссылками на элементы DOM
const refs = {
   startBtn: document.querySelector('button[data-start]'),
   stopBtn: document.querySelector('button[data-stop]'),
};

// Инициализация переменных для управления интервалом
let intervalId = null;
let isIntervalActive = false;

// Установка начального состояния кнопок
refs.stopBtn.disabled = true;

// Обработчик события клика по кнопке "Start"
refs.startBtn.addEventListener('click', () => {
   // Проверка, активен ли уже интервал
   if (isIntervalActive) {
      return;
   }
   
   // Запуск интервала с сменой цвета фона каждую секунду
   intervalId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
   }, 1000);

   // Обновление состояния кнопок и флага активности интервала
   isIntervalActive = true;
   refs.startBtn.disabled = true;
   refs.stopBtn.disabled = false;
});

// Обработчик события клика по кнопке "Stop"
refs.stopBtn.addEventListener('click', () => {
   // Проверка, активен ли интервал
   if (!isIntervalActive) {
      return;
   }

   // Остановка интервала и сброс цвета фона
   clearInterval(intervalId);
   document.body.style.backgroundColor = '';

   // Сброс флага активности интервала и обновление состояния кнопок
   isIntervalActive = false; 
   refs.startBtn.disabled = false;
   refs.stopBtn.disabled = true;
});
