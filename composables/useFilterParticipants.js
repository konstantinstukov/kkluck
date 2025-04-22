export const useFilterParticipants = (participants, filter) => {
  let filterError;

  const participantsData = participants?.value?.success ? [] : participants;

  console.log("Входные данные:", {
    participants: participantsData,
    filter: filter,
  });

  if (filter.findBy === "like") return [];

  if (filter.findBy === "comment") {
    const uniqueParticipantsMap = new Map();

    for (const participant of participantsData) {
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

  filterError = "Непредвиденный формат фильтра";
  console.error("Непредвиденный формат фильтра");
  return filterError;
};
