export default defineNuxtRouteMiddleware((to) => {
  const sessionId = useCookie("access_token").value;

  if (!sessionId && to.path !== "/login") {
    return navigateTo("/login");
  }
});
