export default defineNuxtRouteMiddleware(async (to, from) => {
  // Пропускаем страницу логина
  if (to.path === '/login') {
    return;
  }
  
  const { userLoggedIn } = useAuth();
  
  // Если не авторизован - редирект на логин
  const isLoggedIn = await userLoggedIn();
  if (!isLoggedIn) {
    return navigateTo('/login');
  }
})