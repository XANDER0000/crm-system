<template>
  <form @submit.prevent="handleCreateComment" class="mb-4">
    <Input
      placeholder="Оставьте комментарий"
      name="comment"
      v-model="commentRef"
      id="input-comment"
      class="mb-4"
    />
  </form>
    <!-- @keyup.enter="createComment" -->

	<div v-if="isLoading" class="w-full h-[76px] rounded mt-5" >Загрузка...</div>
	<div v-else-if="card?.comments?.length">
		<div
			v-for="comment in card?.comments"
			:key="comment.$id"
			class="slideover__comment"
		>
			<Icon name="radix-icons:chat-bubble" class="slideover__comment-icon" size="20" />
			<div class="slideover__comment-content">
				<div class="slideover__comment-label">
					Комментарий от {{ convertDate(comment.$createdAt) }}
				</div>
				<p class="slideover__comment-text">{{ comment.text }}</p>
			</div>
		</div>
	</div>
	<div v-else class="w-full h-[76px] rounded mt-5" >Комментариев нет</div>
</template>

<script setup lang="ts">
  import type { Deal } from '../../../types/deals';
  const { data, refetch, isLoading } = useComments()
  const { commentRef, createComment } = useCreateComment({ refetch })

  const handleCreateComment = () => {
    createComment()
  }
  console.log(commentRef)
  const card = data as unknown as Deal
</script>

<style scoped lang="stylus">
.slideover__comment
  display flex
  &:not(&:last-child)
    margin-bottom 16px

  &-icon
    margin-right 10px

  &-content
    background-color var(--color-card-semitransparent)
    padding 10px
    border-radius 4px

  &-label
    margin-bottom 4px
    color var(--color-text-blind)
    font-size .75rem

  &-text
    margin 0
</style>