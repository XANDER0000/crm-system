<script setup lang="ts">
import { uniqId } from '../../utils/uniqId';

const model = defineModel<string[]>()

const props = withDefaults(defineProps<{
  id?: string,
  name?: string,
  value?: string,
  label?: string,
  checked?: boolean,
  disabled?: boolean,
}>(), {
  checked: false,
  disabled: false,
})

const computedId = computed(() => {
  return props.id ? props.id : uniqId('check-');
})

const isChecked = computed(() => {
  if (!model.value) {
    return props.checked || false;
  }
  return model.value && model.value?.indexOf(props.value || '') > -1;
});

const isDisabled = computed(() => {
  return (props.disabled === true);
})

const emit = defineEmits<{
  change: [event: Event]
}>();

const change = (event: Event) => {
  emit('change', event);
}

</script>

<template>
  <div class="base-checkbox flex flex-col" :class="{'is-checked': isChecked, 'disabled': isDisabled}">
    <input type="checkbox" :id="computedId" :name="name" :value="value" :checked="isChecked" v-model="model" class="base-checkbox__input sr-only" @change="change" />
    <label :for="computedId" class="base-checkbox__label flex flex-row gap-2.5 items-center">
      <div class="base-checkbox__check flex items-center justify-center w-6 h-6 bg-light rounded-1.4 shrink-0">
        <Icon v-show="model" name="mdi:check" class="nuxt-icon text-6 shrink-0 text-text-contrast"></Icon>
      </div>
      <div class="base-checkbox__caption text-4 text-text2">{{ label }}</div>
    </label>
  </div>
</template>

<style lang="stylus">
.base-checkbox

  &.disabled
    opacity .5
    pointer-events none

  &__label
    user-select none
    cursor pointer

  &__caption
    transition color .2s ease
    // ^[0].is-checked &
    //   color var(--color-primary)

  &__check
    .nuxt-icon
      opacity 0
    ^[0].is-checked &
      background var(--color-primary)
      .nuxt-icon
        opacity 1

</style>
