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
	<p :class="['card__description', props.class]">
		<slot />
	</p>
</template>
