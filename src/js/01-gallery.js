// Импортируем SimpleLightbox и стили
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// Импортируем массив элементов галереи
import { galleryItems } from './gallery-items';

// Выводим массив элементов галереи в консоль
console.log(galleryItems);

// Получаем ссылку на контейнер галереи
const galleryList = document.querySelector('.gallery');

// Функция для создания разметки элементов галереи
function createGalleryImages(galleryItems) {
  return galleryItems.map(({ preview, original, description }) => {
    return `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img class="gallery__image" src="${preview}" alt="${description}" />
        </a>
      </li>
    `;
  }).join('');
}

// Создаем разметку элементов галереи на основе массива galleryItems
const imageItem = createGalleryImages(galleryItems);

// Добавляем разметку элементов галереи в контейнер галереи
galleryList.insertAdjacentHTML('beforeend', imageItem);

// Создаем экземпляр SimpleLightbox для галереи
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt', // Используем атрибут alt для подписей
  captionDelay: 250, // Задержка перед отображением подписи
});
