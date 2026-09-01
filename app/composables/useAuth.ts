import { Client, Account, ID } from 'appwrite';
import type { Models } from 'appwrite';

export const useAuth = () => {
  const config = useRuntimeConfig();

  // Проверяем и получаем значения с дефолтами
  const endpoint = config.public.appwriteEndpoint;
  const projectId = config.public.appwriteProjectId;
  
  // Дополнительная валидация
  if (!endpoint) {
    throw new Error('Appwrite endpoint is not configured');
  }
  
  if (!projectId) {
    throw new Error('Appwrite project ID is not configured');
  }
  const authUser = useAuthUserStore();
  const accessToken = useToken();
  
  // Инициализация Appwrite клиента
  const client = useAppwriteClient();
  
  const account = new Account(client);
  
  // Устанавливаем пользователя в store
  const setUser = (user: Models.User<Models.Preferences> | null) => {
    authUser.setUser(user);
  }

  // Логин через Appwrite
  const login = async (credentials: UserInput): Promise<AuthResponse> => {
    try {
      // Удаляем существующую сессию, если она есть
      try {
        await account.deleteSession('current');
      } catch (error) {
        // Если нет активной сессии, это не ошибка
      }
      
      // Создаем сессию в Appwrite
      const session = await account.createEmailPasswordSession(
        credentials.email,
        credentials.password
      );
      
      // Получаем текущего пользователя
      const user = await account.get();
      
      // Устанавливаем пользователя в store
      setUser(user);
      
      // Получаем JWT токен
      const jwt = await account.createJWT();
      
      // Сохраняем JWT в вашу систему токенов
      if (jwt && jwt.jwt) {
        accessToken.set(jwt.jwt);
      }
      
      return {
        success: true,
        data: { user, session, jwt }
      };
    } catch (error: any) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.message || 'Login failed'
      };
    }
  }

  // Проверка авторизации пользователя
  const userLoggedIn = async (force = false): Promise<boolean> => {
    try {
      // Проверяем, есть ли активная сессия в Appwrite
      const user = await account.get();

      if (user) {
        setUser(user);
        
        // Обновляем JWT токен если нужно
        if (force || !accessToken.hasToken()) {
          const jwt = await account.createJWT();
          if (jwt?.jwt) {
            accessToken.set(jwt.jwt);
          }
        }
        
        return true;
      }
      
      return false;
    } catch (error) {
      // Если нет активной сессии, очищаем данные
      setUser(null);
      accessToken.set(null);
      return false;
    }
  }

  // Выход из системы
  const logout = async (): Promise<AuthResponse> => {
    try {
      await account.deleteSession('current');
      
      // Очищаем локальные данные
      accessToken.set(null);
      setUser(null);
      
      // Перенаправляем на страницу логина
      if (import.meta.client) {
        navigateTo('/login');
      }
      
      return {
        success: true,
        data: { message: 'Logged out successfully' }
      };
    } catch (error: any) {
      console.error('Logout error:', error);
      // Все равно очищаем локальные данные
      accessToken.set(null);
      setUser(null);
      
      return {
        success: false,
        error: error.message || 'Logout failed'
      };
    }
  }

  // Регистрация нового пользователя
  const register = async (credentials: UserInput): Promise<AuthResponse> => {
    try {
      // Создаем пользователя в Appwrite
      const user = await account.create(
        ID.unique(),
        credentials.email,
        credentials.password,
      );
      
      // Автоматически логиним пользователя после регистрации
      const loginResult = await login(credentials);
      
      if (loginResult.success) {
        return {
          success: true,
          data: {
            user,
            message: 'Registration successful'
          }
        };
      } else {
        return loginResult;
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: error.message || 'Registration failed'
      };
    }
  }

  // Получение информации о текущем пользователе
  const getCurrentUser = async (): Promise<AuthResponse> => {
    try {
      const user = await account.get();
      setUser(user);
      
      return {
        success: true,
        data: { user }
      };
    } catch (error: any) {
      setUser(null);
      return {
        success: false,
        error: error.message || 'Failed to get user'
      };
    }
  }

  // Обновление JWT токена (аналог refresh)
  const refreshToken = async (): Promise<AuthResponse> => {
    try {
      const jwt = await account.createJWT();
      
      if (jwt?.jwt) {
        accessToken.set(jwt.jwt);
        return {
          success: true,
          data: { token: jwt.jwt }
        };
      }
      
      return {
        success: false,
        error: 'Failed to create JWT'
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to refresh token'
      };
    }
  }

  // Инициализация приложения (вызывать в app.vue или layout)
  const initAuth = async () => {
    try {
      // Проверяем, есть ли активная сессия при загрузке приложения
      const result = await getCurrentUser();
      
      if (result.success && result.data?.user) {
        // Получаем свежий JWT
        await refreshToken();
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
    }
  }

  return {
    // Основные методы
    login,
    register,
    logout,
    userLoggedIn,
    getCurrentUser,
    refreshToken,
    initAuth,
    
    // Геттеры
    user: computed(() => authUser.user),
    isAuthenticated: computed(() => authUser.isAuthenticated),
    
    // Appwrite клиенты (если нужны для других операций)
    account,
    client
  };
}