import { defineStore } from 'pinia';
import type { Models } from 'appwrite';

export const useAuthUserStore = defineStore('authUser', {
  state: () => ({
    user: null as Models.User<Models.Preferences> | null,
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.user,
    getUser: (state) => state.user,
  },
  
  actions: {
    setUser(user: Models.User<Models.Preferences> | null) {
      this.user = user;
    },
    
    clearUser() {
      this.user = null;
    },
  },
});