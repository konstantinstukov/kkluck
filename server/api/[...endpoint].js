export default defineEventHandler(async (event) => {
  console.log("Received request:", event.node.req.url);
  const config = useRuntimeConfig();
  let endpoint = event.context.params.endpoint;

  if (Array.isArray(endpoint)) {
    endpoint = endpoint.join("/");
  }

  const url = new URL(
    event.node.req.url,
    `http://${event.node.req.headers.host}`
  );

  const searchParams = url.search;
  const targetUrl = `${config.public.apiBase}${endpoint}/${searchParams}`;

  if (event.method === "GET") {
    return proxyRequest(event, targetUrl);
  }

  console.log("Proxying to:", targetUrl);

  return await proxyRequest(event, targetUrl, {
    headers: {
      Host: "kknights.com",
      Referer: "https://kknights.com/",
    },
  });
});
