export default defineNuxtRouteMiddleware((to) => {
  const csrfToken = useCookie("csrftoken").value;

  if (!csrfToken && to.path !== "/login") {
    return navigateTo("/login");
  }
});
