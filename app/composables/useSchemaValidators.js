export function useSchemaValidators(yup) {

  function login() {
    return yup.string().required('Обязательное поле');
  }

  function password() {
    return yup.string()
      .matches(/(?=.*[\d@#$%^&*(),.?":{}|<>])/g, 'Пароль должен содержать цифры или специальные символы')
      .matches(/(?=.*[A-ZА-Я])/g, 'Пароль должен содержать прописные буквы')
      .matches(/(?=.*[a-zа-я])/g, 'Пароль должен содержать строчные буквы')
      .min(6, 'Пароль должен быть не менее 6 символов')
      .required('Пароль обязателен');
  }

  function sixSymbols() {
    return yup.string().min(6, 'Пароль должен быть не менее 6 символов');
  }

  function lowerAndUpperCase() {
    return yup.string().matches(/(?=.*[A-ZА-Я])/g, 'Пароль должен содержать прописные буквы').matches(/(?=.*[a-zа-я])/g, 'Пароль должен содержать строчные буквы').required();
  }

  function passwordSimple() {
    return yup.string().min(6, 'Пароль должен быть не менее 6 символов').required();
  }

  function specSymbols() {
    return yup.string().matches(/(?=.*[\d@#$%^&*(),.?":{}|<>])/g, 'Пароль должен содержать цифры или специальные символы').required();
  }

  return { login, password, passwordSimple, sixSymbols, lowerAndUpperCase, specSymbols }
}
