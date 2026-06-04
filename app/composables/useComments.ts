import { useQuery } from '@tanstack/vue-query'
import { Query } from 'appwrite';

export function useComments() {
  const config = useRuntimeConfig();
  const database = useDatabase();
  
  const DB_ID: string = config.public.appwriteDbId;
  const COLLECTION_DEALS: string = config.public.appwriteCollectionDeals;

	const store = useSlideoverStore()
	const cardId = store.card?.$id || ''
  console.log(DB_ID, COLLECTION_DEALS, cardId)
	return useQuery({
		queryKey: ['deals', cardId],
		queryFn: () => database.getDocument(DB_ID, COLLECTION_DEALS, cardId, [
      Query.select(['*', 'comments.*'])
    ]),
	})
}
