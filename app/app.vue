<template>
  <div>
    <transition name="fade">
      <div v-if="isPageLoading" class="page-loader">
        <img src="/assets/img/preloader.svg" alt="">
      </div>
    </transition>
    
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const isPageLoading = ref(true);

provide('isPageLoading', isPageLoading);

// Показываем preloader при начале навигации
router.beforeEach(() => {
  isPageLoading.value = true;
});

// Скрываем preloader когда страница загрузилась
router.afterEach(() => {
  isPageLoading.value = false;
});

onMounted(async () => {
  isPageLoading.value = false;
})

</script>

<style scoped>
.page-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>