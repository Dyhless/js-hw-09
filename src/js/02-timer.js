import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const refs = {
  picker: document.querySelector("#datetime-picker"),
  startBtn: document.querySelector("button[data-start]"),
  daysValue: document.querySelector("[data-days]"),
  hoursValue: document.querySelector("[data-hours]"),
  minutesValue: document.querySelector("[data-minutes]"),
  secondsValue: document.querySelector("[data-seconds]")
};

let intervalId;

const { picker, startBtn, daysValue, hoursValue, minutesValue, secondsValue } = refs;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      Notiflix.Notify.failure("Please choose a date in the future");
      return;
    }

    startBtn.disabled = false;
  },
};

flatpickr(picker, options);

startBtn.addEventListener("click", startTimer);

function startTimer() {
  const selectedDates = picker.selectedDates;

  if (selectedDates.length === 0) {
    // Если нет выбранной даты, обработать соответствующую ошибку или просто вернуться
    return;
  }

  const selectedDate = selectedDates[0];
  let countdown = selectedDate.getTime() - new Date().getTime();

  startBtn.disabled = true;

  intervalId = setInterval(() => {
    const timeLeft = convertMs(countdown);

    daysValue.textContent = addLeadingZero(timeLeft.days);
    hoursValue.textContent = addLeadingZero(timeLeft.hours);
    minutesValue.textContent = addLeadingZero(timeLeft.minutes);
    secondsValue.textContent = addLeadingZero(timeLeft.seconds);

    countdown -= 1000;

    if (countdown < 0) {
      clearInterval(intervalId);
      startBtn.disabled = false;
      Notiflix.Notify.success("Countdown finished!");
    }
  }, 1000);
}

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

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}
