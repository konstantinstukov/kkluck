export const useResultStore = defineStore("resultStore", {
  state: () => ({
    participants: null,
    winners: null,
  }),
  getters: {
    getParticipants: (state) => state.participants,
    getWinners: (state) => state.winners,
  },
  actions: {
    setParticipants(filteredParticipants) {
      this.participants = filteredParticipants;
    },
    setWinners(newWinners) {
      this.winners = newWinners;
    },
    clearResults() {
      this.participants = null;
      this.winners = null;
    },
  },
  persist: {
    storage: piniaPluginPersistedstate.sessionStorage(),
  },
});
