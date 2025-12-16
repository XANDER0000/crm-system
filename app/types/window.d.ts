import ScrollLock from '@/helpers/scroll-lock';

declare global {
  interface Window {
    scrollLock: ScrollLock;
  }
}

// Это нужно для ES модулей
export {};