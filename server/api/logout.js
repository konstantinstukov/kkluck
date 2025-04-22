export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  try {
    await readBody(event);

    const response = await $fetch(`${config.public.apiBase}/auth/sign-out`, {
      method: "POST",
      credentials: "include",
      headers: {
        cookie: getHeader(event, "cookie") || "",
      },
    });

    return response;
  } catch (error) {
    console.error("Logout failed:", error);
    return { error: "Logout error" };
  }
});
