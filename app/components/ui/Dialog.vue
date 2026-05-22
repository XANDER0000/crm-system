<script setup lang="ts">
import { useModClasses } from '~/composables/useModClasses';
const baseClass = 'dialog';

const props = defineProps({
  name: {
    type: String,
    required: true,
    default: 'base-dialog',
  },
  size: {
    type: String,
    validator(value) {
      return typeof value === 'string' && ['m', 's'].includes(value);
    },
  },
  mod: String,
});

const emit = defineEmits(['open', 'close']);

const dialogsStore = useDialogsStore();
const isOpen = computed(() => !!dialogsStore.$state[props.name]?.open);

const closeDialog = () => {
  dialogsStore.close(props.name);
  emit('close');
};

watch(isOpen, (newVal, oldVal) => {
  if (newVal === true && oldVal === false) {
    emit('open');
  }
});

const sizeClass = computed(() =>
  props.size ? `${baseClass}--${props.size}` : null
);
const modClass = computed(() => useModClasses(baseClass, props.mod));
</script>

<template>
  <HeadlessTransitionRoot as="template" :show="isOpen" appear>
    <HeadlessDialog
      as="div"
      class="dialog"
      :class="[sizeClass, modClass]"
      @close="closeDialog"
    >
      <HeadlessTransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="dialog__backdrop"></div>
      </HeadlessTransitionChild>
      <div class="dialog__wrapper">
        <div class="dialog__container">
          <HeadlessTransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <HeadlessDialogPanel class="dialog__panel transform transition-all">
              <slot name="top"></slot>
              <HeadlessDialogTitle
                v-if="$slots.title"
                as="h3"
                class="title-3 mb-4"
              >
                <slot name="title"></slot>
              </HeadlessDialogTitle>
              <HeadlessDialogDescription
                v-if="$slots.description"
                as="div"
                class="dialog__description"
              >
                <slot name="description"></slot>
              </HeadlessDialogDescription>
              <slot name="default"></slot>
              <div v-if="$slots.buttons" class="dialog__buttons">
                <slot name="buttons"></slot>
              </div>
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<style lang="stylus">
.dialog
  position relative
  z-index 1000
  color var(--color-text-dark)

  &__backdrop
    position fixed
    inset 0px
    background-color rgba(0,0,0,.75)

  &__wrapper
    position fixed
    inset 0
    overflow-y auto

  &__container
    display flex
    min-height 100%
    align-items center
    justify-content center
    padding 1rem
    text-align center

  &__panel
    width 100%
    max-width 41rem
    background-color var(--color-card)
    box-shadow 0 18px 30px 0 rgba(51, 51, 51, 0.64)
    text-align left
    border-radius .75rem
    padding .75rem
    vertical-align middle
    ^[0]--l &
      max-width 52rem
    ^[0]--m &
      max-width 41rem
    ^[0]--s &
      max-width 27rem
    @media (min-width 480px)
      padding 1.5rem
      border-radius 1.5rem

  &__description
    margin-bottom 1rem
    p
      &:last-child
        margin-bottom 0

  &__buttons
    display flex
    flex-direction column
    gap .75rem
    margin-top 2rem
    @media (min-width 480px)
      flex-direction row
      align-items center
      justify-content flex-end
</style>
