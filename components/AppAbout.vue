<script setup>
import {ref} from 'vue';
import AppModal from './AppModal.vue';

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<template>
  <div>
    <button class="about-button" @click="openModal">
      Что умеет KKLuck?
    </button>

    <AppModal :is-open="isModalOpen" title="Что умеет KKLuck?" @close="closeModal">
      <div class="about-content">
        <h3 class="about-subtitle">Основные возможности:</h3>

        <div class="feature">
          <h4 class="feature-title">1. Выбор победителей по лапкам (лайкам):</h4>
          <ul class="feature-list">
            <li>Вставьте ссылку на пост или записку в кострище</li>
            <li>Укажите количество победителей (от 1 до 100)</li>
            <li>Получите случайно выбранных победителей из тех, кто поставил лапку</li>
          </ul>
        </div>

        <div class="feature">
          <h4 class="feature-title">2. Выбор победителей по комментариям:</h4>
          <ul class="feature-list">
            <li>Вставьте ссылку на пост или записку в кострище</li>
            <li>Укажите количество победителей (от 1 до 100)</li>
            <li>Получите случайно выбранных победителей из тех, кто оставил комментарий</li>
          </ul>
        </div>

        <div class="feature">
          <h4 class="feature-title">3. Фильтрация комментариев по содержанию:</h4>
          <ul class="feature-list">
            <li>Выбор комментариев, содержащих определенное слово или фразу</li>
            <li>Выбор комментариев, содержащих изображения</li>
            <li>Комбинирование этих фильтров для более точного отбора</li>
          </ul>
        </div>

        <h3 class="about-subtitle mt-6">Как пользоваться:</h3>
        <ol class="usage-list">
          <li>
            <span class="usage-step">Вставьте ссылку на пост или записку в кострище в формате:</span>
            <ul class="usage-sublist">
              <li><code>https://kknights.com/bonfire/1234567</code></li>
              <li><code>https://kknights.com/posts/post-id</code></li>
            </ul>
          </li>
          <li><span class="usage-step">Выберите тип отбора: по лапкам или комментариям</span></li>
          <li>
            <span class="usage-step">Если выбран отбор по комментариям, вы можете дополнительно фильтровать по содержанию:</span>
            <ul class="usage-sublist">
              <li>Включите опцию "Выбирать по содержанию"</li>
              <li>Введите слово или фразу для поиска (до 30 символов)</li>
              <li>При необходимости включите опцию "Содержит изображение"</li>
            </ul>
          </li>
          <li><span class="usage-step">Укажите количество победителей (от 1 до 100)</span></li>
          <li><span class="usage-step">Нажмите кнопку "Определить победителя" или "Определить победителей"</span></li>
          <li><span class="usage-step">Получите список случайно выбранных победителей</span></li>
        </ol>

        <h3 class="about-subtitle mt-6">Технические особенности:</h3>
        <ul class="tech-list">
          <li>Приложение автоматически исключает дубликаты участников</li>
          <li>Максимальное количество победителей ограничено количеством уникальных участников</li>
          <li>Работает с постами и записками в кострище на сайте kknights.com</li>
        </ul>
      </div>
    </AppModal>
  </div>
</template>

<style scoped>
.about-button {
  background: none;
  border: none;
  color: var(--color-orange);
  cursor: pointer;
  font-weight: 600;
  padding: 0 10px;
  height: 100%;
  display: flex;
  align-items: center;
}

.about-button:hover {
  text-decoration: underline;
}

.about-content {
  color: var(--color-text);
  font-size: 14px;
  line-height: 1.5;
}

.about-subtitle {
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 12px;
  color: var(--color-heading);
}

.feature {
  margin-bottom: 16px;
}

.feature-title {
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--color-orange);
}

.feature-list, .tech-list, .usage-list, .usage-sublist {
  padding-left: 20px;
  margin-bottom: 8px;
}

.feature-list li, .tech-list li, .usage-sublist li {
  margin-bottom: 4px;
}

.usage-list li {
  margin-bottom: 8px;
}

.usage-step {
  font-weight: 600;
}

.mt-6 {
  margin-top: 24px;
}

code {
  background-color: var(--color-tag-background);
  padding: 2px 4px;
  border-radius: 4px;
  font-family: monospace;
}
</style>