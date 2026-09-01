<script setup lang="ts">
const props = defineProps<{
  image?: string;
  icon?: string;
  text?: string;
  mod?: string;
}>();

import { useModClasses } from '~/composables/useModClasses';
const computedClass = computed(() => useModClasses('avatar', props.mod));

const isImageHidden = ref(false);
</script>

<template>
  <span
    class="avatar"
    :class="[computedClass, !!image && !isImageHidden ? 'bg-light' : '']"
  >
    <img
      v-if="image && !isImageHidden"
      ref="imageElement"
      alt=""
      class="avatar__image"
      loading="lazy"
      :src="image"
      :class="{ hidden: isImageHidden }"
      @error="isImageHidden = true"
    />
    <Icon 
      v-if="icon"
      class="avatar__icon shrink-0 text-5"
      :name="icon" />
    <span
      v-if="text && !(image && !isImageHidden) && !icon"
      class="avatar__text" >
      {{ text }}
    </span
    >
  </span>
</template>

<style lang="stylus">
.avatar
  display inline-flex
  align-items center
  justify-content center
  width 2.25rem
  height 2.25rem
  border-radius 50%
  color var(--color-text-contrast)
  background-color var(--color-primary)
  overflow hidden

  &__image
    width 100%
    height 100%
    object-fit cover

  &__text
    display inline-block
    font-weight 700
    font-size 1rem
    line-height 1
    text-transform uppercase
    max-width 100%
    padding .25rem
</style>
