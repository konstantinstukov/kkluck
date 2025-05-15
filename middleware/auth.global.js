import { useAuthStore } from "~/store/authStore";
import { useFormDataStore } from "~/store/formDataStore";

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  const { isValid } = useFormDataStore();

  if (!authStore.user) {
    try {
      const { data: user } = await useFetch("/api/user/me");
      if (user.value) {
        authStore.setUser(user.value);
      }
    } catch (e) {
      console.error("Ошибка при получении пользователя", e);
    }
  }

  if (authStore.user && to.path === "/login") {
    return navigateTo("/");
  }

  if (!authStore.user && to.path !== "/login") {
    return navigateTo("/login");
  }

  if (!isValid && to.path === "/result") {
    return navigateTo("/");
  }
});
