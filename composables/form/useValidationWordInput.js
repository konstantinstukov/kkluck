export const useValidationWordInput = (
  filterByComment,
  findByWord,
  word,
  hasImage
) => {
  const isWordCorrect = ref(null);
  const wordErrorText = ref("");

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

  return {
    isWordCorrect,
    wordErrorText,
    validateWordInput,
  };
};
