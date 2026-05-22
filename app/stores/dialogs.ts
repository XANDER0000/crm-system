import { defineStore } from 'pinia';

interface DialogState {
  open: boolean;
  params?: Record<string, any>;
  timeoutId?: NodeJS.Timeout;
}

interface DialogsState {
  [key: string]: DialogState;
}

export const useDialogsStore = defineStore('dialogs', {
  state: (): DialogsState => ({}),

  actions: {
    open(dialogName: string, params?: Record<string, any>): void {
      if (this.$state[dialogName]?.timeoutId) {
        clearTimeout(this.$state[dialogName].timeoutId);
      }
      this.$state[dialogName] = { open: true, params };
    },

    close(dialogName: string, delayMs: number = 200): void {
      const dialog = this.$state[dialogName];
      if (!dialog) return;

      if (dialog.timeoutId) {
        clearTimeout(dialog.timeoutId);
      }

      dialog.open = false;
      dialog.timeoutId = setTimeout(() => {
        dialog.params = undefined;
        dialog.timeoutId = undefined;
      }, delayMs);
    },

    closeAll(delayMs: number = 200): void {
      for (const key in this.$state) {
        const dialog = this.$state[key];
        if (!dialog) continue;

        if (dialog.timeoutId) {
          clearTimeout(dialog.timeoutId);
        }

        dialog.open = false;
        dialog.timeoutId = setTimeout(() => {
          dialog.params = undefined;
          dialog.timeoutId = undefined;
        }, delayMs);
      }
    },
  },
});
