<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-white text-2xl font-bold mb-4">Вход</h1>    
  <div class="login-widget">
    <form @submit="handleLogin" :validation-schema="loginSchema" class="login-widget__form">
      <InputField label="Ваш email" for="form-login-email" class="mb-5">
        <Input @input="prevalidateForm" placeholder="admin@mail.ru" type="text" id="form-login-email" name="email" v-model="values.email"/>
      </InputField>
      <InputField label="Введите пароль" for="form-login-password" isPassword>
        <Input @input="prevalidateForm" type="password" id="form-login-password" name="password" placeholder="••••••••" v-model="values.password"/>
      </InputField>
      <div v-if="formErrors.length > 0" class="flex flex-col gap-2 mt-6 mb-0">
        <LazyAlert v-for="error in formErrors" variant="error" :label="error" :key="error"></LazyAlert>
      </div>
      <div class="flex flex-wrap gap-2 mt-6">
        <Button label="Войти" type="submit" :disabled="loading" :loading="loading" class="w-100%"></Button>
      </div>
    </form>
  </div>

  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const { login, userLoggedIn } = useAuth();

const loading = ref(false);
const isLoggedIn = ref(true);
const formErrors = ref<string[]>([])

const loginSchema = yup.object({
  email: yup
    .string()
    .required('Email обязателен')
    .email('Введите корректный email'),
  password: yup
    .string()
    .required('Пароль обязателен')
    .min(8, 'Пароль должен содержать минимум 8 символов')
});


const { handleSubmit, resetForm, values  } = useForm({
  validationSchema: loginSchema,
});

const isFormPrevalid = ref(false);

function prevalidateForm() {
  loginSchema.validate(values)
   .then(() => {
      isFormPrevalid.value = true;
    })
    .catch((err) => {
      isFormPrevalid.value = false;
    });
}

const handleLogin = handleSubmit(async () => {
  loading.value = true;
  const result = await login({
    email: values.email,
    password: values.password
  });
  
  if (result.success) {
    formErrors.value = [];
    isLoggedIn.value = true;
    resetForm();
    navigateTo('/');
  } else {
    if (result.error) {
      formErrors.value = [result.error];
    }
  }
  
  loading.value = false;
});

onMounted(async () => {
  isLoggedIn.value = await userLoggedIn();
})
</script>

<style lang="stylus" scoped>
  .login-widget 
    display flex
    flex-direction column
    gap 24px
    max-width 350px
    width 100%
    padding 24px
    background-color var(--color-white)
    border-radius 12px
  
    &__form
      width 100%

    &__errors
      display flex
      flex-direction column
      gap 4px
      &-item
        padding 4px 12px
        background-color var(--color-error-light)
        border-radius 4px
        color var(--color-error)
        font-size 14px
</style>