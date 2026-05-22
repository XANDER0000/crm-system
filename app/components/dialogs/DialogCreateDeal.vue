<template>
  <Dialog 
    size="m"  
    :name="name"
    @open="open">
    <template #title>
      Добавить ивент
    </template>
    <template #default>
      <form @submit.prevent="onSubmit" class="form">
        <InputField label="Наименование" for="form-create-name" class="mb-5">
          <Input
            placeholder="Наименование"
            name="name"
            id="form-create-name"
            @input="prevalidateForm"
          />
        </InputField>
        <InputField label="Сумма" for="form-create-price" class="mb-5">
          <Input
            placeholder="2000 ₽"
            name="price"
            id="form-create-price"
            type="number"
            @input="prevalidateForm"
          />
        </InputField>
        <InputField label="Email" for="form-create-email" class="mb-5">
          <Input
            placeholder="Email"
            name="customer.email"
            id="form-create-email"
            type="email"
            @input="prevalidateForm"
          />
        </InputField>
        <InputField label="Компания" for="form-create-company" class="mb-5">
          <Input
            placeholder="Компания"
            name="customer.name"
            id="form-create-company"
            @input="prevalidateForm"
          />
        </InputField>

        <div v-if="formErrors.length > 0" class="flex flex-col gap-2 mt-6 mb-6">
          <LazyAlert v-for="error in formErrors" variant="error" :label="error" :key="error"></LazyAlert>
        </div>
        <Button class="btn" :disabled="isPending" type="submit">
          {{ isPending ? 'Добавление...' : 'Добавить' }}
        </Button>
      </form>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import type { DealFormState } from '../../types/deals';
import * as yup from 'yup';

const props = withDefaults(
  defineProps<{
    name?: string;
    isSendEnabled?: boolean;
    columnId?: string;
  }>(),
  {
    name: 'create-deal-dialog',
    isSendEnabled: false,
  }
);
const emit = defineEmits<{
  (e: 'open'): void;
  (e: 'close'): void;
  (e: 'send'): void;
}>();
  
const formErrors = ref<string[]>([])

const createDealSchema = yup.object({
  name: yup
    .string()
    .required('Заполните наименование')
    .min(8, 'Поле должно содержать минимум 8 символов'),
  price: yup
    .number()
    .typeError('Сумма должна быть числом')
    .positive('Сумма должна быть положительной')
    .max(2000000, 'Сумма не может превышать 2,000,000'),
  customer: yup.object({
    email: yup
      .string()
      .required('Email клиента обязателен')
      .email('Введите корректный email клиента'),
    name: yup
      .string()
      .required('Название компании обязательно')
      .min(8, 'Поле должно содержать минимум 8 символов'),
  }),
});


const dialogs = useDialogsStore();
const dialogParams = computed(() => dialogs.$state[props.name]?.params);

const { handleSubmit, resetForm, values  } = useForm<DealFormState>({
  validationSchema: createDealSchema,
  initialValues: {
    name: 'Сделка с крутой компанией',
    price: 1,
    customer: {
      email: 'rgrg@domain.com',
      name: 'Компания крутая'
    },
    status: dialogParams.value?.columnId || 'todo',
  }
});

const isFormPrevalid = ref(false);

function prevalidateForm() {
  createDealSchema.validate(values)
    .then(() => {
      isFormPrevalid.value = true;
    })
    .catch((err) => {
      isFormPrevalid.value = false;
    });
}

const { sendDeal, isPending } = useDeal();

const onSubmit = handleSubmit(async (data) => {
  formErrors.value = [];
  try {
    await sendDeal(data as DealFormState);
    emit('send');
    exit();
  } catch (error: any) {
    formErrors.value = [error.message || 'Ошибка при добавлении'];
  }
});

const open = () => {
  formErrors.value = [];
  console.log(dialogParams.value?.columnId)
  resetForm({
    values: {
      name: 'Сделка с крутой компанией',
      price: 1,
      customer: {
        email: 'rgrg@domain.com',
        name: 'Компания крутая'
      },
      status: dialogParams.value?.columnId || 'todo',
    }
  });
  emit('open');
};

const close = () => {
  emit('close');
  dialogs.close(props.name);
};

const exit = () => {
  close();
};
</script>

<style scoped lang="stylus">

</style>