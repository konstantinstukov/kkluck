export default defineEventHandler(async (event) => {
  if (!event.path.startsWith("/api/")) {
    return;
  }

  const config = useRuntimeConfig();

  const response = await fetch(`${config.public.apiBase}/user/csrf/`, {
    method: "GET",
    credentials: "include",
    headers: {
      cookie: getHeader(event, "cookie") || "",
    },
  });

  const setCookie = response.headers.get("set-cookie");
  if (setCookie) {
    setHeader(event, "set-cookie", setCookie);
  }
});
