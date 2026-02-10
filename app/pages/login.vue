<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-2xl font-bold mb-4">Вход</h1>

    
  <div class="login-widget">
    <form class="login-widget__form">
      <InputField label="Ваш логин" for="form-login-login" class="mb-5">
        <Input type="text" id="form-login-login" name="login" placeholder="" v-model="fields.email"/>
      </InputField>
      <InputField label="Введите пароль" for="form-login-password" class="mb-3" isPassword>
        <Input type="password" id="form-login-password" name="password" placeholder="" v-model="fields.password"/>
      </InputField>
      <div class="flex flex-col gap-2 mt-6 mb-0">
        <!-- <FormMessage v-if="errorForm.error" variant="error" label="Логин или пароль не подходят"></FormMessage> -->
      </div>
      <!-- <Button label="Не помню пароль" variant="tertiary-text" size="s" class="mb-10"></Button> -->
      <Button type="submit" label="Войти" @click.prevent="handleLogin" class="w-100% mt-10"></Button>
      <Button label="Выйти" @click.prevent="handleLogout" class="w-100% mt-10"></Button>
    </form>
  </div>

  </div>
</template>

<script setup lang="ts">
const { login, logout, isAuthenticated, user } = useAuth();

const fields = ref({
  email: '',
  password: ''
})

const handleLogin = async () => {
  
  const result = await login({
    email: fields.value.email,
    password: fields.value.password
  });
  
  if (result.success) {
    console.log(result)
    // navigateTo('/');
  } else {
    // Показать ошибку
    console.log(result)
    // alert(result.error);
  }
};
const handleLogout = async () => {
  
  const result = await logout();
  
  if (result.success) {
    console.log(result)
    // navigateTo('/');
  } else {
    // Показать ошибку
    console.log(result)
    // alert(result.error);
  }
};
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
</style>