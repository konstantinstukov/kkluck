import { useResultStore } from "~/store/resultStore";
import { useParticipantsData } from "./useParticipantsData";
import { useWinnerSelect } from "./useWinnerSelect";

export const useResultFlow = ({ link, formData, winnersCount }) => {
  console.log("useResultFlow initialized with:", {
    link,
    formData,
    winnersCount,
  });

  const resultStore = useResultStore();
  const isLoading = ref(true);
  const error = ref(null);

  const { fetchParticipants } = useParticipantsData();

  const loadResult = async () => {
    try {
      const participants = await fetchParticipants(link, formData);

      resultStore.setParticipants(participants);
      resultStore.setWinners(useWinnerSelect(participants, winnersCount));

      isLoading.value = false;
      error.value = null;
    } catch (err) {
      console.error(err);
      error.value = "Ошибка при загрузке данных";
      isLoading.value = false;
    }
  };

  return { loadResult, isLoading, error };
};
