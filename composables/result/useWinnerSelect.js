export function useWinnerSelect(participants, maxWinners) {
  if (!Array.isArray(participants)) {
    return [];
  }
  if (participants.length === 0) {
    return [];
  }
  if (maxWinners <= 0) {
    return [];
  }

  const winners = [];
  const available = [...participants];
  const winnersCount = Math.min(maxWinners, available.length);

  for (let i = 0; i < winnersCount; i++) {
    const randomIndex = Math.floor(Math.random() * available.length);
    const winner = available.splice(randomIndex, 1)[0];
    winners.push(winner);
  }
  return winners;
}
