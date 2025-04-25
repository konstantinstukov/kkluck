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
  }),
  getters: {
    getLink: (state) => state.link,
    getFilterByLike: (state) => state.filterByLike,
    getFilterByComment: (state) => state.filterByComment,
    getFindByWord: (state) => state.findByWord,
    getWinnersCount: (state) => state.winnersCount,
    getWord: (state) => state.word,
    getHasImage: (state) => state.hasImage,
  },
  actions: {
    getFormData() {
      return {
        link: this.link,
        filterByLike: this.filterByLike,
        filterByComment: this.filterByComment,
        findByWord: this.findByWord,
        winnersCount: this.winnersCount,
        word: this.word,
        hasImage: this.hasImage,
      };
    },

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
