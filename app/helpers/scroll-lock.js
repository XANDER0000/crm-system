import { isIOS } from '@/utils/device.js';

export default class ScrollLock {
  constructor() {
    // Не инициализируем сразу
    this._initialized = false;
    this.iosChecker = null;
    this.lockClass = null;
    this.scrollTop = null;
    this.fixedBlockElements = null;
  }

  // Метод для ленивой инициализации
  _init() {
    if (this._initialized || typeof document === 'undefined') return;
    
    this.iosChecker = isIOS;
    this.lockClass = this.iosChecker() ? 'scroll-lock-ios' : 'scroll-lock';
    this.scrollTop = null;
    this.fixedBlockElements = document.querySelectorAll('[data-fix-block]');
    
    this._initialized = true;
  }

  static getScrollbarWidth = () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return 0;
    }
    return window.innerWidth - document.documentElement.clientWidth;
  };

  static getBodyScrollTop = () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return 0;
    }
    
    return window.scrollY ||
           (document.documentElement && document.documentElement.scrollTop) ||
           (document.body && document.body.scrollTop);
  };

  disableScrolling = () => {
    this._init(); // Инициализируем при первом вызове
    if (!this._initialized) return;
    
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.dataset.scroll = document.body.dataset.scroll ? 
      document.body.dataset.scroll : ScrollLock.getBodyScrollTop();
    
    this.scrollTop = document.body.dataset.scroll;
    
    if (ScrollLock.getScrollbarWidth()) {
      document.body.style.paddingRight = `${ScrollLock.getScrollbarWidth()}px`;
      this.fixedBlockElements.forEach((block) => {
        block.style.paddingRight = `${ScrollLock.getScrollbarWidth()}px`;
      });
    }
    
    document.body.style.top = `-${this.scrollTop}px`;
    document.body.classList.add(this.lockClass);
  };

  enableScrolling() {
    this._init(); // Инициализируем при первом вызове
    if (!this._initialized) return;
    
    document.body.classList.remove(this.lockClass);
    document.body.style.paddingRight = null;
    document.body.style.top = null;
    
    this.fixedBlockElements.forEach((block) => {
      block.style.paddingRight = null;
    });
    
    this.scrollTop = null;
    const scrollTop = +document.body.dataset.scroll;
    
    if (scrollTop && typeof window !== 'undefined') {
      window.scrollTo(0, scrollTop);
    }
    
    document.body.removeAttribute('data-scroll');
    document.documentElement.style.scrollBehavior = '';
  }
}

// Инициализируем только на клиенте
if (typeof window !== 'undefined') {
  window.scrollLock = new ScrollLock();
}