import { defineStore } from "pinia";

export const useFormDataStore = defineStore("formDataStore", () => {
  const link = ref<string>("");
  const filterBy = ref<"like" | "comment">("like");
  const findByWord = ref<boolean>(false);
  const winnersCount = ref<number>(1);
  const word = ref<string>("");
  const hasImage = ref<boolean>(false);

  return { link, filterBy, findByWord, winnersCount, word, hasImage };
});
