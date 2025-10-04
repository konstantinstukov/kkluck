export const useFilterParticipants = (comments, uniqueMap, formData) => {
  if (!comments?.length) return;

  comments.forEach((comment) => {
    if (!comment?.user?.id) return;

    const text = comment.text?.toLowerCase() || "";

    let wordFilterPassed = true;

    if (formData?.word) {
      const searchWord = formData.word.toLowerCase();
      const textContainsWord = text.includes(searchWord);

      // Если есть respond_to_comment, проверяем что слово НЕ найдено только в цитируемом тексте
      if (comment.respond_to_comment?.text) {
        const respondText = comment.respond_to_comment.text.toLowerCase();
        const respondContainsWord = respondText.includes(searchWord);

        // Если слово найдено в основном тексте И в цитируемом тексте,
        // нужно убедиться что оно есть не только в цитируемой части
        if (textContainsWord && respondContainsWord) {
          // Удаляем цитируемый текст и проверяем, осталось ли искомое слово
          const textWithoutRespond = text.replace(respondText, "").trim();
          wordFilterPassed = textWithoutRespond.includes(searchWord);
        } else if (textContainsWord && !respondContainsWord) {
          // Слово есть в основном тексте, но нет в цитируемом - это нормально
          wordFilterPassed = true;
        } else {
          // Слова нет в основном тексте
          wordFilterPassed = false;
        }
      } else {
        // Нет respond_to_comment, обычная проверка
        wordFilterPassed = textContainsWord;
      }
    }
    const imageFilterPassed = formData?.hasImage
      ? comment.images?.length > 0
      : true;

    if (
      wordFilterPassed &&
      imageFilterPassed &&
      !uniqueMap.has(comment.user.id)
    ) {
      uniqueMap.set(comment.user.id, comment);
    }

    if (comment.children?.length) {
      useFilterParticipants(comment.children, uniqueMap, formData);
    }
  });
};
