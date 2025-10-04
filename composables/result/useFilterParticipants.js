export const useFilterParticipants = (comments, uniqueMap, formData) => {
  if (!comments?.length) return;

  comments.forEach((comment) => {
    if (!comment?.user?.id) return;

    // Создаем глубокую копию комментария без respond_to_comment для поиска
    const commentForSearch = JSON.parse(JSON.stringify(comment));
    delete commentForSearch.respond_to_comment;

    // Преобразуем в строку для поиска, исключая respond_to_comment
    const searchText = JSON.stringify(commentForSearch).toLowerCase();

    const wordFilterPassed = formData?.word
      ? searchText.includes(formData.word.toLowerCase())
      : true;

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
