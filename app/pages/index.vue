<template>
  <Board v-if="!isPageLoading" />
</template>

<script setup>
const isPageLoading = inject('isPageLoading');
const { userLoggedIn } = useAuth();

useSeoMeta({
  title: 'Главная',
});

definePageMeta({
  layout: 'main',
  // middleware: ['auth'],
});

onBeforeMount(async () => {
  const isLoggedIn = await userLoggedIn();
  if (!isLoggedIn) {
    navigateTo('/login');
  }
});
</script>

<style lang="stylus" scoped>

</style>