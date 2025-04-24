export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isCheckingAuth: false,
  }),
  getters: {
    getUser: (state) => state.user,
    isLoggedIn: (state) => !!state.user,
  },
  actions: {
    setUser(newUser) {
      this.user = newUser;
    },
  },
  persist: {
    storage: piniaPluginPersistedstate.sessionStorage(),
  },
});
