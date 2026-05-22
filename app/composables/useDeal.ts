import type { DealFormState } from '../types/deals'
import { useMutation } from '@tanstack/vue-query'

export const useDeal = () => {
  const config = useRuntimeConfig();
  const database = useDatabase();
  const DB_ID: string = config.public.appwriteDbId;
  const COLLECTION_DEALS: string = config.public.appwriteCollectionDeals;

  const { mutateAsync: sendDeal, isPending } = useMutation({
    mutationKey: ['create a new deal'],
    mutationFn: (data: DealFormState) => 
      database.createDocument(DB_ID, COLLECTION_DEALS, crypto.randomUUID(), data),
  })

  return {
    sendDeal,
    isPending
  }
}