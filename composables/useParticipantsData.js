export const useParticipantsData = () => {
  const filterComments = (comments, uniqueMap, formData) => {
    if (!comments?.length) return;

    comments.forEach((comment) => {
      const hasImageAttachment = formData?.hasImage
        ? comment.attachments?.some((attachment) => attachment.type === "image")
        : true;

      const shouldInclude =
        (!formData?.findByWord ||
          (formData.word &&
            comment.text
              ?.toLowerCase()
              .includes(formData.word.toLowerCase()))) &&
        hasImageAttachment;

      if (
        shouldInclude &&
        comment?.user?.id &&
        !uniqueMap.has(comment.user.id)
      ) {
        uniqueMap.set(comment.user.id, comment);
      }

      if (comment.children?.length) {
        filterComments(comment.children, uniqueMap, formData);
      }
    });
  };

  const fetchParticipants = async (link, formData) => {
    if (formData.filterByLike && formData.filterByComment) {
      try {
        const [likesResponse, commentsResponse] = await Promise.all([
          $fetch(useGetDataPath(link, { ...formData, filterByComment: false })),
          $fetch(useGetDataPath(link, { ...formData, filterByLike: false })),
        ]);

        const commentsUsersMap = new Map();
        filterComments(commentsResponse.comments, commentsUsersMap, formData);

        const uniqueParticipants = new Map();

        if (Array.isArray(likesResponse)) {
          likesResponse.forEach((participant) => {
            if (
              participant?.user?.id &&
              commentsUsersMap.has(participant.user.id)
            ) {
              uniqueParticipants.set(participant.user.id, participant);
            }
          });
        }

        const result = Array.from(uniqueParticipants.values());

        return result;
      } catch (error) {
        console.error("Fetch error:", error);
        return [];
      }
    }

    const response = await $fetch(useGetDataPath(link, formData));

    if (formData.filterByLike) {
      return response || [];
    }

    if (formData.filterByComment) {
      const uniqueComments = new Map();
      filterComments(response.comments, uniqueComments);
      return Array.from(uniqueComments.values());
    }

    return [];
  };

  return {
    fetchParticipants,
  };
};
