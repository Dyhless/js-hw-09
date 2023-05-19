//Импортируем функцию throttle из библиотеки lodash 
import throttle from 'lodash.throttle';

//Выбираем форму и ее поля (email и message) с помощью метода querySelector
const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

// Обработчик события input, вызывается при изменении значения полей формы
const handleInputChange = throttle(function () {
  const formData = {
    email: emailInput.value,
    message: messageInput.value
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}, 500); // Ограничиваем частоту обновления хранилища 1 раз в 500 миллисекунд

// Устанавливаем обработчик события input на поля формы
emailInput.addEventListener('input', handleInputChange);
messageInput.addEventListener('input', handleInputChange);

// При загрузке страницы проверяем состояние хранилища и заполняем поля формы
const savedFormData = localStorage.getItem('feedback-form-state');
if (savedFormData) {
  const { email, message } = JSON.parse(savedFormData);
  emailInput.value = email;
  messageInput.value = message;
}

// Обработчик события submit формы
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = {
    email: emailInput.value,
    message: messageInput.value
  };

  // Проверка на заполнение двух полей
  if (emailInput.value && messageInput.value) {
    console.log(formData);

    // Очищаем поля формы
    emailInput.value = '';
    messageInput.value = '';

    // Удаляем сохраненное состояние формы из локального хранилища
    localStorage.removeItem('feedback-form-state');
  }
});


