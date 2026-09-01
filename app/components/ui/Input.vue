<script setup>
import { useField } from 'vee-validate';
import { useModClasses } from '../../composables/useModClasses'

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  name: String,
  placeholder: String,
  id: String,
  type: {
    type: String,
    default: 'text',
  },
  mod: String,
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

const {
  errorMessage,
  handleBlur,
  handleChange,
  meta,
  value,
} = useField(() => props.name);


const computedClass = computed(() => useModClasses('input', props.mod));
</script>

<template>
  <input
    :name="name"
    :type="type"
    :id="props.id"
    :placeholder="props.placeholder"
    v-model="value"
    class="input"
    :class="[computedClass, { 'is-invalid': !!errorMessage, 'is-valid': meta.valid }]"
    @input="handleChange"
    @blur="handleBlur"
    v-bind="$attrs"
  />
  <p class="input__message mt-1 mb-0" v-show="errorMessage || meta.valid">
    {{ errorMessage }}
  </p>
</template>



<style lang="stylus">
.input-wrapper
  position relative

.input
  display block
  width 100%
  height 3.5rem
  padding 0 1rem
  color var(--color-black)
  font-weight 400
  font-size 1rem
  font-family var(--font-family)
  font-variant-numeric lining-nums proportional-nums
  line-height 1.5
  background-color var(--bg-color-light)
  background-clip border-box
  border 1px solid var(--color-border)
  border-radius .75rem
  transition all .2s ease
  appearance none
  &:invalid
    box-shadow none
  &:hover
    background-color var(--bg-color-light)
  &:focus-visible
    background-color var(--color-card)
    border-color var(--color-text-accent)
    outline none
  &::placeholder
    color var(--color-text-blind)
    opacity 1
  &:disabled
    color var(--color-text-blind)
    background-color var(--color-card)
    border-color var(--color-border)
    pointer-events none
  &:-webkit-autofill
    transition background-color 10000000s ease-out

  .is-invalid &
  &.is-invalid
    border-color var(--color-error)
  &.is-valid
    border-color var(--color-success)

  &__message
    color var(--color-error)
    font-size 14px
</style>
