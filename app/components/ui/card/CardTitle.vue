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
	<h3
		:class="['card__title', props.class]"
	>
		<slot />
	</h3>
</template>


<style scoped lang="stylus">
.card__title
	margin 0
</style>