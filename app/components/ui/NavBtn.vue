<template>
  <button class="nav-btn" type="button" aria-label="Меню" data-toggle="aside">
    <span class="nav-btn__line"></span>
    <span class="nav-btn__line"></span>
    <span class="nav-btn__line"></span>
  </button>
</template>

<script setup>

</script>

<style lang="stylus">
.nav-btn
  --color-line var(--bg-color)
  position relative
  display inline-block
  width 44px
  height 44px
  padding 0
  background-color transparent
  border none
  backface-visibility hidden
  @media(min-width 1280px)
    display none

  &__line
    position absolute
    top 50%
    left 50%
    display block
    width 20px
    height 2px
    margin-top -1px
    margin-left -10px
    background-color var(--color-line)
    border-radius 4px
    transform-origin center center
    transition transform .1s, background-color .2s
    ^[0]:hover &
    ^[0]:focus-visible &
      background-color var(--color-hover)

    &:nth-child(1)
      transform translate(0,-6px)
      ^[0].active &
        transform rotate(45deg) translate(0px, 0px)

    &:nth-child(2)
      ^[0].active &
        opacity 0

    &:nth-child(3)
      transform translate(0,6px)
      ^[0].active &
        transform rotate(-45deg) translate(0px, 0px)
</style>