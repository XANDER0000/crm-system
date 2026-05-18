import { useQuery } from '@tanstack/vue-query'
// import { Query } from 'appwrite'
// import { COLLECTION_DEALS, DB_ID } from '../../app.constants'
import { BOARD_DATA } from '~/constants/board'
// import type { Column } from '~/types/board'
import type { Deal } from '~/types/deals'
import { Query } from 'appwrite';

export function useBoardQuery() {
  const config = useRuntimeConfig();
  const database = useDatabase();

  const DB_ID: string = config.public.appwriteDbId;
  const COLLECTION_DEALS: string = config.public.appwriteCollectionDeals;

  return useQuery({
    queryKey: ['deals'],
    queryFn: () => database.listDocuments(DB_ID, COLLECTION_DEALS, [
			Query.select(['*', 'customer.*'])
		]),
    select(data) {
      const newBoard = [...BOARD_DATA]

			const deals = data.documents as unknown as Deal[]

			for (const deal of deals) {
				const column = newBoard.find(col => col.id === deal.status)
				if (column) {
					console.log(deal)
					column.items.push({
						$createdAt: deal.$createdAt,
						$id: deal.$id,
						name: deal.name,
						price: deal.price,
						companyName: deal.customer?.name,
						status: column.name,
					})
				}
			}

			return newBoard
    }
  })
}