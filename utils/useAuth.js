export const useAuth = () => {
  const config = useRuntimeConfig();

  const fetchCSRFToken = async () => {
    const csrfToken = useCookie("csrftoken").value;
    if (!csrfToken) {
      console.error("CSRF token is missing.");
    }
    if (csrfToken) return;

    await $fetch("/user/csrf/", {
      baseURL: config.public.apiBase,
      credentials: "include",
      mode: "no-cors",
    });
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
