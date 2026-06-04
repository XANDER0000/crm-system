import { useMutation } from '@tanstack/vue-query'

export const useComment = ({ refetch }: { refetch: () => void }) => {
  const config = useRuntimeConfig();
  const database = useDatabase();
  
  const DB_ID: string = config.public.appwriteDbId;
  const COLLECTION_COMMENTS: string = config.public.appwriteCollectionComments;

  const commentRef = ref<string>();
  const store = useComments();

  const { mutateAsync: createComment, isPending } = useMutation({
    mutationKey: ['create a new comment'],
    mutationFn: () => {
      return database.createDocument(DB_ID, COLLECTION_COMMENTS, crypto.randomUUID(),  {
				text: commentRef.value,
				deal: store.data.value.$id,
			})
    },
    onSuccess: () => {
      commentRef.value = '';
      refetch();
    }
  })

  const { mutateAsync: deleteComment } = useMutation({
    mutationKey: ['delete a comment'],
    mutationFn: (commentId: string) => {
      return database.deleteDocument(DB_ID, COLLECTION_COMMENTS, commentId);
    },
    onSuccess: () => {
      refetch();
    }
  })

  return {
    createComment,
    deleteComment,
    commentRef,
    isPending
  }
}