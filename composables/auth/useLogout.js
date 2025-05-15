import { useAuthStore } from "~/store/authStore";
import { useFormDataStore } from "~/store/formDataStore";
import { useResultStore } from "~/store/resultStore";

export const useLogout = async () => {
  const authStore = useAuthStore();
  const formDataStore = useFormDataStore();
  const resultStore = useResultStore();

  try {
    await $fetch("/api/auth/sign-out/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": useCookie("csrftoken").value,
      },
      credentials: "include",
    });

    authStore.$reset();
    formDataStore.$reset();
    resultStore.$reset();

    await navigateTo("/login");
  } catch (err) {
    console.error("Auth error:", err);
  }
};
