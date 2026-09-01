import { useQuery } from '@tanstack/vue-query'
import { Query } from 'appwrite';

export function useCustomers() {
  const config = useRuntimeConfig();
  const database = useDatabase();
  
  const DB_ID: string = config.public.appwriteDbId;
  const COLLECTION_CUSTOMERS: string = config.public.appwriteCollectionCustomers;

	return useQuery({
		queryKey: ['customers'],
		queryFn: () => database.listDocuments(DB_ID, COLLECTION_CUSTOMERS),
	})
}
