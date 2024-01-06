// Импорт необходимых библиотек
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

// Объект с ссылками на элементы DOM
const refs = {
  picker: document.querySelector("#datetime-picker"),
  startBtn: document.querySelector("button[data-start]"),
  daysValue: document.querySelector("[data-days]"),
  hoursValue: document.querySelector("[data-hours]"),
  minutesValue: document.querySelector("[data-minutes]"),
  secondsValue: document.querySelector("[data-seconds]")
};

// Деструктуризация объекта с элементами DOM
const { picker, startBtn, daysValue, hoursValue, minutesValue, secondsValue } = refs;

// Установка начального состояния кнопки
startBtn.disabled = true;
let intervalId = null;
let selectedDate;

// Настройки для flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  // Callback-функция, вызываемая при закрытии календаря
  onClose(selectedDates) {
    selectedDate = selectedDates[0];

    // Проверка выбранной даты
    if (selectedDate <= new Date()) {
      Notiflix.Notify.failure("Пожалуйста, выберите дату в будущем");
      return;
    }

    // Активация кнопки после успешного выбора даты
    startBtn.disabled = false;
  },
};

// Создание экземпляра flatpickr
const datePickerComp = flatpickr(picker, options);

// Обработчик события клика по кнопке "Start"
startBtn.addEventListener("click", startTimer);

// Callback-функция для интервала
const intervalCallBack = () => {

  // Рассчитываем оставшееся время в миллисекундах
  const leftMillisecond = datePickerComp.latestSelectedDateObj.getTime() - Date.now();

  // Преобразование миллисекунд в дни, часы, минуты и секунды
  const {days, hours, minutes, seconds } = convertMs(leftMillisecond);
  // Отображение оставшегося времени на странице
  daysValue.innerHTML = addLeadingZero(days);
  hoursValue.innerHTML = addLeadingZero(hours);
  minutesValue.innerHTML = addLeadingZero(minutes);
  secondsValue.innerHTML = addLeadingZero(seconds);
      
  // Остановка интервала, если время вышло
  if (leftMillisecond < 1000) {
    clearInterval(intervalId);
  }
}

// Функция запуска таймера
function startTimer() {
  // Установка интервала с обновлением каждую секунду
  intervalId = setInterval(intervalCallBack, 1000);

  // Деактивация кнопки и поля выбора даты после старта таймера
  if (startTimer) {
    startBtn.disabled = true;
    picker.disabled = true;
  }
};

// Функция для конвертации миллисекунд в дни, часы, минуты и секунды
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Функция для добавления ведущего нуля к числу
function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}
