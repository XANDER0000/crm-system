<template>
  <div class="bg-black/20 rounded p-3 mb-3">
		<div class="uppercase bold text-xl mb-4">О сделке</div>
		<Label label-text="Наименование">
			<h2>
				{{ store.card?.name }}
			</h2>
		</Label>
		<Label label-text="Сумма">
			{{ convertCurrency(store.card?.price || 0) }}
		</Label>
		<Label label-text="Статус">
			{{ store.$state.card?.status }}
		</Label>
		<Label label-text="Клиент">
			{{ store.card?.companyName }}
		</Label>
		<Label label-text="Дата создания">
      {{ convertDate(store.$state.card?.$createdAt ?? 'Без Даты') }}
		</Label>
	</div>
</template>

<script setup lang="ts">
  const store = useSlideoverStore();
</script>

<style scoped>

</style>