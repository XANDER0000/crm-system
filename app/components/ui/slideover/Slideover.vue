<template>
  <HeadlessTransitionRoot as="template" :show="isOpen" appear>
    <aside class="slideover">
      <HeadlessTransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="slideover__backdrop" @click="closeSlideover"></div>
      </HeadlessTransitionChild>
      <HeadlessTransitionChild
        as="template"
        enter="transform transition ease-out duration-300"
        enter-from="translate-x-full"
        enter-to="translate-x-0"
        leave="transform transition ease-in duration-200"
        leave-from="translate-x-0"
        leave-to="translate-x-full"
      >
        <div class="slideover__wrapper">
          <div class="slideover__container">
            <Top />
            
            <Comments />
          </div>
        </div>
      </HeadlessTransitionChild>
    </aside>
  </HeadlessTransitionRoot>
</template>

<script setup lang="ts">
  const store = useSlideoverStore();
  const isOpen = computed(() => store.$state.open);

  const closeSlideover = () => {
    store.closeDrawer();
  };
</script>

<style scoped lang="stylus">
.slideover
  position fixed
  z-index 1000
  color var(--color-text)

  &__backdrop
    position fixed
    inset 0
    background-color rgba(0,0,0,.75)

  &__wrapper
    position fixed
    top 0px
    right 0px
    width 400px
    height 100%
    overflow-y auto
    background-color var(--bg-color)

  &__container
    display flex
    flex-direction column
    min-height 100%
    padding 1rem
</style>