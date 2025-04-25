export const useFilterParticipants = (participants, filter) => {
  if (!participants || !participants.length) return [];

  let filteredParticipants = [...participants];

  if (filter.hasImage) {
    filteredParticipants = filteredParticipants.filter(
      (participant) => participant.images && participant.images.length > 0
    );
  }

  if (filter.findByWord && filter.word) {
    const word = filter.word.toLowerCase();
    filteredParticipants = filteredParticipants.filter((participant) =>
      participant.text?.toLowerCase().includes(word)
    );
  }

  return filteredParticipants;
};
