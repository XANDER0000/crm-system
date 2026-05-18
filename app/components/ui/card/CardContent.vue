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
	<div :class="['card__content', props.class]">
		<slot />
	</div>
</template>
