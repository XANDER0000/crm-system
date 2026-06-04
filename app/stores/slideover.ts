import { defineStore } from 'pinia';
import type { Card } from '~/types/board';

interface Slideover {
  open: boolean;
  card: Card | null;
  params?: Record<string, any>;
  timeoutId?: NodeJS.Timeout | null;
}

export const useSlideoverStore = defineStore('slideover', {
  state: (): Slideover => ({
    open: false,
    card: null,
    params: {},
    timeoutId: null
  }),
  
  actions: {
    openDrawer(card?: Card | null, params?: Record<string, any>) {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
      this.card = card || null;
      this.params = params || {};
      this.open = true;
    },
    
    closeDrawer(delay: number = 300) {
      this.open = false;
      
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      
      this.timeoutId = setTimeout(() => {
        if (!this.open) {
          this.card = null;
          this.params = {};
        }
        this.timeoutId = null;
      }, delay);
    },
  }
});
