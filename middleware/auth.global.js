import { useAuthStore } from "~/store/authStore";

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  const isAuthChecking = ref(true);

  if (!authStore.user) {
    await callOnce(async () => {
      try {
        const { data: user } = await useFetch("/api/user/me");

        if (user.value) {
          authStore.setUser(user.value);
        }
      } finally {
        isAuthChecking.value = false;
      }
    });
  }

  if (isAuthChecking.value) {
    return;
  }

  if (authStore.user && to.path === "/login") {
    return navigateTo("/");
  }

  if (!authStore.user && to.path !== "/login") {
    return navigateTo("/login");
  }
});
