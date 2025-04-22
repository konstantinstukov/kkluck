export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const getApiPath = (url) => {
    const likeMatch = url.match(/(?:bonfire|posts)\/(\d+)/);
    if (likeMatch) {
      return `/like/${likeMatch[1]}/?type=1`;
    }

    const commentMatch = url.match(/posts\/([\d\w-]+)/);
    if (commentMatch) {
      return `/post/${commentMatch[1]}/`;
    }
    return null;
  };

  try {
    const { url } = await readBody(event);

    console.log("url: ", url);

    const data = await $fetch(getApiPath(url), {
      method: "GET",
      baseURL: config.public.apiBase,
      credentials: "include",
      headers: {
        cookie: getHeader(event, "cookie") || "",
      },
    });

    console.log("data: ", data);

    if (Array.isArray(data)) {
      return data;
    } else if (data && typeof data === "object") {
      return data.comments;
    } else {
      console.warn("Непредвиденный формат данных:", data);
    }
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    return [];
  }
});
