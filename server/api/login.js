export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  try {
    const { email, password } = await readBody(event);

    const response = await $fetch(`${config.public.apiBase}/auth/sign-in/`, {
      method: "POST",
      body: { email, password },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.access) {
      throw createError({
        statusCode: 401,
        message: "Authentication failed",
      });
    }

    setCookie(event, "access_token", response.access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return {
      success: true,
      access: response.access,
    };
  } catch (error) {
    console.error("Login error:", error);
    throw createError({
      statusCode: error.statusCode || 403,
      message: error.message || "Authentication failed",
    });
  }
});
