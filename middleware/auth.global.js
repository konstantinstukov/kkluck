export default defineNuxtRouteMiddleware((to) => {
  const sessionId = useCookie("sessionid").value;

  if (!sessionId && to.path !== "/login") {
    return navigateTo("/login");
  }
});
