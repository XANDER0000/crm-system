<template>
  <div v-if="!isPageLoading && customerData">
    <h1 class="title-1 mb-6">Редактирование заказчика {{ customerData?.name }}</h1>
    <form @submit.prevent="onSubmit" class="form">
        <InputField label="Наименование" for="form-edit-name" class="mb-5">
          <Input
            placeholder="Наименование"
            name="name"
            id="form-edit-name"
            @input="prevalidateForm"
          />
        </InputField>
        <InputField label="Email" for="form-edit-email" class="mb-5">
          <Input
            placeholder="Email"
            name="email"
            id="form-edit-email"
            type="email"
            @input="prevalidateForm"
          />
        </InputField>
        <InputField label="От кого" for="form-edit-from_source" class="mb-5">
          <Input
            placeholder="От кого"
            name="from_source"
            id="form-edit-from_source"
            @input="prevalidateForm"
          />
        </InputField>
        <div class="attachment-file-wrapper mb-5">
          <AttachmentField
            id="form-edit-email"
            name="avatar_url"
            class="shrink-0"
            @change="onAttachmentChange"
          />
        </div>
        <div v-if="attachedFile?.url" class="attachment-file mb-5" @click="onFileDelete">
          <img :src="attachedFile?.url" alt="" />
        </div>
        <div v-if="formErrors.length > 0" class="flex flex-col gap-2 mt-6 mb-6">
          <LazyAlert v-for="error in formErrors" variant="error" mod="color-white" :label="error" :key="error"></LazyAlert>
        </div>
        <Button class="btn" :disabled="isPending" :loading="isPending" type="submit">
          {{ isPending ? 'Редактирование...' : 'Редактировать' }}
        </Button>
      </form>
  </div>
</template>

<script setup lang="ts">
import * as yup from 'yup';
import { useForm } from 'vee-validate';
import type { Customer } from '../../../types/deals';

interface AttachedFile {
  id: string;
  name: string;
  url: string;
  file: File;
}

const isPageLoading = inject('isPageLoading');
const { userLoggedIn } = useAuth();

const route = useRoute()
const id = route.params.id

const attachedFile = ref<AttachedFile | null>({
  id: '',
  name: '',
  url: '',
  file: null as unknown as File,
});
const { getCustomer, editCustomer, customerUploadFile, isPending } = useCustomer();

const { data, isSuccess } = getCustomer(id as string)
const customerData = computed(() => data.value as unknown as Customer)

useSeoMeta({
  title: `Заказчик ${id}`,
});

definePageMeta({
  layout: 'main',
});

onBeforeMount(async () => {
  const isLoggedIn = await userLoggedIn();
  if (!isLoggedIn) {
    navigateTo('/login');
  }
});

const formErrors = ref<string[]>([])

const createCustomerSchema = yup.object({
  name: yup
    .string()
    .required('Заполните наименование')
    .min(4, 'Поле должно содержать минимум 4 символа'),
  email: yup
    .string()
    .required('Email клиента обязателен')
    .email('Введите корректный email клиента'),
  from_source: yup
    .string()
    .required('Поле "От кого" обязательно')
    .min(2, 'Поле должно содержать минимум 2 символа'),
});

const { handleSubmit, resetForm, values, setFieldValue  } = useForm<Customer>({
  validationSchema: createCustomerSchema,
  initialValues: {
    name: 'Название',
    email: 'Почта',
    from_source: 'Откуда-то',
    avatar_url: '',
  }
});

watch(customerData, (newData) => {
  if (newData) {
    resetForm({
      values: {
        name: newData.name,
        email: newData.email,
        from_source: newData.from_source,
        avatar_url: newData.avatar_url,
      }
    });
    if (attachedFile.value) attachedFile.value.url = newData.avatar_url ?? '';  
  }
}, { immediate: true });
const isFormPrevalid = ref(false);

function prevalidateForm() {
  createCustomerSchema.validate(values)
    .then(() => {
      isFormPrevalid.value = true;
    })
    .catch((err) => {
      isFormPrevalid.value = false;
    });
}

const onFileDelete = () => {
  if (attachedFile.value?.url && attachedFile.value.url.startsWith('blob:')) {
    URL.revokeObjectURL(attachedFile.value.url);
  }
  attachedFile.value = null;
  setFieldValue('avatar_url', '');
};

const uploadFile = async (file: File) => {
  return customerUploadFile(file, id as string)
};

const onAttachmentChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (!files || files.length === 0) return;
  const file = files[0];
  if (!file) return;

  if (attachedFile.value?.url && attachedFile.value.url.startsWith('blob:')) {
    URL.revokeObjectURL(attachedFile.value.url);
  }

  attachedFile.value = {
    id: uniqId('file-'),
    name: file.name,
    url: URL.createObjectURL(file),
    file,
  };
  setFieldValue('avatar_url', attachedFile.value.url);
  
  target.value = '';
};

const onSubmit = handleSubmit(async (formValues) => {
  if (!id || isPending.value) return

  formErrors.value = []

  try {
    // Создаем копию values, которую будем менять
    const updatedValues = { ...formValues };

    if (attachedFile.value?.file) {
      const newFile = await uploadFile(attachedFile.value?.file);
      if (newFile) {
        if (attachedFile.value?.url && attachedFile.value.url.startsWith('blob:')) {
          URL.revokeObjectURL(attachedFile.value.url);
        }

        updatedValues.avatar_url = newFile.url;
        
        setFieldValue('avatar_url', newFile.url);
        
        // Обновляем attachedFile
        attachedFile.value = {
          ...attachedFile.value,
          id: newFile.fileId ?? '',
          name: newFile.name ?? attachedFile.value.name,
          url: newFile.url ?? attachedFile.value.url
        };
      }
    }
    
    // Отправляем обновленные данные
    await editCustomer({ 
      id: id as string, 
      data: updatedValues 
    })
  } catch (error) {
    formErrors.value = ['Ошибка при обновлении заказчика. Попробуйте еще раз.']
  }
})

</script>

<style lang="stylus" scoped>
.attachment-file 
  display flex
  max-width 300px
  max-height 300px
  img
    object-fit contain
</style>