<script setup>
import { useValidationLink } from "~/composables/form/useValidationLink";
import { useValidationWinnersCount } from "~/composables/form/useValidationWinnersCount";
import { useValidationWordInput } from "~/composables/form/useValidationWordInput";
import { useFormDataStore } from "~/store/formDataStore.js";

const formDataStore = useFormDataStore();
const {
  link,
  filterByLike,
  filterByComment,
  findByWord,
  winnersCount,
  word,
  hasImage,
  isValid,
} = storeToRefs(formDataStore);

const router = useRouter();

const { isLinkCorrect, linkErrorText, validateLink } = useValidationLink(link);
const { isWinnersCountCorrect, validateWinnersCount } =
  useValidationWinnersCount(winnersCount);
const { isWordCorrect, wordErrorText, validateWordInput } =
  useValidationWordInput(word, findByWord, hasImage);

const buttonText = computed(() =>
  winnersCount.value > 1 ? "Определить победителей" : "Определить победителя"
);

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

const validateForm = () => {
  validateLink();
  validateWinnersCount();
  validateWordInput();

  if (
    isLinkCorrect.value &&
    isWinnersCountCorrect.value &&
    isWordCorrect.value
  ) {
    isValid.value = true;
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
