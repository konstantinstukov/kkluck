export const useAuth = async (authFormData, errorMsg) => {
  try {
    errorMsg.value = "";

    const getCsrfToken = async () => {
      await $fetch("/api/user/csrf/", {
        method: "GET",
        credentials: "include",
      });
    };

    await getCsrfToken();

    await $fetch("/api/auth/sign-in/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": useCookie("csrftoken").value,
      },
      credentials: "include",
      body: {
        email: authFormData.email,
        password: authFormData.password,
      },
    });

    await navigateTo("/");
  } catch (err) {
    console.error("Auth error:", err);
    errorMsg.value = "Неправильный логин или пароль.";
  }
};
