<script setup>
import { useFormDataStore } from "~/store/store";

const formDataStore = useFormDataStore();

const router = useRouter();

const buttonText = computed(() =>
  formDataStore.winnersCount > 1
    ? "Определить победителей"
    : "Определить победителя"
);
const isLinkCorrect = ref(null);
const isWinnersCountCorrect = ref(null);
const isWordCorrect = ref(null);
const wordErrorText = ref("");

watch(
  [() => formDataStore.filterBy, () => formDataStore.findByWord],
  ([newFilterBy, newFindByWord]) => {
    if (newFilterBy === "like" || !newFindByWord) {
      formDataStore.word = "";
      formDataStore.hasImage = false;
    }

    if (newFilterBy === "like") {
      formDataStore.findByWord = false;
    }
  }
);

watch(
  () => formDataStore.link,
  (newValue) => {
    if (newValue === "") {
      isLinkCorrect.value = null;
    }
  }
);

const validateLink = () => {
  const bonfirePattern = /^https:\/\/kknights\.com\/bonfire\/\d+$/;
  const postsPattern =
    /^https:\/\/kknights\.com\/posts\/[a-zA-Z0-9-]+(?:\?.*)?$/;

  isLinkCorrect.value =
    (bonfirePattern.test(formDataStore.link) ||
      postsPattern.test(formDataStore.link)) &&
    formDataStore.link !== "";
};

const validateWinnersCount = () => {
  isWinnersCountCorrect.value =
    formDataStore.winnersCount >= 1 && formDataStore.winnersCount <= 100;
};

const validateWordInput = () => {
  if (formDataStore.filterBy === "comment" && formDataStore.findByWord) {
    const word = formDataStore.word;

    if (word.length > 30) {
      isWordCorrect.value = false;
      wordErrorText.value = "Поле не должно превышать 30 символов";
      return;
    }

    if (word.length === 0 && !formDataStore.hasImage) {
      isWordCorrect.value = false;
      wordErrorText.value = "Введите слово/фразу или выберите изображение";
      return;
    }

    isWordCorrect.value = true;
    wordErrorText.value = "";
  } else {
    isWordCorrect.value = true;
    wordErrorText.value = "";
  }
};

const validateForm = () => {
  validateLink();
  validateWinnersCount();
  validateWordInput();

  if (
    isLinkCorrect.value &&
    isWinnersCountCorrect.value &&
    isWordCorrect.value
  ) {
    return true;
  }
};

const sendFormData = () => {
  if (validateForm()) {
    router.push("/result");
  }
};
</script>

<template>
  <form
    class="flex flex-col items-center gap-7.5 max-w-[440px] container"
    @submit.prevent="sendFormData"
  >
    <div>
      <fieldset>
        <legend class="title">Ссылка на пост или записку в кострище:</legend>
        <input
          id="link"
          v-model="formDataStore.link"
          :class="{
            'form-input--correct': isLinkCorrect,
            'form-input--error': isLinkCorrect === false,
          }"
          autocomplete="off"
          class="input-simple"
          name="link"
          placeholder="https://kknights.com/bonfire/1234567"
          type="text"
          @blur="validateLink"
        />
        <p v-if="isLinkCorrect === false" class="text-red-500 text-sm mt-2">
          Некорректный формат ссылки
        </p>
      </fieldset>
    </div>
    <div class="w-full">
      <fieldset>
        <legend class="title">Выбирать по:</legend>
        <div class="flex flex-col gap-4 mt-2">
          <div>
            <input
              id="like"
              v-model="formDataStore.filterBy"
              name="filterBy"
              type="radio"
              value="like"
            />
            <label class="px-2" for="like">Лапкам</label>
          </div>
          <div>
            <input
              id="comment"
              v-model="formDataStore.filterBy"
              name="filterBy"
              type="radio"
              value="comment"
            />
            <label class="px-2" for="comment">Комментам</label>
          </div>
        </div>

        <div v-if="formDataStore.filterBy === 'comment'" class="mt-4">
          <input
            id="findByWord"
            v-model="formDataStore.findByWord"
            name="findByWord"
            type="checkbox"
          />
          <label class="pl-2" for="findByWord">Выбирать по содержанию</label>

          <div v-if="formDataStore.findByWord">
            <input
              id="wordSearch"
              v-model="formDataStore.word"
              :class="{
                'form-input--correct': isWordCorrect,
                'form-input--error': isWordCorrect === false,
              }"
              class="input-simple"
              name="wordSearch"
              placeholder="Введите слово / фразу или оставтье пустым"
              type="text"
              @blur="validateWordInput"
            />

            <p v-if="isWordCorrect === false" class="text-red-500 text-sm mt-2">
              {{ wordErrorText }}
            </p>

            <div class="pt-4">
              <input
                id="imgInclude"
                v-model="formDataStore.hasImage"
                name="imgInclude"
                type="checkbox"
                @blur="validateWordInput"
              />
              <label class="pl-2" for="imgInclude">Содержит изображение</label>
            </div>
          </div>
        </div>
      </fieldset>
    </div>
    <div class="w-full">
      <fieldset>
        <legend class="title">Количество победителей:</legend>

        <input
          id="winnersCount"
          v-model="formDataStore.winnersCount"
          :class="{
            'form-input--correct': isWinnersCountCorrect,
            'form-input--error': isWinnersCountCorrect === false,
          }"
          class="w-full h-10 rounded-lg input-simple"
          max="100"
          min="1"
          name="winnersCount"
          placeholder="от 1 до 100"
          type="number"
          @blur="validateWinnersCount"
        />
        <p
          v-if="isWinnersCountCorrect === false"
          class="text-red-500 text-sm mt-2"
        >
          Укажите количество от 1 до 100
        </p>
      </fieldset>
    </div>

    <button class="button" type="submit">
      {{ buttonText }}
    </button>
  </form>
</template>

<style lang="scss">
.input-simple {
  height: 40px;
  width: 100%;
  border-radius: 8px;
  border: 2px solid transparent;
  background: var(--color-toolbar-background);
  color: var(--color-input-text);
  font-family: Open Sans, sans-serif;
  font-size: 14px;
  padding: 8px 8px 10px;
  box-shadow: none;
  outline: 0 none transparent;
  margin-top: 10px;
}

.form-input--correct {
  border: 2px solid var(--color-green);
}

.form-input--error {
  border: 2px solid var(--color-red-500);
}

.button {
  outline: 0 none transparent;
  border: none;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;

  height: 40px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  padding: 0 20px;
  text-align: center;

  color: var(--color-orange);
  background: var(--color-button-primary-blue-background);

  &:hover {
    color: var(--color-black);
    background: var(--color-orange);
  }
}
</style>
