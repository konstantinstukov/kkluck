export default defineEventHandler(async (event) => {
  console.log("Received request:", event.req.url);

  const config = useRuntimeConfig();

  let endpoint = event.context.params.endpoint;

  if (Array.isArray(endpoint)) {
    endpoint = endpoint.join("/");
  }

  const targetUrl = `${config.public.apiBase}${endpoint}`;
  console.log("Proxying to:", targetUrl);

  await proxyRequest(event, targetUrl);
});
