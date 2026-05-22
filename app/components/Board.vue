<template>
  <div class="board">
    <div class="board__col" v-for="(column, index) in data" :key="column.id">
      <h2 class="board__col-title title-5" :style="generateColumnStyle(index, data?.length)">{{ column.name }}</h2>
      <Button class="button  board__col-add" icon="mdi:plus" mod="secondary" @click="handleCreateDeal(column.id)"/>
      <div class="board__col-cards">
        <Card
          v-for="card in column.items"
          :key="card.$id"
          class="mb-5"
          draggable="true"
        >
          <CardHeader role="button">
            <CardTitle class="title-5">{{ card.name }}</CardTitle>

            <CardDescription class="mt-2 block">
              {{ convertCurrency(card.price ?? 0) }}
            </CardDescription>
          </CardHeader>
          <CardContent class="text-xs">
            <div>Компания</div>
            {{ card.companyName }}
          </CardContent>
          <CardFooter>
              {{ convertDate(card.$createdAt ?? 'Без Даты') }}
          </CardFooter>
        </Card>
      </div>
    </div>
  </div>
  <DialogCreateDeal name="create-deal-dialog" @send="handleSendDeal"/>
</template>

<script setup lang="ts">
import type { Card, Column } from '../types/board';

const { data, refetch } = useBoardQuery();

const dragCardRef = ref<Card | null>(null);
const sourceColumnRef = ref<Column | null>(null);

const dialogs = useDialogsStore();
  
const generateColumnStyle = (index: number, total = 1) => {
	const intensity = 100 - (index / (total - 1)) * 50
	return { backgroundColor: `hsla(321, 80%, ${intensity}%, 30%)` }
}
const handleCreateDeal = (columnId: string) => {
  dialogs.open('create-deal-dialog', { columnId });
};

const handleSendDeal = () => {
  refetch();
};
</script>

<style scoped lang="stylus">
.board 
  display flex
  gap 1rem

  &__col
    flex 1
    display flex
    flex-direction column
    gap 1rem

  &__col-title
    margin 0 
    padding 8px
    text-align center
    border-radius 4px
</style>