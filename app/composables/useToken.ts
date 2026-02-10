export const useToken = <T extends string | null | undefined>() => {
  const token = useCookie('access_token');

  const get = (): T => {
    return token.value as T;
  };

  const set = (value: T): void => {
    token.value = value;
  };

  const hasToken = (): boolean  => {
    return !!token.value;
  };

  return { get, set, hasToken };
};
