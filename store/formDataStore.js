import { defineStore } from "pinia";

export const useFormDataStore = defineStore("formDataStore", {
  state: () => ({
    link: "",
    filterByLike: true,
    filterByComment: false,
    findByWord: false,
    winnersCount: 1,
    word: null,
    hasImage: false,
    isValid: false,
  }),
  actions: {
    setFormDataField(key, value) {
      if (key in this) {
        this[key] = value;
      } else {
        console.warn(`Поле "${key}" не найдено в formDataStore`);
      }
    },
  },
  persist: {
    storage: piniaPluginPersistedstate.sessionStorage(),
  },
});
