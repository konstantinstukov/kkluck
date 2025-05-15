export const useResultStore = defineStore("resultStore", {
  state: () => ({
    participants: null,
    winners: null,
  }),
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
