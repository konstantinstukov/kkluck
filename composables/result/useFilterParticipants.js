export const useFilterParticipants = (comments, uniqueMap, formData) => {
  if (!comments?.length) return;

  comments.forEach((comment) => {
    if (!comment?.user?.id) return;

    // Ищем только в тексте самого комментария, исключая respond_to_comment
    let cleanText = comment.text ? comment.text.toLowerCase() : '';

    // Сначала извлекаем никнеймы из data-username атрибутов
    const usernameMatches = cleanText.match(/data-username="([^"]+)"/g) || [];
    const usernames = usernameMatches.map(match =>
      match.replace(/data-username="([^"]+)"/, '$1')
    );

    // Удаляем HTML теги
    cleanText = cleanText.replace(/<[^>]*>/g, '');

    // Удаляем конкретные никнеймы пользователей из текста
    usernames.forEach(username => {
      const regex = new RegExp(`\\b${username}\\b`, 'gi');
      cleanText = cleanText.replace(regex, '');
    });

    const wordFilterPassed = formData?.word
      ? cleanText.includes(formData.word.toLowerCase())
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
