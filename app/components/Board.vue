<template>
  <div class="board">
    <div 
      class="board__col" 
      :class="{'drag-enter': dragEnterColumnId === column.id}"
      v-for="(column, index) in data" 
      :key="column.id"
      @dragenter="(event) => handleDragEnter(event, column.id)"
      @dragover.prevent
      @drop="() => handleDrop(column)">
      <h2 class="board__col-title title-5" :style="generateColumnStyle(index, data?.length)">{{ column.name }}</h2>
      <Button class="button  board__col-add" icon="mdi:plus" mod="secondary" @click="handleCreateDeal(column.id)"/>
      <transition-group name="show" class="board__col-cards" tag="div">
        <Card
          v-for="card in column.items"
          :key="card.$id"
           :class="`board__card mb-5 ${cardLoadingRef === card.$id ? 'loading' : ''}`"
          draggable="true"
          @dragstart="() => handleDragStart(card, column)"
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
      </transition-group>
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

const dragEnterColumnId = ref<string | null>(null)
const handleDragEnter = (event: DragEvent, columnId: string) => {
  event.preventDefault();
  if (dragEnterColumnId.value !== columnId) {
    dragEnterColumnId.value = columnId;
  }
}

const handleDragStart = (card: Card, column: Column) => {
  dragCardRef.value = card;
  sourceColumnRef.value = column;
}

const { dragDeal } = useDeal()
const cardLoadingRef = ref<string | null>(null)

const handleDrop = async (column: Column) => {
  dragEnterColumnId.value = null

  if (sourceColumnRef?.value?.id === column.id) {
    return;
  }
  
  if (dragCardRef.value?.$id && sourceColumnRef.value) {
    cardLoadingRef.value = dragCardRef.value?.$id;
    try {
      await dragDeal({
        dealId: dragCardRef.value.$id,
        status: column.id
      })
      await refetch();
    } finally {
      cardLoadingRef.value = null;
    }
  }
}


</script>

<style scoped lang="stylus">
.board 
  display flex
  flex 1 0 auto
  gap 1rem

  &__col
    flex 1
    display flex
    flex-direction column
    gap 1rem

  &__col-cards
    height 100%
    border-radius 5px
    transition all .3s ease
    .drag-enter &
      box-shadow 0 0 5px 5px var(--color-primary)

  &__card
    &.loading
      position relative
      pointer-events none
      &::after
        position absolute
        inset 0
        width 100%
        height 100%
        background-color rgba(255, 255, 255, .2)
        transition all .2s ease
        content ''

  &__col-title
    margin 0 
    padding 8px
    text-align center
    border-radius 4px

.show-enter-active, .show-leave-active 
  transition opacity 0.3s ease

.show-enter-from, .show-leave-to 
  opacity: 0

</style>