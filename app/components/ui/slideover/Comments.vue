<template>
  <form @submit.prevent="handleCreateComment" class="mb-4">
    <Input
      placeholder="Оставьте комментарий"
      name="comment"
      v-model="commentRef"
      id="input-comment"
      class="mb-4"
      :disabled="isCreating === true"
    />
  </form>
	<div v-if="isLoading" class="w-full h-[76px] rounded mt-5" >Загрузка...</div>
	<div v-else-if="card?.comments?.length">
		<div
			v-for="comment in card?.comments"
			:key="comment.$id"
			class="slideover__comment"
      :class="{ 'disabled': isDeletingIds.has(comment.$id) }"
		>
			<Icon name="radix-icons:chat-bubble" class="slideover__comment-icon" size="20" />
			<div class="slideover__comment-content">
				<div class="slideover__comment-label">
					Комментарий от {{ convertDate(comment.$createdAt) }}
				</div>
				<p class="slideover__comment-text">{{ comment.text }}</p>
			</div>
      <button class="slideover__comment-delete" @click="handleDeleteComment(comment.$id)" />
		</div>
	</div>
	<div v-else class="w-full h-[76px] rounded mt-5" >Комментариев нет</div>
</template>

<script setup lang="ts">
  import type { Deal } from '../../../types/deals';
  const { data, refetch, isLoading } = useComments()
  const { commentRef, createComment, deleteComment } = useComment({ refetch })

  const isCreating = ref<boolean>(false)
  const isDeletingIds = ref<Set<string>>(new Set())

  const handleCreateComment = async () => {
    isCreating.value = true;
    try {
      await createComment()
    } finally {
      isCreating.value = false;
    }
  } 
  
  const handleDeleteComment = async (id: string) => {
    if (isDeletingIds.value.has(id)) return
  
    isDeletingIds.value.add(id)
    try {
      await deleteComment(id)
    } finally {
      isDeletingIds.value.delete(id)
    }
  }
  const card = data as unknown as Deal
</script>

<style scoped lang="stylus">
.slideover__comment
  position relative
  display flex
  &:not(&:last-child)
    margin-bottom 16px
  &.disabled
    pointer-events none
    & ^[0]-content
      background-color var(--color-text-blind)
    & ^[0]-delete
      pointer-events none

  &-icon
    margin-right 10px

  &-content
    width 100%
    background-color var(--color-card-semitransparent)
    padding 10px
    border-radius 4px
    transition all .2s ease

  &-label
    margin-bottom 4px
    padding-right 20px
    color var(--color-text-blind)
    font-size .75rem

  &-text
    margin 0

  &-delete
    position absolute
    top 2px
    right 2px
    width 20px
    height 20px
    &:hover
    &:focus-visible
      &::before
      &::after
        background-color var(--color-primary)
    &::before
    &::after
      position absolute
      top 50%
      left 50%
      display block
      background-color var(--color-white)
      border-radius 4px
      transform translate(-50%,-50%) rotate(45deg)
      transition all .2s ease
      content ""
    &::before
      width 16px
      height 2px
    &::after
      width 2px
      height 16px
    
</style>