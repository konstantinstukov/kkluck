export const useFilterParticipants = (comments, uniqueMap, formData) => {
  if (!comments?.length) return;

  comments.forEach((comment) => {
    if (!comment?.user?.id) return;

    const text = comment.text?.toLowerCase() || "";
    const wordFilterPassed = formData?.word
      ? text.includes(formData.word.toLowerCase())
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
