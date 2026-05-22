<script setup lang="ts">
import {useModClasses} from '~/composables/useModClasses';

const baseClass = 'alert';

type AlertVariant = 'error' | 'info' | 'success' | 'warning';

const props = defineProps<{
  mod?: string;
  icon?: string;
  classIcon?: string;
  label?: string;
  variant?: AlertVariant;
}>();

const emit = defineEmits<{
  (e: "close"): void
}>();

// Маппинг вариантов на иконки
const variantIcons: Record<AlertVariant, string> = {
  error: 'mdi:close',
  info: 'mdi:info',
  success: 'mdi:success',
  warning: 'mdi:alert'
};

// Автоматическая иконка на основе variant
const autoIcon = computed(() => {
  if (props.icon) return props.icon;
  if (props.variant && variantIcons[props.variant]) {
    return variantIcons[props.variant];
  }
  return null;
});

const variantClass = computed(() => props.variant ? `${baseClass}--${props.variant}` : null);
const modClass = computed(() => useModClasses(baseClass, props.mod));


const onClose = () => {
  emit("close");
}

</script>

<!--
<BaseAlert variant="error" label="Не оч" />
<BaseAlert variant="info" label="Информация"/>
<BaseAlert variant="success" label="Все круто"/>
<BaseAlert variant="warning" label="Внимание!"/>
-->

<template>
  <div
    class="alert"
    :class="[variantClass, modClass]"
  >
    <Icon
      v-if="autoIcon"
      :name="autoIcon"
      :class="classIcon ? classIcon : 'nuxt-icon alert__close'"
      role="button"
      tabindex="0"
      @click="onClose"
      @keydown.enter.space.prevent="onClose"
    />
    <span v-if="label" class="alert__label">
      {{ label }}
    </span>
  </div>
</template>

<style lang="stylus">
.alert
  display inline-flex
  flex-flow row nowrap
  gap 1rem
  align-items flex-start
  justify-content flex-start
  min-height 2.75rem
  min-width 2.75rem
  padding .5rem 1.125rem
  color var(--color-text-dark)
  font-weight 400
  font-size 1rem
  font-family var(--font-family)
  line-height 1.5
  text-align left
  background-color var(--color-info-light)
  border-color var(--color-info)
  border-style solid
  border-width 1px
  border-radius .75rem
  position relative

  &--success
    background-color var(--color-success-light)
    border-color var(--color-success)
    .nuxt-icon
      color var(--color-success)

  &--error
    background-color var(--color-error-light)
    border-color var(--color-error)
    .nuxt-icon
      color var(--color-error)

  &--info
    background-color var(--color-info-light)
    border-color var(--color-info)
    .nuxt-icon
      color var(--color-info)

  &--warning
    background-color var(--color-warning-light)
    border-color var(--color-warning)
    .nuxt-icon
      color var(--color-warning)

  &__close
    cursor pointer
    transition opacity .15s ease
    &:hover
      opacity .7

  .nuxt-icon
    flex 0 0 auto
    font-size 1.5rem
    line-height 1
    fill currentColor
    margin-left -.5rem
    margin-right -.5rem
    svg
      margin-bottom 1px


</style>
