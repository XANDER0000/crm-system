import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { Customer } from '~/types/deals';
import { ID, Storage } from 'appwrite';
import { computed, ref } from 'vue';

let storageInstance: Storage | null = null

export const useCustomer = () => {
  const config = useRuntimeConfig();
  const database = useDatabase();
  const queryClient = useQueryClient();

  const DB_ID: string = config.public.appwriteDbId;
  const COLLECTION_CUSTOMERS: string = config.public.appwriteCollectionCustomers;
  const BUCKET_ID: string = config.public.appwriteBucketId;

  const isPendingRef = ref(false);
  const isPending = computed(() => isPendingRef.value);

  const runWithPending = async <T>(action: () => Promise<T>) => {
    if (isPendingRef.value) {
      throw new Error('Запрос уже выполняется');
    }

    isPendingRef.value = true;

    try {
      return await action();
    } finally {
      isPendingRef.value = false;
    }
  };

  if (!storageInstance) {
    const client = useAppwriteClient();

    storageInstance = new Storage(client);
  }

  const { mutateAsync: editCustomerMutation } = useMutation({
    mutationKey: ['edit a customer'],
    mutationFn: ({ id, data }: { id: string; data: Partial<Customer> }) => {
      return database.updateDocument(DB_ID, COLLECTION_CUSTOMERS, id, data)
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['customer', variables.id] })
    }
  })

  const editCustomer = async ({ id, data }: { id: string; data: Partial<Customer> }) => {
    return runWithPending(() => editCustomerMutation({ id, data }));
  }

  const getCustomer = (customerId: string) => {
    return useQuery({
      queryKey: ['customer', customerId],
      queryFn: () => runWithPending(() => database.getDocument(DB_ID, COLLECTION_CUSTOMERS, customerId)),
      enabled: !!customerId,
    })
  }

  const customerUploadFile = async (file: File, customerId: string) => {
    return runWithPending(async () => {
      const fileId = ID.unique();
      const fileName = `${customerId}_${file.name}`;

      const response = await storageInstance?.createFile({
        bucketId: BUCKET_ID,
        fileId,
        file
      });

      // Получаем URL для просмотра файла
      const fileUrl = storageInstance?.getFileView({
        bucketId: BUCKET_ID,
        fileId
      });

      const urlString = fileUrl?.toString() || '';

      return {
        fileId: response?.$id,
        url: urlString,
        name: fileName
      };
    });
  }

  return {
    editCustomer,
    getCustomer,
    customerUploadFile,
    isPending
  }
}