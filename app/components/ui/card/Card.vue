<script setup lang="ts">
// import { cn } from '@/utils'

const props = defineProps({
	class: {
		type: String,
		default: '',
	},
})
</script>

<template>
	<article :class="['card', props.class]">
		<slot />
	</article>
</template>

<style scoped lang="stylus">
.card 
  display flex 
  flex-direction column
  gap 8px
  margin-bottom 12px
  padding 12px
  color var(--color-white)
  background-color var(--color-divider-contrast)
  border-radius 4px
  
  user-select: none
  -webkit-user-select: none
  
  &[draggable="true"]
    -webkit-user-drag: element
    
  &:last-child
    margin-bottom 0

  &:active
    opacity: 1
    background-color var(--color-divider-contrast)
    &::selection
      background: transparent
    
  &__title
    margin-bottom 0
    font-size 1.2rem

  &__content
    margin-bottom 0
    font-size .875rem
    
  p
    &:last-child
      margin-bottom 0

  ::selection
    background: transparent


/* @keyframes show {
	from {
		@apply border-[#a252c83d];
		transform: scale(0.5) translateY(-30px);
		opacity: 0.4;
	}

	90% {
		@apply border-[#a252c83d];
	}

	to {
		@apply border-transparent;
		transform: scale(1) translateY(0);
		opacity: 1;
	}
}

.animation {
	animation: show 0.3s ease-in-out;
} */
 
</style>
