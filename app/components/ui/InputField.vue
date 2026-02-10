<script setup>
import { useModClasses } from '../../composables/useModClasses'

const baseClass = 'dialog';

const props = defineProps({
  label: String,
  for: String,
  isPassword: Boolean,
  mod: String,
});

const rootElement = ref(null);
const input = ref(null);
const passwordHidden = ref(true);

onMounted(() => {
  input.value = rootElement.value.querySelector('input');
  passwordHidden.value = isPasswordHidden();
})

const isPasswordHidden = () => {
  return input.value && input.value.getAttribute("type") === 'password';
};

const onShowPassword = () => {
  if (input.value) {
    input.value.setAttribute('type', isPasswordHidden() ? 'text' : 'password');
    passwordHidden.value = isPasswordHidden();
  }
};

const passwordClass = computed(() => props.isPassword ? `${baseClass}--password` : null);
const modClass = computed(() => useModClasses(baseClass, props.mod));

</script>

<template>
  <div class="input-field" :class="[passwordClass, modClass]" ref="rootElement">
    <slot></slot>
    <label v-if="label" v-html="label" :for="props.for" class="input-field__label"></label>
    <button v-if="isPassword" type="button" :title="passwordHidden ? 'Показать пароль' : 'Скрыть пароль'" @click="onShowPassword" class="input-field__btn-show">
      <Icon name="mdi:eye-outline" v-show="passwordHidden" />
      <Icon name="mdi:eye-off-outline" v-show="!passwordHidden" />
    </button>
  </div>
</template>

<style lang="stylus">
.input-field
  position relative
  display block

  &__label
    position absolute
    top 1.75rem
    left 1rem
    z-index 5
    display inline-block
    color var(--color-text-2)
    font-size 1rem
    line-height 1.5
    transform translateY(-50%)
    transition all .4s ease
    pointer-events none

  .input
    padding-top 1rem
    &::placeholder
      opacity 0
    &:focus
    &:not(:empty)
    &:not(:placeholder-shown)
      &::placeholder
        opacity 1
      & + ^[0]__label
      & + .input__message + ^[0]__label
        font-size .75rem
        transform translateY(-110%)

  &__btn-show
    position absolute
    right .75rem
    top 1.75rem
    display flex
    align-items center
    justify-content center
    width 1.5rem
    height 1.5rem
    border none
    background none
    padding 0
    font-size 1.5rem
    color var(--color-text-2)
    text-decoration none
    transform translateY(-50%)
    &:hover
    &:focus-visible
      color var(--color-primary)
      text-decoration none
    .nuxt-icon
      font-size 1.5rem

  &--password
    .input
      padding-right 3em


</style>
