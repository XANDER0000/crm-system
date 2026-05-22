import type { Deal } from '../types/deals'
import type { StatusType } from '../constants/status'
import { useMutation } from '@tanstack/vue-query'

export const useDeal = () => {
  const config = useRuntimeConfig();
  const database = useDatabase();
  const DB_ID: string = config.public.appwriteDbId;
  const COLLECTION_DEALS: string = config.public.appwriteCollectionDeals;

  const { mutateAsync: sendDeal, isPending } = useMutation({
    mutationKey: ['create a new deal'],
    mutationFn: (data: Deal) => 
      database.createDocument(DB_ID, COLLECTION_DEALS, crypto.randomUUID(), data),
  })

  const { mutateAsync: dragDeal } = useMutation({
    mutationKey: ['drag deal'],
    mutationFn: ({ dealId, status }: { dealId: string; status: StatusType }) =>  
      database.updateDocument(DB_ID, COLLECTION_DEALS, dealId, { status }),
  })

  return {
    sendDeal,
    dragDeal,
    isPending
  }
}