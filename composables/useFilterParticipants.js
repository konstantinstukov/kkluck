export const useFilterParticipants = (participants, filter) => {
  if (filter.filterBy === "like") return participants;

  if (filter.filterBy === "comment") {
    const uniqueParticipantsMap = new Map();

    const processComments = (comments) => {
      if (!comments || !comments.length) return;

      for (const comment of comments) {
        if (!uniqueParticipantsMap.has(comment.user.id)) {
          uniqueParticipantsMap.set(comment.user.id, comment);
        }

        if (comment.children && comment.children.length > 0) {
          processComments(comment.children);
        }
      }
    };

    processComments(participants.comments);

    let filteredParticipants = Array.from(uniqueParticipantsMap.values());

    if (filter.hasImage) {
      filteredParticipants = filteredParticipants.filter((participant) => {
        return participant.images && participant.images.length > 0;
      });
    }

    if (filter.findByWord && filter.word) {
      const word = filter.word.toLowerCase();
      filteredParticipants = filteredParticipants.filter((participant) => {
        return participant.text?.toLowerCase().includes(word);
      });
    }

    return filteredParticipants;
  }

  console.error("Непредвиденный формат фильтра");
  return [];
};
