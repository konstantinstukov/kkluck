export const useFilterParticipants = (participants, filter) => {
  if (filter.filterBy === "like") return participants;

  if (filter.filterBy === "comment") {
    const uniqueParticipantsMap = new Map();

    for (const participant of participants.comments) {
      if (!uniqueParticipantsMap.has(participant.user.id)) {
        uniqueParticipantsMap.set(participant.user.id, participant);
      }
    }

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
