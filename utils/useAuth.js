export const useAuth = () => {
  const config = useRuntimeConfig();

  const fetchCSRFToken = async () => {
    const csrfToken = useCookie("csrftoken").value;
    if (csrfToken) return;

    try {
      await $fetch("/user/csrf/", {
        baseURL: config.public.apiBase,
        credentials: "include",
      });
    } catch (error) {
      console.error("Failed to fetch CSRF token:", error);
    }
  };

  const login = async (email, password) => {
    await fetchCSRFToken();

    const csrfToken = useCookie("csrftoken").value;

    return $fetch("/auth/sign-in/", {
      method: "POST",
      baseURL: config.public.apiBase,
      credentials: "include",
      headers: {
        "X-CSRF-Token": csrfToken || "",
      },
      body: { email, password },
    });
  };

  const logout = async () => {
    await fetchCSRFToken();

    const csrfToken = useCookie("csrftoken").value;

    return $fetch("/auth/sign-out", {
      method: "POST",
      baseURL: config.public.apiBase,
      credentials: "include",
      headers: {
        "X-CSRF-Token": csrfToken || "",
      },
    });
  };

  return { login, logout, fetchCSRFToken };
};
