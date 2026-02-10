<template>
  <div class="page">
    <div class="page__grid">
      <Sidebar />
      <div class="page__main">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus">
.page
  display flex
  flex-direction column
  min-height 100vh
  max-width 1920px
  margin 0 auto
  padding 1.25rem
  @media (min-width 1280px)
    padding 1.25rem 2.5rem

  &__main
  &__content
    // flex 1 0 auto
    width 100%

  &__grid
    display flex
    flex-direction column
    gap 24px
    min-height 100vh
    @media (min-width 1280px)
      flex-direction row
      gap 73px

  &__content
    --gap 2rem
    display flex
    flex-direction column
    gap var(--gap)
    @media (min-width 1280px)
      padding-top 40px
      padding-bottom 40px
      --gap 2.5rem

  &__wrapper
    display flex
    flex-direction column
    gap 24px
    @media (min-width 1280px)
      gap 64px
</style>