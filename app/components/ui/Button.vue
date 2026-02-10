<script setup lang="ts">
import {useModClasses} from '../../composables/useModClasses';

const baseClass = 'button';

const props = defineProps({
  as: String,
  href: String,
  to: String,
  type: {
    type: String,
    default: 'button',
  },
  icon: String,
  classIcon: String,
  iconRight: String,
  label: {
    type: String
  },
  size: {
    type: String,
    validator(value) {
      return typeof value === 'string' && ['l', 'm', 's', 'xl'].includes(value);
    },
  },
  variant: {
    type: String,
    validator(value) {
      return typeof value === 'string' && ['primary', 'secondary', 'tertiary', 'tertiary-text', 'iter', 'blue', 'red'].includes(value);
    },
  },
  bg: {
    type: String,
    validator(value) {
      return typeof value === 'string' && ['light', 'dark'].includes(value);
    },
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  mod: String,
});

const computedTag = computed(() => {
  if (props.as) {
    return props.as;
  }

  if (props.to) {
    return resolveComponent('NuxtLink')
  }

  if (props.href) {
    return 'a';
  }

  return 'button';
})

const bgClass = computed(() => props.bg ? `${baseClass}--${props.bg}` : null);
const sizeClass = computed(() => props.size ? `${baseClass}--${props.size}` : null);
const variantClass = computed(() => props.variant ? `${baseClass}--${props.variant}` : null);
const modClass = computed(() => useModClasses(baseClass, props.mod));

</script>

<template>
  <component
    :is="computedTag"
    :to="to"
    :href="href"
    :type="computedTag === 'button' ? type : undefined"
    :disabled="computedTag === 'button' ? disabled : undefined"
    class="button"
    :class="[bgClass, sizeClass, variantClass, modClass, disabled ? 'disabled' : null]"
  >
    <Icon v-if="icon && !loading" :name="icon" :class="classIcon"></Icon>
    <slot name="left"></slot>
    <loaderIcon v-if="loading" class="shrink-0"></loaderIcon>
    <span v-if="label" class="button__label">
      {{ label }}
    </span>
    <slot></slot>
    <slot name="right"></slot>
    <Icon v-if="iconRight && !loading" :name="iconRight" :class="classIcon"></Icon>
  </component>
</template>

<style lang="stylus">
.button
  display inline-flex
  flex-flow row nowrap
  gap 1rem
  align-items center
  justify-content center
  min-height 2.75rem
  min-width 2.75rem
  padding .5rem 1.125rem
  color var(--color-text-contrast)
  font-weight 800
  font-size 1rem
  font-family var(--font-montserrat)
  line-height 1.5
  text-align center
  text-decoration none
  background-color var(--color-button-primary)
  border-color var(--color-button-primary)
  border-style solid
  border-width 1px
  border-radius .75rem
  cursor pointer
  transition all .3s ease
  &:hover
  &:focus-visible
    color var(--color-text-contrast)
    text-decoration none
    background-color var(--color-button-primary-light)
    border-color var(--color-button-primary-light)
  &:active
    color var(--color-text-contrast)
    text-decoration none
    background-color var(--color-button-primary-dark)
    border-color var(--color-button-primary-dark)
  &:disabled
  &.disabled
    color var(--color-text-blind)
    background-color var(--color-gray-1)
    border-color var(--color-gray-1)
    pointer-events none

  .nuxt-icon
    flex 0 0 auto
    font-size 1.5rem
    line-height 1
    fill currentColor
    margin-left -.5rem
    margin-right -.5rem
    svg
      margin-bottom 1px
  .loader-icon
    flex 0 0 auto
    margin-left -.5rem
    margin-right -.5rem

  &--blue
    color var(--color-white)
    background-color var(--color-blue-500)
    border-color var(--color-blue-500)
    &:hover
    &:focus-visible
      color var(--color-white)
      text-decoration none
      background-color var(--color-blue-600)
      border-color var(--color-blue-600)
    &:active
      color var(--color-white)
      text-decoration none
      background-color var(--color-blue-600)
      border-color var(--color-blue-600)
    &:disabled
    &.disabled
      color var(--color-white)
      background-color var(--color-blue-200)
      border-color var(--color-blue-200)
      pointer-events none

  &--secondary
    color var(--color-text-accent)
    background-color transparent
    border-color var(--color-border)
    &:hover
    &:focus-visible
      color var(--color-text-accent)
      text-decoration none
      background-color var(--color-gray-2)
      border-color var(--color-border)
    &:active
      color var(--color-text-accent)
      text-decoration none
      background-color var(--color-gray-3)
      border-color var(--color-border)
    &:disabled
    &.disabled
      color var(--color-text-blind)
      background-color transparent
      border-color var(--color-border)
      pointer-events none

  &--tertiary
    color var(--color-text-accent)
    background-color transparent
    border-color transparent
    &:hover
    &:focus-visible
      color var(--color-text-accent)
      text-decoration none
      background-color var(--color-gray-2)
      border-color var(--color-gray-2)
    &:active
      color var(--color-text-accent)
      text-decoration none
      background-color var(--color-gray-3)
      border-color var(--color-gray-3)
    &:disabled
    &.disabled
      color var(--color-text-blind)
      background-color transparent
      border-color transparent

  &--tertiary&--dark
    color var(--color-text-accent)
    background-color transparent
    border-color transparent
    &:hover
    &:focus-visible
      color var(--color-text-accent)
      text-decoration none
      background-color var(--color-gray-4)
      border-color var(--color-gray-4)
    &:active
      color var(--color-text-accent)
      text-decoration none
      background-color var(--color-gray-5)
      border-color var(--color-gray-5)
    &:disabled
    &.disabled
      color var(--color-text-blind-contrast)
      background-color transparent
      border-color transparent

  &--tertiary-text
    color var(--color-text-2)
    background-color transparent
    border-color transparent
    &:hover
    &:focus-visible
      color var(--color-text)
      text-decoration none
      background-color var(--color-gray-2)
      border-color var(--color-gray-2)
    &:active
      color var(--color-text)
      text-decoration none
      background-color var(--color-gray-3)
      border-color var(--color-gray-3)
    &:disabled
    &.disabled
      color var(--color-text-blind)
      background-color transparent
      border-color transparent

  &--tertiary-text&--dark
    color var(--color-text-2-contrast)
    background-color transparent
    border-color transparent
    &:hover
    &:focus-visible
      color var(--color-text-contrast)
      text-decoration none
      background-color var(--color-gray-4)
      border-color var(--color-gray-4)
    &:active
      color var(--color-text-contrast)
      text-decoration none
      background-color var(--color-gray-5)
      border-color var(--color-gray-5)
    &:disabled
    &.disabled
      color var(--color-text-blind-contrast)
      background-color transparent
      border-color transparent

  &--iter
    color var(--color-text-2)
    font-weight 500
    border-color var(--color-border)
    background-color transparent
    &:hover
    &:focus-visible
    &.active
      color var(--color-text)
      text-decoration none
      background-color transparent
      border-color var(--color-text-accent)
    &:active
      color var(--color-text)
      text-decoration none
      background-color transparent
      border-color var(--color-text-accent)
    &:disabled
    &.disabled
      color var(--color-border)
      background-color transparent
      border-color transparent

  &--xl
    gap 1rem
    min-height 3rem
    min-width 3rem
    padding .5rem 1.125rem
    font-weight 800
    font-size 1rem
    line-height 1.5
    border-radius .5rem
    .nuxt-icon
      font-size 1.5rem
      margin-right -.5rem
      margin-left -.5rem

  &--l
    gap 1rem
    min-height 2.75rem
    padding .5rem 1.125rem
    font-weight 800
    font-size 1rem
    line-height 1.5
    border-radius .75rem

  &--m
    gap .5rem
    min-height 2rem
    min-width 2rem
    padding 0rem 0.75rem
    font-weight 800
    font-size .875rem
    line-height 1.428
    border-radius .5rem
    .nuxt-icon
      font-size 1.1rem
      margin-right -.35rem
      margin-left -.35rem
    .loader-icon
      // width 1rem
      margin-left -.35rem
      margin-right -.35rem

  &--s
    gap .5rem
    min-height 1.5rem
    min-width 1.5rem
    padding 0 0.5rem
    font-weight 800
    font-size .875rem
    line-height 1.428
    border-radius .5rem
    .nuxt-icon
      font-size 1rem
      margin-right -.25rem
      margin-left -.25rem
    .loader-icon
      width 1rem
      margin-left -.25rem
      margin-right -.25rem

  &--align-left
    justify-content left
    text-align left

  &--justify-between
    justify-content space-between

  &--chat-user
    gap 1rem
    min-height 3.5rem
    min-width 3.5rem
    justify-content space-between
    padding .375rem 0.75rem
    color var(--color-grey-700)
    font-weight 500
    font-size 1rem
    line-height 1.5
    text-align left
    background-color var(--color-grey-100)
    border-color var(--color-grey-100)
    border-radius .5rem
    &:hover
    &:focus-visible
    &:active
    &.active
      color var(--color-grey-700)
      text-decoration none
      background-color var(--color-grey-300)
      border-color var(--color-grey-300)
    &:disabled
    &.disabled
      color var(--color-grey-600)
      background-color var(--color-grey-100)
      border-color var(--color-grey-100)
      pointer-events none
    .nuxt-icon
      flex 0 0 auto
      font-size 1.5rem
      margin 0

</style>
