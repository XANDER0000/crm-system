<template>
  <table v-if="!isPageLoading" class="table-auto">
    <thead>
      <tr>
        <th>Изображение</th>
        <th>Наименование</th>
        <th>Email</th>
        <th>Откуда пришел</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="customer in customers"
        :key="customer.$id"
      >
        <td>
          <a :href="`/customers/edit/${customer.$id}`">
            <Avatar
              class="shrink-0 mb-1px"
              :image="customer.avatar_url"
            />
          </a>
        </td>
        <td class="font-medium">
          {{ customer.name }}
        </td>
        <td>{{ customer.email }}</td>
        <td>{{ customer.from_source }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { Customer } from '../../types/deals';
const isPageLoading = inject('isPageLoading');
const { userLoggedIn } = useAuth();
const { data: customersData } = useCustomers();

useSeoMeta({
  title: 'Заказчики',
});

definePageMeta({
  layout: 'main',
});

onBeforeMount(async () => {
  const isLoggedIn = await userLoggedIn();
  if (!isLoggedIn) {
    navigateTo('/login');
  }
});

const customers = computed(() => {
  return customersData.value?.documents as Customer[] || []
})
</script>

<style lang="stylus" scoped>
table
  border-collapse collapse
  border 1px solid var(--color-gray-4) 
  border-radius 8px

  td, th
    padding 4px
    border-bottom 1px solid var(--color-gray-4)
</style>