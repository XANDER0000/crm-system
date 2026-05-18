// Appwrite Database Configuration
const config = useRuntimeConfig();

export const DB_ID = config.public.appwriteDbId;
export const COLLECTION_DEALS = config.public.appwriteCollectionDeals;
export const COLLECTION_CUSTOMERS = config.public.appwriteCollectionCustomers;
export const COLLECTION_COMMENTS = config.public.appwriteCollectionComments;
export const STORAGE_ID = config.public.appwriteStorageId;