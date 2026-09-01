<script setup lang="ts">
import { uniqId } from '@/utils/uniqId';

const props = withDefaults(
  defineProps<{
    id?: string;
    name?: string;
    value?: string;
    disabled?: boolean;
    userRole?: string;
  }>(),
  {}
);

const fileInput = ref<HTMLInputElement | null>(null);

const emit = defineEmits<{
  change: [event: Event];
}>();

const computedId = computed(() => {
  return props.id ? props.id : uniqId('file-');
});

const labelElement = ref<HTMLElement>();

const onButtonClick = (event: Event) => {
  event.preventDefault();
  if (fileInput.value) {
    fileInput.value.value = '';
  }
  fileInput.value?.click();
};

const onInputChange = (event: Event) => {
  emit('change', event);
};
</script>

<template>
  <label
    ref="labelElement"
    class="attachment-field"
    :for="computedId"
    :class="{ disabled: disabled }"
  >
    <input
      :id="computedId"
      :name="props.name"
      ref="fileInput"
      type="file"
      accept=".jpg, .jpeg, .png, .pdf, .webp, .xlsx, .pptx, .docx, .doc"
      class="attachment-field__input"
      @change="onInputChange"
    />
    <Button
      icon="mdi:paperclip"
      class="attachment-field__button"
      size="l"
      classIcon="shrink-0 text-5 attachment-field__icon"
      :variant="'tertiary-text'"
      @click="onButtonClick"
    />
  </label>
</template>

<style lang="stylus">
.attachment-field
  cursor pointer
  display block

  &__input
    position absolute !important
    width 1px !important
    height 1px !important
    padding 0 !important
    margin -1px !important
    overflow hidden !important
    clip rect(0, 0, 0, 0) !important
    white-space nowrap !important
    border 0 !important

  &__icon
    width 1.25rem
    height 1.25rem
    color var(--color-primary)
</style>
