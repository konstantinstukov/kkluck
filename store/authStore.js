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
    async checkAuth() {
      if (this.isCheckingAuth) return;

      if (this.user) return this.user;

      this.isCheckingAuth = true;

      try {
        const user = await $fetch("/api/auth/me/", {
          method: "GET",
          credentials: "include",
        });

        this.setUser(user);
        return user;
      } catch (error) {
        this.setUser(null);
        console.error(error);
        return null;
      } finally {
        this.isCheckingAuth = false;
      }
    },
  },
  persist: {
    storage: piniaPluginPersistedstate.sessionStorage(),
  },
});
