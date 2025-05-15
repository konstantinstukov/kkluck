export const useValidationWinnersCount = (winnersCount) => {
  const isWinnersCountCorrect = ref(null);

  const validateWinnersCount = () => {
    isWinnersCountCorrect.value =
      winnersCount.value >= 1 && winnersCount.value <= 100;
  };

  return {
    isWinnersCountCorrect,
    validateWinnersCount,
  };
};
