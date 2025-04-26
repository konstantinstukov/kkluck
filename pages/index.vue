<script setup>
import {useFormDataStore} from "~/store/formDataStore.js";

const formDataStore = useFormDataStore();
const {
  link,
  filterByLike,
  filterByComment,
  findByWord,
  winnersCount,
  word,
  hasImage,
} = storeToRefs(formDataStore);

const router = useRouter();

const buttonText = computed(() =>
    winnersCount.value > 1 ? "Определить победителей" : "Определить победителя"
);
const isLinkCorrect = ref(null);
const linkErrorText = ref("");
const isWinnersCountCorrect = ref(null);
const isWordCorrect = ref(null);
const wordErrorText = ref("");

watch(
    [() => findByWord.value, () => filterByComment.value],
    ([newFindByWord, newFilterByComment]) => {
      if (!newFindByWord) {
        word.value = "";
        hasImage.value = false;
        isWordCorrect.value = null;
        wordErrorText.value = "";
      }

      if (!newFilterByComment) {
        findByWord.value = false;
      }
    }
);

const validateLink = () => {
  const bonfirePattern = /^https:\/\/kknights\.com\/bonfire\/\d+$/;
  const postsPattern =
      /^https:\/\/kknights\.com\/posts\/\d+-[a-zA-Z0-9-]+(?:\?.*)?$/;
  const isOldPostsLink =
      /^https:\/\/kknights\.com\/posts\/[a-zA-Zа-яА-Я0-9-]+(?:\?.*)?$/.test(
          link.value
      );

  if (bonfirePattern.test(link.value) || postsPattern.test(link.value)) {
    isLinkCorrect.value = true;
    linkErrorText.value = "";
  } else if (isOldPostsLink) {
    isLinkCorrect.value = false;
    linkErrorText.value = "Ссылки на старые посты пока не поддерживаются";
  } else {
    isLinkCorrect.value = false;
    linkErrorText.value = "Некорректный формат ссылки";
  }
};

const validateWinnersCount = () => {
  isWinnersCountCorrect.value =
      winnersCount.value >= 1 && winnersCount.value <= 100;
};

const validateWordInput = () => {
  if (filterByComment.value && findByWord.value) {
    if (word.value.length > 30) {
      isWordCorrect.value = false;
      wordErrorText.value = "Поле не должно превышать 30 символов";
      return;
    }

    if (word.value.length === 0 && !hasImage.value) {
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
            v-model="link"
            :class="
            isLinkCorrect === true
              ? 'form-input--correct'
              : isLinkCorrect === false
              ? 'form-input--error'
              : ''
          "
            autocomplete="off"
            class="input-simple"
            name="link"
            placeholder="https://kknights.com/bonfire/1234567"
            type="text"
            @blur="validateLink"
        />
        <p v-if="isLinkCorrect === false" class="text-red-500 text-sm mt-2">
          {{ linkErrorText }}
        </p>
      </fieldset>
    </div>
    <div class="w-full">
      <fieldset>
        <legend class="title">Выбирать по:</legend>

        <p
            v-if="!filterByLike && !filterByComment"
            class="text-red-500 text-sm mt-2"
        >
          Необходимо выбрать минимум одно условие
        </p>

        <div class="flex flex-col gap-4 mt-2">
          <div>
            <input
                id="like"
                v-model="filterByLike"
                name="filterByLike"
                type="checkbox"
                value="like"
            />
            <label class="px-2" for="like">Лапкам</label>
          </div>
          <div>
            <input
                id="comment"
                v-model="filterByComment"
                name="filterByComment"
                type="checkbox"
                value="comment"
            />
            <label class="px-2" for="comment">Комментам</label>
          </div>
        </div>

        <div v-if="filterByComment" class="mt-4">
          <input
              id="findByWord"
              v-model="findByWord"
              name="findByWord"
              type="checkbox"
          />
          <label class="pl-2" for="findByWord">Выбирать по содержанию</label>

          <div v-if="findByWord">
            <input
                id="wordSearch"
                v-model="word"
                :class="[
                'input-simple',
                findByWord === false
                  ? ''
                  : isWordCorrect === true
                  ? 'form-input--correct'
                  : isWordCorrect === false
                  ? 'form-input--error'
                  : '',
              ]"
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
                  v-model="hasImage"
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
            v-model="winnersCount"
            :class="{
            'form-input--correct': isWinnersCountCorrect === true,
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

    <button
        class="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-(--color-secondary) px-4 py-2 text-sm font-medium text-(--color-primary) hover:bg-(--color-primary) hover:text-(--background-panel) focus:outline-none focus-visible:ring-2 focus-visible:ring-(color-primary) focus-visible:ring-offset-2"
        type="submit"
    >
      {{ buttonText }}
    </button>
  </form>
</template>
