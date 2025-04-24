import { defineStore } from "pinia";

export const useFormDataStore = defineStore("formDataStore", {
  state: () => ({
    link: "",
    filterBy: "like",
    findByWord: false,
    winnersCount: 1,
    word: null,
    hasImage: false,
  }),
  getters: {
    getLink: (state) => state.link,
    getFilterBy: (state) => state.filterBy,
    getFindByWord: (state) => state.findByWord,
    getWinnersCount: (state) => state.winnersCount,
    getWord: (state) => state.word,
    getHasImage: (state) => state.hasImage,
  },
  actions: {
    getFormData() {
      return {
        link: this.link,
        filterBy: this.filterBy,
        findByWord: this.findByWord,
        winnersCount: this.winnersCount,
        word: this.word,
        hasImage: this.hasImage,
      };
    },
    setFormData(formData) {
      Object.assign(this, formData);
    },
  },
  persist: {
    storage: piniaPluginPersistedstate.sessionStorage(),
  },
});
